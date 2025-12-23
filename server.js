import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { sendResponse } from './utils/sendResponse.js';
import { getLivePrice } from './utils/getLivePrice.js'
import { parseJSONBody } from './utils/parseJSONBody.js';
import { serveStatic } from './utils/serveStatic.js';

const PORT = 8000;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  // stream live prices
  if (req.url === "/api/live-price") {
    if (req.method === "GET") {
      getLivePrice(req, res);
    }

  // record a purchase
  } else if (req.url === "/api/purchases" && req.method === "POST") {
    const purchase = await parseJSONBody(req);
    
    const pathToPurchases = path.join('data', 'purchases.json');
    const data = await fs.readFile(pathToPurchases, 'utf8');
    const parsedData = JSON.parse(data);
    parsedData.push(purchase);

    try {
      await fs.writeFile(
        pathToPurchases,
        JSON.stringify(parsedData, null, 2),
        'utf8',
      );
    } catch(err) {
      console.error(err);
      sendResponse(res, 500, "application/json", JSON.stringify({ error: "Failed to save purchase" }));
      return;
    }

    sendResponse(res, 201, "application/json", JSON.stringify({ success: true }));

  } 
  else {
    serveStatic(__dirname, req, res);
  }
});

server.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });