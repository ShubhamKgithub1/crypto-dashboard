const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchMarketsSnapshotApi() {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
  );
  if (!res.ok) throw new Error("Failed to fetch markets snapshot");
  return res.json();
}

export async function fetchMarketDataApi() {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin,solana&sparkline=false`
  );
  if (!res.ok) throw new Error("Failed to fetch market data");
  return res.json();
}

export async function fetchTopCoinsOverallApi() {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
  );
  if (!res.ok) throw new Error("Failed to fetch top coins overall");
  return res.json();
}

export async function fetchTopCoinsDailyApi() {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=false`
  );
  if (!res.ok) throw new Error("Failed to fetch top coins (24h)");
  return res.json();
}


export async function fetchPriceHistoryDataApi() {
  const coinIds = ["bitcoin", "ethereum", "solana"];

  const promises = coinIds.map(async (id) => {
    const res = await fetch(
      `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
    );
    if (!res.ok) throw new Error(`Failed to fetch data for ${id}`);
    const data = await res.json();
    return { id, ...data }; // keep coin id + returned data
  });

  const results = await Promise.all(promises);

  const coinsHistory = {};
  results.forEach((coin) => {
    coinsHistory[coin.id] = {
      prices: coin.prices,
      market_caps: coin.market_caps,
      total_volumes: coin.total_volumes,
    };
  });

  // ---- Build global marketCapHistory ----
  const marketCapHistory = results[0].market_caps.map((point, idx) => {
    const timestamp = point[0];
    const totalCap = results.reduce(
      (sum, coin) => sum + coin.market_caps[idx][1],
      0
    );
    return [timestamp, totalCap];
  });

  // ---- Build dominanceHistory ----
  const dominanceHistory = results[0].market_caps.map((point, idx) => {
    const timestamp = point[0];
    const totalCap = marketCapHistory[idx][1];

    const dominanceData = { timestamp };
    results.forEach((coin) => {
      dominanceData[coin.id] =
        +((coin.market_caps[idx][1] / totalCap) * 100).toFixed(2);
    });

    return dominanceData;
  });
    // ---- Remove duplicate last day ----
  marketCapHistory.pop();
  dominanceHistory.pop();
  Object.keys(coinsHistory).forEach((id) => {
    coinsHistory[id].prices.pop();
    coinsHistory[id].market_caps.pop();
    coinsHistory[id].total_volumes.pop();
  });

  return { coinsHistory, marketCapHistory, dominanceHistory };
}


export async function fetchMoversDataApi() {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`
  );
  if (!res.ok) throw new Error("Failed to fetch movers data");
  return res.json();
}
export async function fetchGlobalDataApi() {
  const res = await fetch(`${BASE_URL}/global`);
  if (!res.ok) throw new Error("Failed to fetch global market data");
  return res.json();
}
