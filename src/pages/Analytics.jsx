import Navbar from "../components/Navbar";

const Analytics = () => {
  return (
    <div className="flex-1 flex flex-col p-4 gap-6">
      {/* Page Header */}
      <header>
        <Navbar title="Analytics" />
        <p className="text-gray-500">Detailed crypto insights and trends</p>
      </header>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Left Column */}
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Correlation Matrix</h2>
          <div className="flex-1 min-h-[300px]">[Chart here]</div>
        </div>

        {/* Right Column */}
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Volatility Index</h2>
          <div className="flex-1 min-h-[300px]">[Chart here]</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white p-4 rounded-xl shadow-md flex flex-col flex-1 min-h-[400px]">
        <h2 className="text-lg font-semibold mb-4">Historical Trends</h2>
        <div className="flex-1">[Big chart / table here]</div>
      </div>
    </div>
  );
};

export default Analytics;
