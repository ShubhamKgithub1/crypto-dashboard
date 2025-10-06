import { useSelector, useDispatch } from "react-redux";
import { selectModalState, closeModal } from "../features/modalSlice";
import { formatNumber } from "../utils/formatNumber";

const Modal = () => {
  const { isOpen, data } = useSelector(selectModalState);
  const dispatch = useDispatch();

  if (!isOpen || !data) return null;

  const {
    name,
    image,
    current_price,
    market_cap,
    total_volume,
    price_change_percentage_24h,
    symbol,
  } = data;

  const priceChangeColor =
    price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          dispatch(closeModal());
        }
      }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={() => dispatch(closeModal())}
        className="absolute inset-0"
      ></div>
      <div className="z-[99] bg-white p-6 rounded-2xl max-w-md w-full shadow-lg relative animate-fadeIn">
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <img src={image} alt={name} className="w-10 h-10" />
          <div>
            <h2 className="text-xl font-semibold">
              {name}{" "}
              <span className="text-gray-500 uppercase text-sm">
                ({symbol})
              </span>
            </h2>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-medium">
            Price:{" "}
            <span className="font-semibold">
              ${current_price?.toLocaleString()}
            </span>
          </p>
          <p className={priceChangeColor}>
            24h Change: {price_change_percentage_24h?.toFixed(2)}%
          </p>
          <p>Market Cap: ${formatNumber(market_cap)}</p>
          <p>Volume: ${formatNumber(total_volume)}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
