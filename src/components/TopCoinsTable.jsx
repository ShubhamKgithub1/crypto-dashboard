const TopCoinsTable = () => {
  const topCoins = [
    { rank: 1, name: "Bitcoin", price: 31000, change: 2.5, marketCap: "600B" },
    { rank: 2, name: "Ethereum", price: 2100, change: -1.2, marketCap: "250B" },
    { rank: 3, name: "Dogecoin", price: 0.07, change: 4.1, marketCap: "9B" },
  ];
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {topCoins.map((coin, index) => (
            <tr key={index}>
              <td>{coin.rank}</td>
              <td>{coin.name}</td>
              <td>${coin.price}</td>
              <td>{coin.change}%</td>
              <td>{coin.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopCoinsTable;
