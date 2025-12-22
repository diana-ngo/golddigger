import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { getContentType } from './utils/getContentType.js';
import { sendResponse } from './utils/sendResponse.js';
import { getLivePrice } from './utils/getLivePrice.js'

const PORT = 8000;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/live-price") {
    if (req.method === "GET") {
      await getLivePrice(req, res);
    }

  } else {
    // serverStaticFile(req, res);


    const pathToResource = path.join(
      __dirname, 
      'public', 
      req.url === "/" ? 'index.html' : req.url
    );
    
    const extension = path.extname(pathToResource);
    const contentType = getContentType(extension);

    try {
      const data = await fs.readFile(pathToResource);
      sendResponse(res, 200, contentType, data);
    } catch(err) {
      if (err.code === "ENOENT") {
        const filePath = path.join(__dirname, 'public', '404.html');
        const data = await fs.readFile(filePath);
        sendResponse(res, 404, "text/html", data);
      } else {
        const errorHtml = `<html><h1>Server Error: ${err.code}</h1></html>`;
        sendResponse(res, 500, "text/html", errorHtml);
      }
    }
  }

});

server.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });