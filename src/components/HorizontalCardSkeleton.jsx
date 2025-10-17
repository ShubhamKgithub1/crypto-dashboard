const HorizontalHorizontalCardSkeleton = ({className}) => {
  return (
    <div className={`flex flex-col justify-center bg-gray-500 p-2 lg:p-4 rounded-lg lg:rounded-xl shadow-lg animate-pulse ${className} `}>
      <div className="h-3 lg:h-4 w-12 lg:w-20 bg-gray-300 rounded mb-2 animate-pulse"></div>
      <div className="h-3 lg:h-4 w-20 lg:w-40 bg-gray-300 rounded mb-2 animate-pulse"></div>
      <div className="h-3 lg:h-4 w-12 lg:w-20 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
};

export default HorizontalHorizontalCardSkeleton;
