export function sliceData(prices, timeRange) {
  if (!prices) return [];

  let days;
  switch (timeRange) {
    case "7d": days = 7; break;
    case "30d": days = 30; break;
    default: days = 7;
  }

  return prices.slice(-days);
}