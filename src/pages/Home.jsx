import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="relative flex justify-start items-center h-screen min-h-screen w-full bg-cover bg-center overflow-hidden"      
      style={{
        backgroundImage:
          "url('https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/4BE71252D24CC4CFEAEFFED1019A5B90476A406952AEF8822D5D119376B77133/compose?format=webp&width=3200')",
      }}
    >
      <div className="relative text-left px-8 md:px-16 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Películas y series ilimitadas
        </h1>

        <p className="text-lg text-gray-200 mb-8">
          Encuentra películas desde los S/ 10.
        </p>

        <Link
          to="/login"
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3 text-lg"
        >
          Ingresar ahora <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Home;