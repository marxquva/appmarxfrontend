import { Star, ShoppingBasket, Eye } from "lucide-react"

const CardMovie = ({ item, handlePopup, handleMovie, addToCart }) => {
    return (

        <div
            className="relative w-65 h-102 rounded-xl overflow-hidden shadow-lg group transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
        >
            <img
                src={item.image_url}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative flex flex-col justify-between h-full p-4 text-white">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-bold">
                            {item.year}
                        </span>

                        <div className="flex gap-[0.6]">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    className={
                                        i < Math.round(item.stars)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-400"
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                handlePopup(true);
                                handleMovie(item);
                            }}
                            className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-red-600 transition-all cursor-pointer"
                        >
                            <Eye size={18} />
                        </button>

                        <button
                            onClick={() => addToCart(item)}
                            className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-red-600 transition-all cursor-pointer"
                        >
                            <ShoppingBasket size={18} />
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold truncate">{item.title}</h2>
                    <p className="text-sm text-gray-200 line-clamp-2">
                        {item.description}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default CardMovie