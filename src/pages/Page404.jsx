import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl md:text-6xl font-extrabold text-red-900 mb-6 leading-tight">
                404
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                La página que estás buscando no existe
            </p>
            <Link
                to="/"
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3 text-lg"
            >
                Ver Películas
            </Link>
        </div>
    )
}

export default Page404