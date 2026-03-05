import axios from "axios"
import { useEffect, useState } from "react"
import { DollarSign, Loader, ShieldAlert } from "lucide-react"
import Swal from "sweetalert2"
import TableGeneral from "../../components/TableGeneral"
import { useAppStore } from "../../store/useAppStore"

const Admin = () => {
    const { URLAPI } = useAppStore()

    const [purchasesAll, setPurchasesAll] = useState([])
    const [loading, setLoading] = useState(false)

    const totalAmount = purchasesAll?.reduce((acc, item) => {
        return acc + (item?.quantity * item?.price) 
    }, 0)

    useEffect(() => {
        const fetchPurchasesAll = async () => {
            setLoading(true)
            try {
                console.log(URLAPI)
                const response = await axios.get(`${URLAPI}/ordersapp`)
                console.log("response: ", response)
                if (response?.status === 200) {
                    setPurchasesAll(response?.data)
                }
            }
            catch (error) {
                console.log("error: ", error)
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

        fetchPurchasesAll()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Loader className="h-20 w-20 text-indigo-600 animate-spin" />
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            <div className="flex items-center gap-3 mb-8">
                <ShieldAlert className="text-rose-500" size={32} />
                <h1 className="text-2xl font-black text-white">Panel de Control</h1>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8 flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-xl text-green-600">
                    <DollarSign size={32} />
                </div>
                <div>
                    <p className="text-gray-500 font-bold">Ingresos Totales</p>
                    <p className="text-3xl font-black text-gray-900">S/. {totalAmount}</p>
                </div>
            </div>
            <div className="mt-3 bg-white rounded-3xl shadow-sm border border-gray-200  overflow-hidden">
                <TableGeneral data={purchasesAll} tableType={"panel"} />
            </div>
        </div>
    )
}
export default Admin