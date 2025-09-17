const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchMarketData() {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`
  );
  if (!res.ok) throw new Error("Failed to fetch market data");
  return res.json();
}
