import { LogOut, Film, ShoppingBasket, Menu, X } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const { user, logout, hasRole, cart, clearCart } = useAppStore();
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className="sticky top-0 w-full bg-gray-950 z-50">

            <div className="h-16 flex justify-between items-center px-4">

                <div className="flex items-center gap-2">
                    <Film className="w-6 h-6 text-red-600" />
                    <Link to="/">
                        <h2 className="text-white font-extrabold text-lg">PelisMarx</h2>
                    </Link>
                </div>

                {user && (
                    <div className="hidden md:flex items-center gap-2">
                        <NavLink
                            to="/movies"
                            className={({ isActive }) =>
                                `bg-gray-900 hover:bg-gray-800 font-bold py-2 px-4 rounded-lg text-xs transition-colors ${isActive ? "text-yellow-400" : "text-white hover:text-red-300"
                                }`
                            }
                        >
                            Películas
                        </NavLink>

                        <NavLink
                            to="/miscompras"
                            className={({ isActive }) =>
                                `bg-gray-900 hover:bg-gray-800 font-bold py-2 px-4 rounded-lg text-xs transition-colors ${isActive ? "text-yellow-400" : "text-white hover:text-red-300"
                                }`
                            }
                        >
                            Mis Compras
                        </NavLink>

                        {hasRole(["admin", "manager"]) && (
                            <Link to="/panel" className="bg-orange-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-xs">
                                Panel
                            </Link>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">

                    {user && (
                        <Link to="/cart" className="relative">
                            <ShoppingBasket className="text-red-500 hover:text-red-400" size={24} />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 text-xs text-white rounded-full bg-red-500 w-4 h-4 flex justify-center items-center">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    )}

                    {user && (
                        <div className="hidden md:flex items-center gap-3">
                            <Link to="/profile" className="text-right">
                                <h2 className="text-white text-sm leading-tight">{user?.name}</h2>
                                <h3 className="text-gray-400 text-xs leading-tight">{user?.role}</h3>
                            </Link>

                            <LogOut
                                onClick={() => {
                                    logout();
                                    clearCart();
                                }}
                                className="w-9 h-9 text-white hover:text-red-500 cursor-pointer p-2 rounded-md bg-transparent hover:bg-white/10 transition-colors"
                            />
                        </div>
                    )}

                    {user && (
                        <button
                            onClick={() => setOpenMenu(!openMenu)}
                            className="md:hidden text-white"
                        >
                            {openMenu ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    )}

                    {!user && (
                        <Link
                            to="/login"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-xs"
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>

            {openMenu && user && (
                <div className="md:hidden bg-gray-950 border-t border-gray-800 flex flex-col gap-3 p-4">

                    <NavLink to="/movies" className="text-white hover:text-red-400">
                        Películas
                    </NavLink>

                    <NavLink to="/miscompras" className="text-white hover:text-red-400">
                        Mis Compras
                    </NavLink>

                    {hasRole(["admin", "manager"]) && (
                        <Link to="/panel" className="text-white hover:text-red-400">
                            Panel
                        </Link>
                    )}

                    <Link to="/profile" className="text-white">
                        {user?.name} ({user?.role})
                    </Link>

                    <button
                        onClick={() => {
                            logout();
                            clearCart();
                        }}
                        className="flex items-center gap-2 text-red-400"
                    >
                        <LogOut size={18} /> Cerrar sesión
                    </button>

                </div>
            )}

        </div>
    );
};

export default Navbar;