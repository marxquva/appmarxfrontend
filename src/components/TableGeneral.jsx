const TableGeneral = ({ data, tableType }) => {

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
                <thead>
                    <tr className={`border-b border-gray-500 text-gray-600 ${tableType === "panel" && "bg-gray-900 text-white"}`}>
                        {tableType === "panel" && <th className="hidden md:table-cell p-2 sm:p-4 font-bold text-left">Cliente(Email)</th>}
                        <th className="p-2 sm:p-4 font-bold text-sm sm:text-base">Película</th>
                        <th className="p-2 sm:p-4 font-bold text-sm sm:text-base">Fecha de Transacción</th>
                        <th className="p-2 sm:p-4 font-bold text-sm sm:text-base text-right">Unidades</th>
                        <th className="p-2 sm:p-4 font-bold text-sm sm:text-base text-right">Monto Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            {tableType === "panel" && <td className="hidden md:table-cell p-2 sm:p-4 text-red-600">{item?.userEmail}</td>}
                            <td className="p-2 sm:p-4 flex items-center gap-2 sm:gap-4">
                                <img src={item.movieImage} alt="pelicula" className="w-8 h-10 sm:w-10 sm:h-12 object-cover rounded-xs" />
                                <div className="flex flex-col gap-1 sm:gap-2 text-xs sm:text-sm">
                                    <div>{item.movieTitle}</div>
                                    <div className="text-gray-500 text-[10px] sm:text-xs">Order #{item.id}</div>
                                </div>
                            </td>
                            <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-500">{new Date(item?.date).toLocaleString()}</td>
                            <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-500">{item?.quantity}</td>
                            <td className="p-2 sm:p-4 font-black text-red-600 text-right text-xs sm:text-sm">S/. {item?.quantity * item?.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableGeneral