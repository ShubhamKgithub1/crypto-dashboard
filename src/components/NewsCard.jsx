import { formatDistanceToNow } from "date-fns";

const NewsCard=({article})=>{
    const {title, description, published_at} = article;
    return (
        <div className="flex flex-col p-4 bg-white rounded-md shadow-sm hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold mb-1">{title}</h2>
            <p className="text-sm text-gray-500 font-semibold">{description}</p>
            <div>
                <span className="text-sm text-gray-800 font-semibold">Published At: </span>
                <span className="text-sm text-gray-500"> {formatDistanceToNow(new Date(published_at), { addSuffix: true })}</span>
            </div>
        </div>
    )
};

export default NewsCard;