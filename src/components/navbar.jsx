const Navbar = () => {
  return (
    <div className="bg-white flex shadow p-4 justify-between items-center">
      <h1 className="text-2xl font-bold">Crypto Dashboard</h1>
      <div className="space-x-4">
        <button className="px-4 py-2 rounded bg-blue-500 text-white">
          Dashboard
        </button>
        <button className="px-4 py-2 rounded bg-gray-200">Settings</button>
      </div>
    </div>
  );
};

export default Navbar;
