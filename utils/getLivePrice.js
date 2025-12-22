import { generatePrice } from './generatePrice.js';

export async function getLivePrice(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const intervalId = setInterval(() => {
    const price = generatePrice();

    res.write(`data: ${JSON.stringify(
      {
        event: 'new-price',
        price: price,
      }
    )}\n\n`);

  }, 2500);

  req.on("close", () => {
    clearInterval(intervalId);
  });
}

