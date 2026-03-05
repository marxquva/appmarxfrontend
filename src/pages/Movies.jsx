import axios from "axios"
import { Loader, Eye, ShoppingBasket, X, Star, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppStore } from "../store/useAppStore"
import PopupDetailsMovie from "../components/Movies/PopupDetailsMovie"
import CardMovie from "../components/Movies/CardMovie"

const API = "https://5a67bc704b1cdcba.mokky.dev"

const Movies = () => {

    const { addToCart } = useAppStore()

    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [movie, setMovie] = useState(null)
    const [search, setSearch] = useState("")
    const [selectedGenre, setSelectedGenre] = useState("Todos")

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${API}/movies`)
                setMovies(response.data)
                setFilteredMovies(response.data)
            } catch (err) {
                console.log("err: ", err)
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [])

    useEffect(() => {
        let temp = [...movies]

        if (search) {
            temp = temp.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
        }

        if (selectedGenre !== "Todos") {
            temp = temp.filter(m => m.genre === selectedGenre)
        }

        setFilteredMovies(temp)
    }, [search, selectedGenre, movies])

    const handlePopup = (active) => setShow(active)
    const handleMovie = (movieOnly) => setMovie(movieOnly)

    const genres = ["Todos", ...new Set(movies.map(m => m.genre))]

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Loader className="h-20 w-20 text-red-600 animate-spin" />
            </div>
        )
    }

    return (
        <div
            className="flex flex-col items-center justify-start min-h-screen p-5 relative z-10 transition-all duration-300">

             <div className="relative mb-4 w-[90%] md:w-[70%]">
                <label className="block text-white font-bold mb-2 text-sm">
                    Buscar Película
                </label>
                <Search 
                    className="absolute left-3 text-gray-400" 
                    style={{ top: '65%', transform: 'translateY(-50%)' }} 
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Título de la película..."
                    className="w-full pl-10 px-5 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
            </div>

            <div className="flex gap-3 mb-6 flex-wrap">
                {genres.map((genre, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-3 py-1 rounded-full font-medium cursor-pointer ${
                            selectedGenre === genre
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-gray-800"
                        }`}
                    >
                        {genre}
                    </button>
                ))}
            </div>

           

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {filteredMovies.map((item, index) => (
                    <CardMovie
                        key={index}
                        item={item}
                        handlePopup={handlePopup}
                        handleMovie={handleMovie}
                        addToCart={addToCart}
                    />
                ))}
            </div>

            {
                show &&
                <PopupDetailsMovie
                    {...{
                        movie,
                        handlePopup,
                        handleMovie,
                        addToCart
                    }}
                />
            }
                

        </div>
    )
}

export default Movies