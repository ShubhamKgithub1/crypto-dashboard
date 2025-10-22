const NewsCardSkeleton =({className})=>{
    return (<div className={` ${className} flex flex-col rounded-md overflow-hidden`}>
        <div className="flex-1 bg-gray-300 animate-pulse"></div>
        <div className="p-4 flex flex-col gap-3">
            <p className="h-3 lg:h-4 w-20 rounded bg-gray-300 animate-pulse"></p>
            <p className="h-3 lg:h-3 rounded bg-gray-300 animate-pulse"></p>
            <p className="h-3 lg:h-3 rounded bg-gray-300 animate-pulse"></p>
            <p className="h-3 lg:h-3 w-[80%] rounded bg-gray-300 animate-pulse"></p>
            <p className="h-3 lg:h-4 w-24 rounded bg-gray-300 animate-pulse"></p>
        </div>
    </div>)
};

export default NewsCardSkeleton;