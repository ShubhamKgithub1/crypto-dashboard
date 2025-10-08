import CardSkeleton from "../components/CardSkeleton";
import ChartSkeleton from "../components/ChartSkeleton";

const AnalyticsShimmer = ({ title }) => {
  return (
    <div className="flex-1 flex flex-col w-full min-h-0 p-4 gap-6">
      <div className="rounded-lg">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="h-[10dvh] grid grid-cols-5 gap-6">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <CardSkeleton key={i} />
          ))}
      </div>
      <div className="flex-1 min-h-0 flex gap-4">
        <ChartSkeleton className={"h-full"} />
        <ChartSkeleton className={"h-full"} />
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-4 gap-4">
        <div className="col-span-3 bg-gray-400 rounded-lg"></div>
        <div className="flex flex-col gap-4">
          <ChartSkeleton className={"h-full"} />
          <ChartSkeleton className={"h-full"} />
          <ChartSkeleton className={"h-full"} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsShimmer;
