const CardSkeleton = ({className}) => {
  return (
    <div className={`flex flex-col justify-center bg-gray-400 p-4 rounded-xl shadow-lg animate-pulse ${className} `}>
      {/* Coin name placeholder */}
      <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>

      {/* Price placeholder */}
      <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>

      {/* Change % placeholder */}
      <div className="h-4 w-28 bg-gray-300 rounded"></div>
    </div>
  );
};

export default CardSkeleton;
