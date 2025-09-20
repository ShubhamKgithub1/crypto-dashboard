const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchMarketData() {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin,solana&sparkline=false`
  );
  if (!res.ok) throw new Error("Failed to fetch market data");
  return res.json();
};


export async function fetchTopCoinsDataApi() {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
  );
  if (!res.ok) throw new Error("Failed to fetch top coins data");
  return res.json();
};

export async function fetchPriceHistoryDataApi() {
  const res = await fetch (
    `${BASE_URL}/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily`
  );
  if (!res.ok) throw new Error("Failed to fetch top coins data");
  return res.json();
};

export async function fetchMoversDataApi() {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`
  );
  if (!res.ok) throw new Error("Failed to fetch movers data");
  return res.json();
}
