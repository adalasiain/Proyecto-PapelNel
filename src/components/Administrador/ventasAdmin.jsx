import { useEffect, useState } from "react";
import Sales from "../../Services/SalesServces";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  AccountBalanceRounded,
  AttachMoneyRounded,
  CalendarToday,
  CalendarTodayRounded,
  CalendarTodayTwoTone,
  MonetizationOnRounded,
  PaymentRounded,
  Person2Rounded,
  Receipt,
  SellRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import { FaComputer } from "react-icons/fa6";
import {
  FaAngleUp,
  FaAngleDown,
  FaMoneyBillWave,
  FaBox,
  FaSearch,
  FaDollarSign,
  FaCalendarAlt,
  FaFilter,
  FaUser,
  FaChartBar,
} from "react-icons/fa";
import { useProductsContext } from "../../context/productsContext";
import { Link, Outlet, useLocation } from "react-router-dom";
function DynamicFilter() {
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const vendedores = [
    { id: 1, nombre: "Juan Pérez" },
    { id: 2, nombre: "María García" },
    { id: 3, nombre: "Carlos López" },
  ];

  const fechas = [
    { id: "hoy", nombre: "Hoy" },
    { id: "semana", nombre: "Esta semana" },
    { id: "mes", nombre: "Este mes" },
    { id: "anio", nombre: "Este año" },
  ];

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setFilterValue("");
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className="flex gap-1 border-2 rounded-full p-1 w-full md:w-auto">
      <div className="relative flex gap-1 w-full ">
        <select
          className=" appearance-none rounded-full w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8  shadow leading-tight focus:outline-none focus:shadow-outline"
          value={filterType}
          onChange={handleFilterTypeChange}
        >
          <option value="">Filtrar</option>
          <option value="vendedor">Por vendedor</option>
          <option value="fecha">Por fecha</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <FaFilter className="h-4 w-4" />
        </div>
      </div>

      {filterType && (
        <div className="relative flex gap-1 w-full ">
          <select
            className=" appearance-none rounded-full w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8  shadow leading-tight focus:outline-none focus:shadow-outline"
            value={filterValue}
            onChange={handleFilterValueChange}
          >
            <option value="">Seleccione {filterType}</option>
            {filterType === "vendedor" &&
              vendedores.map((vendedor) => (
                <option key={vendedor.id} value={vendedor.id}>
                  {vendedor.nombre}
                </option>
              ))}
            {filterType === "fecha" &&
              fechas.map((fecha) => (
                <option key={fecha.id} value={fecha.id}>
                  {fecha.nombre}
                </option>
              ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            {filterType === "vendedor"?<FaUser className="h-4 w-4" />:<FaCalendarAlt className="h-4 w-4" />}
            
          </div>
        </div>
      )}
    </div>
  );
}

const VentasAdmin = () => {
  const salesService = new Sales();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const ruta = useLocation();

  const obtenerVentas = async () => {
    const ventas = await salesService.getSales();
    setVentas(ventas);
    setLoading(false);
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  const [salesByDate, setSalesByDate] = useState([]);

  useEffect(() => {
    // agrupar ventas por fechas, total vendido y lista de ventas
    const ventasPorFecha = ventas.reverse().reduce((acc, venta) => {
      const fechaVentaString = new Date(venta.createdAt).toLocaleDateString();

      const ventaFecha = acc.find((venta) => venta.fecha === fechaVentaString);
      if (ventaFecha) {
        ventaFecha.total += venta.total;
        ventaFecha.ventas.push(venta);
      } else {
        acc.push({
          fecha: fechaVentaString,
          total: venta.total,
          ventas: [venta],
        });
      }
      return acc;
    }, []);

    setSalesByDate(ventasPorFecha);
  }, [loading]);

  

  return (
    <div className="w-full flex-auto bg-gray-100">
      <div className=" p-4 sticky top-0 px-2 py-4 bg-gray-100 z-10  flex justify-between  pb-2 border-b-2 flex-col lg:flex-row   gap-2">
       
        <nav className="flex  space-x-3">
        <h1 className="text-4xl font-bold text-center text-gray-800">Ventas</h1>
              <ul className="flex items-center gap-x-1 p-1 rounded-full bg-white border-color_base border-2">
                <Link to={"/administrador/ventas/productos"} className={`flex items-center gap-x-2 font-bold  py-2 px-6 rounded-full hover:bg-color_base ${ruta.pathname==="/administrador/ventas/productos" && 'bg-blue-400'} `}>
                 
                    <FaBox className="text-xl mr-1 " />
                    Productos
                
                </Link>

                <Link to={"/administrador/ventas/servicios"} className={`flex items-center gap-x-2 font-bold  py-2 px-6 rounded-full hover:bg-color_base ${ruta.pathname==="/administrador/ventas/servicios" && 'bg-blue-400'} `}>
                 
                    <FaComputer className="text-2xl mr-1" />
                    Servicios
                  
                </Link>
              </ul>
            </nav>
        <DynamicFilter />
      </div>

    
       <div className="p-4 "> 
         {/* Resumen de ventas */}
        {/*<div className="bg-gray-100 rounded-lg shadow-md p-6 mb-8 ">
          <h2 className="text-2xl font-semibold mb-4">Resumen de Ventas</h2>
          <div className="flex justify-around items-center">
            <div className="text-center">
              <FaMoneyBillWave className="text-5xl text-green-500 mx-auto mb-2" />
              <p className="text-lg font-semibold">Total de Ventas</p>
              <p className="text-3xl font-bold text-green-600">
                {/* ${filteredSales.reduce((sum, day) => sum + day.sales.reduce((daySum, sale) => daySum + sale.total, 0), 0).toFixed(2)} 
                2000
              </p>
            </div>
            <div className="text-center">
              <FaUser className="text-5xl text-blue-500 mx-auto mb-2" />
              <p className="text-lg font-semibold">Vendedores Activos</p>
              <p className="text-3xl font-bold text-blue-600">
                {/* {new Set(filteredSales.flatMap(day => day.sales.map(sale => sale.seller))).size} 
                sdsdssd
              </p>
            </div>
            <div className="text-center">
              <FaChartBar className="text-5xl text-purple-500 mx-auto mb-2" />
              <p className="text-lg font-semibold">Días con Ventas</p>
              <p className="text-3xl font-bold text-purple-600">
                {/* {filteredSales?.length} 
                23
              </p>
            </div>
          </div>
        </div>*/}
        <Outlet/>
        {/* Gráfico de ventas */}
        {/* <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaChartBar className="mr-2 text-blue-500" /> Tendencia de Ventas
          </h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-end justify-around p-4">
            {[1, 2].map((day, index) => {
              const dayTotal = 123;

              // day.sales.reduce((sum, sale) => sum + sale.total, 0);
              const height = (123 / 1000) * 100; // Ajusta según tus datos
              return (
                <div key={index} className="w-1/12 relative group">
                  <div
                    style={{ height: `${height}%` }}
                    className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg group-hover:from-blue-600 group-hover:to-blue-400 transition-all"
                  ></div>
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 bg-blue-700 text-white px-2 py-1 rounded text-xs transition-opacity">
                    {/* ${dayTotal.toFixed(2)} 
                    ghgh
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-around mt-2 text-sm text-gray-600">
            {[1, 2, 3].map((day, index) => (
              <span key={index}>
                {/* {day.date.split('-').slice(-1)[0]} 
                dfdfdfdfdf
              </span>
            ))}
          </div>
        </div> */}
      </div> 
    </div>
  );
};



export default VentasAdmin;
