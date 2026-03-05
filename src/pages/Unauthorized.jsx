import { ShieldX  } from "lucide-react";
const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <ShieldX size={80} className="mx-auto text-gray-200 mb-6" />
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-300 mb-6 leading-tight">
                Acceso denegado
            </h1>
        </div>
    )
}

export default Unauthorized