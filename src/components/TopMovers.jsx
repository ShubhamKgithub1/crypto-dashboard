const TopMovers = () => {
  const gainers = [
    { name: "Solana", change: "+8.2%" },
    { name: "Cardano", change: "+5.6%" },
    { name: "Polkadot", change: "+4.1%" },
  ];

  const losers = [
    { name: "XRP", change: "-3.4%" },
    { name: "Litecoin", change: "-2.8%" },
    { name: "Shiba Inu", change: "-1.9%" },
  ];

  return (
  <div className="flex flex-col justify-between h-full w-full gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="font-semibold mb-2">Top Gainers</h1>
        {gainers.map((coin, index) => (
          <div key={index} className="flex justify-between text-sm py-1">
            <span className="text-gray-600">{coin.name}</span>
            <span className="text-green-500">{coin.change}</span>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="font-semibold mb-2">Top Losers</h1>
        {losers.map((coin, index) => (
          <div key={index} className="flex justify-between text-sm py-1">
            <span className="text-gray-600">{coin.name}</span>
            <span className="text-red-500">{coin.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMovers;
