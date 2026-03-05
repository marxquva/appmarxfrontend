import { Loader, CreditCard, Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { useAppStore } from "../store/useAppStore"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Cart = () => {

    const cambiarPagina = useNavigate()

    const { cart, updateQuantity, removeFromCart, URLAPI, user, clearCart } = useAppStore()

    const [isCheckingOut, setIsCheckingOut] = useState(false)

    const totalAmount = cart.reduce((acc, item) => {
        return acc + (item.movie.price * item.quantity)
    }, 0)

    const handleCheckout = async () => {
        //console.log(cart)
        try {
            setIsCheckingOut(true)

            for (let i = 0; i < cart.length; i++) {
                const json = {
                    "userId": user.id,
                    "userName": user.name,
                    "userEmail": user.email,
                    "movieId": cart?.[i]?.movie?.id,
                    "movieTitle": cart?.[i]?.movie?.title,
                    "movieImage": cart?.[i]?.movie?.image_url,
                    "price": cart?.[i]?.movie?.price,
                    "quantity": cart?.[i]?.quantity,
                    "app": 1,
                    "date": new Date().toISOString(),
                }

                const res = await axios.post(`${URLAPI}/ordersapp`, json)
                console.log("res: ", res)
                if (res?.status !== 201) {
                    break
                }
            }
            clearCart()
            Swal.fire({
                title: 'Pago exitoso',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            })
            cambiarPagina("/movies")
        }
        catch (error) {
            console.log("error: ", error)
            Swal.fire({
                title: 'Error',
                text: "Hubo un error al momento de procesar el pago",
                icon: 'error',
            })
        }
        finally {
            setIsCheckingOut(false)
        }
    }

    if (cart.length === 0) {
        return (
            <div className="mx-auto px-4 py-16 text-center min-h-screen flex items-center justify-center">
                <div className="max-w-xl mx-auto">
                    <ShoppingBasket size={70} className="mx-auto text-gray-200 mb-6 md:w-20 md:h-20" />

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300 mb-4">
                        Tu carrito está vacío
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
        <div
            className="mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8 min-h-screen">

            <div className="lg:col-span-2">
                <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <ShoppingBasket /> Mi Carrito
                </h1>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                    {cart.map((item) => {
                        const p = item?.movie;
                        const mainImg = p?.image_url

                        return (
                            <div key={p.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6">
                                <img src={mainImg} alt={p.title} className="w-24 h-24 object-cover rounded-xl border border-gray-100" />

                                <div className="flex grow text-center sm:text-left">
                                    <h3 className="font-bold text-gray-800 text-lg mb-1">{p.title}</h3>
                                    <span className="text-red-600 font-black ml-2">S/. {p.price} <span className="text-gray-400 font-normal text-sm">c/u</span></span>
                                </div>

                                <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                                    <button
                                        onClick={() => updateQuantity(p.id, item.quantity - 1)}
                                        className="p-1 bg-white rounded-md text-gray-600 hover:bg-gray-200 shadow-sm transition"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-8 text-center font-bold text-gray-800">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(p.id, item.quantity + 1)}
                                        className="p-1 bg-white rounded-md text-gray-600 hover:bg-gray-200 shadow-sm transition"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <div className="font-black text-gray-800 text-lg min-w-20 sm:text-right text-center">
                                    S/. {p.price * item.quantity}
                                </div>

                                <button
                                    onClick={() => removeFromCart(p.id)}
                                    className="p-2 text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition"
                                    title="Eliminar del carrito"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-black rounded-2xl p-6 shadow-xl text-white sticky top-24">
                    <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-700">Resumen del Pedido</h2>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-gray-300">
                            <span>Subtotal ({cart.length} items)</span>
                            <span>S/.{totalAmount}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                            <span>Envío</span>
                            <span className="text-amber-400 font-bold">Gratis</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end mb-8 pt-4 border-t border-gray-700">
                        <span className="text-lg font-bold">Total a Pagar</span>
                        <span className="text-4xl font-black text-red-400">S/.{totalAmount}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-red-500/25 flex justify-center items-center gap-2 text-lg cursor-pointer"
                    >
                        {isCheckingOut ? <Loader className="animate-spin" /> : <><CreditCard /> Proceder al Pago</>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart