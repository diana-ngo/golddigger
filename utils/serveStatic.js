import path from 'node:path';
import fs from 'node:fs/promises';
import { getContentType } from './getContentType.js';
import { sendResponse } from './sendResponse.js';

export async function serveStatic(baseDir, req, res) {
  const pathToResource = path.join(
    baseDir, 
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
      const filePath = path.join(baseDir, 'public', '404.html');
      const data = await fs.readFile(filePath);
      sendResponse(res, 404, "text/html", data);
    } else {
      const errorHtml = `<html><h1>Server Error: ${err.code}</h1></html>`;
      sendResponse(res, 500, "text/html", errorHtml);
    }
  }
}