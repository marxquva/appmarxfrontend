import { Loader, Mail, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { login, user, isLoading } = useAppStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    useEffect(() => {
        if (user !== null) {
            navigate("/movies");
        }
    }, [user]);

    return (
        <div
            className="relative flex justify-start items-center h-screen w-full bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage:
                    "url('https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/4BE71252D24CC4CFEAEFFED1019A5B90476A406952AEF8822D5D119376B77133/compose?format=webp&width=3200')",
            }}
        >
            <div className="relative text-left px-8 md:px-16 w-full max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                    Inicia sesión
                </h1>

                <p className="text-gray-200 mb-8">
                    Ingresa tus datos para continuar.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 space-y-6"
                >
                    <div className="relative">
                        <label className="block text-gray-700 font-bold mb-2 text-sm">
                            Correo
                        </label>
                        <Mail className="absolute left-3 text-gray-400" style={{ top: '65%', transform: 'translateY(-50%)' }} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 px-5 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="correo@ejemplo.com"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-gray-700 font-bold mb-2 text-sm">
                            Contraseña
                        </label>
                        <Lock className="absolute left-3 text-gray-400" style={{ top: '65%', transform: 'translateY(-50%)' }} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-10 px-5 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="********"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl flex justify-center items-center h-14 disabled:bg-gray-400 cursor-pointer"
                    >
                        {isLoading ? (
                            <Loader className="h-6 w-6 text-red-600 animate-spin" />
                        ) : (
                            "Entrar a la tienda"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;