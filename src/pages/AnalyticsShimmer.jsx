import HorizontalCardSkeleton from "../components/HorizontalCardSkeleton";
import ChartSkeleton from "../components/ChartSkeleton";

const AnalyticsShimmer = ({ title }) => {
  return (
    <div className="lg:flex-1 flex flex-col w-full lg:min-h-0 p-2 lg:p-4 gap-3 xl:gap-6">
      <div className="rounded-lg">
        <h1 className="text-lg lg:text-2xl font-bold">{title}</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-6">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <HorizontalCardSkeleton key={i}/>
          ))}
      </div>
      <div className="lg:flex-1 lg:min-h-0 flex flex-col lg:flex-row gap-3 xl:gap-6">
        <ChartSkeleton className={"h-[300px] lg:h-full"}/>
        <ChartSkeleton className={"h-[300px] lg:h-full"}/>
      </div>
      <div className="lg:flex-1 lg:min-h-0 flex flex-col-reverse lg:grid lg:grid-cols-4 gap-3 xl:gap-6">
        <div className="h-[300px] lg:h-full lg:col-span-3 bg-gray-300 rounded-lg"></div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
          <ChartSkeleton className={"h-[70px] lg:h-full"}/>
          <ChartSkeleton className={"h-[70px] lg:h-full"}/>
          <ChartSkeleton className={"h-[70px] lg:h-full"}/>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsShimmer;
