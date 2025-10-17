import HorizontalCardSkeleton from "../components/HorizontalCardSkeleton";
import ChartSkeleton from "../components/ChartSkeleton";

const DashboardShimmer = () => {
  return (
    <div className="lg:flex-1 flex flex-col w-full lg:min-h-0 p-2 lg:p-4 gap-3 xl:gap-6">
      <div>
        <h1 className="text-lg lg:text-2xl font-bold">Crypto Dashboard</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <HorizontalCardSkeleton key={i}/>
          ))}
      </div>
      <div className="lg:flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-4 gap-3 xl:gap-6">
        <div className="lg:col-span-2">
          <ChartSkeleton className={"h-[300px] lg:h-full"} />
        </div>
        <div className="">
          <ChartSkeleton className={"h-[300px] lg:h-full"} />
        </div>
        <div className="flex flex-col gap-3 lg:gap-4">
          <ChartSkeleton className={"h-[200px] lg:h-full"} />
          <ChartSkeleton className={"h-[200px] lg:h-full"} />
        </div>
      </div>
      <div className="flex-1 flex min-h-0">
        <ChartSkeleton/>
      </div>
    </div>
  );
};

export default DashboardShimmer;
