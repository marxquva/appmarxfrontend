import { ShoppingBasket, X } from "lucide-react"

const PopupDetailsMovie = ({ movie, handlePopup, handleMovie, addToCart }) => {
    return (
        
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-5">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row relative">

                <button
                    onClick={() => {
                        handlePopup(false)
                        handleMovie(null)
                    }}
                    className="text-slate-700 rounded-full p-2 cursor-pointer absolute top-2 right-2"
                >
                    <X />
                </button>

                <div className="md:w-1/2 bg-slate-100">
                    <img
                        src={movie?.image_url}
                        alt="product"
                        className="w-full h-64 md:h-full object-cover"
                    />
                </div>

                <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2 py-1 rounded-md mb-3 inline-block">
                            {movie.genre || 'Pelicula'}
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{movie.title}</h2>
                        <div className="text-3xl font-black text-slate-800 mb-4 border-b pb-4">
                            S/. {movie.price}
                        </div>
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                            {movie.description}
                        </p>
                    </div>

                    <button
                        onClick={() => addToCart(movie)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-red-500/30 flex justify-center items-center gap-2 cursor-pointer"
                    >
                        <ShoppingBasket size={20} /> Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopupDetailsMovie