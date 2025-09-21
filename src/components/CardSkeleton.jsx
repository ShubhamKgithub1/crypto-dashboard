const CardSkeleton = () => {
  return (
    <div className="bg-gray-400 p-4 rounded-xl shadow-md animate-pulse">
      {/* Coin name placeholder */}
      <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>

      {/* Price placeholder */}
      <div className="h-6 w-24 bg-gray-300 rounded mb-2"></div>

      {/* Change % placeholder */}
      <div className="h-4 w-16 bg-gray-300 rounded"></div>
    </div>
  );
};

export default CardSkeleton;
