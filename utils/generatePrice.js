const MAX_GOLD_PRICE_PER_OZ = 8000;

export function generatePrice() {
  return Math.round(Math.floor(Math.random() * MAX_GOLD_PRICE_PER_OZ) + 1).toFixed(2);
}
