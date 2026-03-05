import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { useAppStore } from "../../store/useAppStore"
import { Loader, Film } from "lucide-react"
import TableGeneral from "../../components/TableGeneral"
import { Link } from "react-router-dom";

const Shopping = () => {

    const { URLAPI, user } = useAppStore()
    const [purchasesUser, setPurchasesUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [sortBy, setSortBy] = useState("date")

    useEffect(() => {
        const fetchPurchasesUser = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${URLAPI}/ordersapp?userId=${user.id}&userEmail=${user.email}`)
                if (response?.status === 200) {
                    console.log('*************')
                    console.log(response)
                    console.log('*************')
                    setPurchasesUser(response.data)
                }
            }
            catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: "Hubo un error al momento de traer las compras del usuario",
                    icon: 'error',
                })
            }
            finally {
                setLoading(false)
            }
        }

        fetchPurchasesUser()
    }, [])

    const sortedPurchases = () => {
        let sorted = [...purchasesUser]

        switch (sortBy) {
            case "alphabetical":
                sorted.sort((a, b) => {
                    const titleA = a.movieTitle ?? ""
                    const titleB = b.movieTitle ?? ""
                    return titleA.localeCompare(titleB)
                })
                break
            case "date":
                sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
                break
            case "price":
                sorted.sort((a, b) => b.price - a.price)
                break
            default:
                break
        }

        return sorted
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader className="h-20 w-20 text-red-600 animate-spin" />
            </div>
        )
    }

    if (purchasesUser.length === 0) {
        return (
            <div className="mx-auto px-4 py-16 min-h-screen flex items-center justify-center text-center">
                <div className="max-w-xl mx-auto">
                    <Film size={70} className="mx-auto text-gray-200 mb-6 md:w-20 md:h-20" />

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300 mb-4">
                        No ha realizado compras hasta el momento.
                    </h2>

                    <p className="text-sm sm:text-base text-gray-500 mb-8">
                        ¡Hay miles de películas esperando por ti!
                    </p>

                    <Link
                        to="/movies"
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-xl transition-colors shadow-md text-sm md:text-base"
                    >
                        Ver Películas
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mx-auto">

                <div className="pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Film className="text-rose-500" size={32} />
                        <h2 className="text-2xl font-bold text-white">Mi Historial de Compras</h2>
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 bg-white rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
                    >
                        <option value="alphabetical">Alfabético [A-Z]</option>
                        <option value="date">Fecha de Compra</option>
                        <option value="price">Precio</option>
                    </select>
                </div>

                <div className="mt-3 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden px-5">
                    <TableGeneral data={sortedPurchases()} tableType={"shopping"} />
                </div>
            </div>
        </div>
    )
}

export default Shopping