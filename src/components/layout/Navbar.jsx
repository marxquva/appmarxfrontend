import { LogOut, Film, ShoppingBasket } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { Link, NavLink } from "react-router-dom"

const Navbar = () => {
    const { user, logout, cart, clearCart } = useAppStore();

    return (
        <div className="sticky top-0 w-full h-16 bg-gray-950 flex justify-between items-center px-4 z-50">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Film className="w-6 h-6 text-red-600" />
                    <Link to="/">
                        <h2 className="text-white font-extrabold text-lg">PelisMarx</h2>
                    </Link>
                </div>

                {user && (
                    <div>
                        <NavLink
                            to="/movies"
                            className={({ isActive }) =>
                                `bg-slate-900 hover:bg-slate-800 font-bold py-2 px-4 rounded-lg text-xs cursor-pointer transition-colors ${isActive ? "text-yellow-400" : "text-white hover:text-red-300"
                                }`
                            }
                        >
                            Películas
                        </NavLink>

                        <NavLink
                            to="/miscompras"
                            className={({ isActive }) =>
                                `bg-slate-900 hover:bg-slate-800 font-bold py-2 px-4 rounded-lg text-xs cursor-pointer ml-2 transition-colors ${isActive ? "text-yellow-400" : "text-white hover:text-red-300"
                                }`
                            }
                        >
                            Mis Compras
                        </NavLink>
                    </div>

                )}
            </div>

            {user ? (
                <div className="flex items-center gap-6">
                    <Link to="/cart" className="relative">
                        <ShoppingBasket
                            className="text-red-500 hover:text-red-400 cursor-pointer"
                            size={25}
                        />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 text-xs text-white rounded-full bg-red-500 w-4 h-4 flex justify-center items-center">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    <div className="text-right">
                        <Link to="/profile" className="relative">
                            <h2 className="text-white text-lg">{user?.name}</h2>
                            <h3 className="text-gray-400 text-xs">{user?.role}</h3>
                        </Link>
                    </div>

                    <LogOut
                        onClick={() => {
                            logout();
                            clearCart();
                        }}
                        className="w-10 h-10 text-white hover:text-red-500 cursor-pointer p-2 rounded-md bg-transparent hover:bg-white/10 transition-colors"
                    />
                </div>
            ) : (
                <Link
                    to="/login"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-xs cursor-pointer transition-all"
                >
                    Iniciar Sesión
                </Link>
            )}
        </div>
    );
};

export default Navbar;