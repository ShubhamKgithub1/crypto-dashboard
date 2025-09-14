const Sidebar = () => {
    
  return (
    <div>
      <aside className="w-64 bg-white shadow h-screen p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">CryptoDash</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-gray-700 hover:text-blue-500">
            Dashboard
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">
            Markets
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">
            Portfolio
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">
            News
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">
            Settings
          </a>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
