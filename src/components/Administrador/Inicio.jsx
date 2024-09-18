import React from "react";
import {
  FaShoppingCart,
  FaBoxOpen,
  FaExclamationTriangle,
  FaCut,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useProductsContext } from "../../context/productsContext";

const data = {
  weekly: [
    { day: "Lun", ventas: 50, servicios: 30, gastos: 20 },
    { day: "Mar", ventas: 70, servicios: 50, gastos: 40 },
    { day: "Mié", ventas: 80, servicios: 60, gastos: 50 },
    { day: "Jue", ventas: 90, servicios: 70, gastos: 60 },
    { day: "Vie", ventas: 100, servicios: 80, gastos: 70 },
    { day: "Sáb", ventas: 60, servicios: 40, gastos: 30 },
    { day: "Dom", ventas: 70, servicios: 50, gastos: 40 },
  ],
};

const Bar = ({ height, color }) => (
  <div
    className={`${color} w-full h-${height} transition-all duration-300`}
  ></div>
);

const KpiCard = ({ title, value, trend, icon, bgColor }) => (
  <div className={`p-4 rounded-lg shadow-lg ${bgColor}`}>
    <div className="flex items-center justify-between">
      <div className="text-white text-xl font-bold">{title}</div>
      <div className="text-white text-3xl">{icon}</div>
    </div>
    <div className="text-white text-5xl font-extrabold mt-4">{value}</div>
    <div
      className={`text-white text-lg mt-2 ${
        trend > 0 ? "text-green-500" : "text-red-500"
      }`}
    >
      {trend > 0 ? `↑ ${trend}%` : `↓ ${Math.abs(trend)}%`}
    </div>
  </div>
);

const Dashboard = () => {
  const { products, getProducts, isLoading } = useProductsContext();
  return (
    <div className="min-h-screen bg-white">
        <div className="z-10 mb-5 flex justify-between  border-b-2 flex-col lg:flex-row gap-2 sticky top-0 bg-white px-2 py-4 ">
        <div className="flex items-center gap-2 justify-between md:justify-normal">
          <h1 className="text-4xl font-bold text-center">Dashboard</h1>
        </div>
       
        
      </div>
      <div className=" mx-auto flex flex-col space-y-5 px-8">
     

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Total de Productos */}
          <div className="bg-purple-500 rounded-2xl shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Total Productos</h2>
              <FaBoxOpen className="text-4xl text-white opacity-70" />
            </div>
            <p className="text-5xl font-black text-white">{products?.length}</p>
            <p className="text-sm text-white mt-2 opacity-70">
              Productos en inventario
            </p>
          </div>

          {/* Productos con Stock Bajo */}
          <div className="bg-yellow-400 rounded-2xl shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Stock Bajo</h2>
              <FaExclamationTriangle className="text-4xl text-white opacity-70" />
            </div>
            <p className="text-5xl font-black text-white">
              {products?.filter((item) => item.stock <= item.stock_bajo).length}
            </p>
            <p className="text-sm text-white mt-2 opacity-70">
              Productos por reabastecer
            </p>
          </div>

          {/* Ventas de Hoy */}
          <div className="bg-green-500 rounded-2xl shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Ventas de Hoy</h2>
              <FaShoppingCart className="text-4xl text-white opacity-70" />
            </div>
            <p className="text-5xl font-black text-white">$3,750</p>
            <p className="text-sm text-white mt-2 opacity-70">↑ 15% vs. ayer</p>
          </div>

          {/* Ventas de Servicios de Hoy */}
          <div className="bg-blue-500 rounded-2xl shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">
                Servicios de Hoy
              </h2>
              <FaCut className="text-4xl text-white opacity-70" />
            </div>
            <p className="text-5xl font-black text-white">$1,200</p>
            <p className="text-sm text-white mt-2 opacity-70">↑ 8% vs. ayer</p>
          </div>

          {/* Gastos de Hoy */}
          <div className="bg-red-500 rounded-2xl shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Gastos de Hoy</h2>
              <FaMoneyBillWave className="text-4xl text-white opacity-70" />
            </div>
            <p className="text-5xl font-black text-white">$850</p>
            <p className="text-sm text-white mt-2 opacity-70">↓ 5% vs. ayer</p>
          </div>
        </div>
        {/* Gráfico de Barras Semanal */}
        <div className=" bg-gray-100  rounded-2xl shadow-xl p-6 h-auto transform transition duration-500 hover:scale-105 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Resumen Semanal
          </h2>
          <div className="flex justify-between items-end space-x-2 flex-grow">
            {data.weekly.map((day, index) => (
              <div key={index} className="flex-grow flex flex-col-reverse">
                <Bar height={day.ventas / 10} color="bg-green-500" />
                <Bar height={day.servicios / 10} color="bg-blue-500" />
                <Bar height={day.gastos / 10} color="bg-red-500" />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            {data.weekly.map((day) => (
              <span key={day.day}>{day.day}</span>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Ventas</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Servicios</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Gastos</span>
            </div>
          </div>
                  </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-100 shadow-xl rounded-lg border  p-6 transform transition duration-500 hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">
              Productos Más Vendidos
            </h3>
            <div className="space-y-4">
              <ProductBar name="Producto A" sales={145} color="bg-blue-500" />
              <ProductBar name="Producto B" sales={132} color="bg-green-500" />
              <ProductBar name="Producto C" sales={117} color="bg-yellow-500" />
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg shadow-lg border p-6 transform transition duration-500 hover:scale-105 ">
            <h3 className="text-xl font-semibold mb-4">
              Servicios Más Populares
            </h3>
            <div className="space-y-4">
              <ProductBar name="Servicio X" sales={98} color="bg-purple-500" />
              <ProductBar name="Servicio Y" sales={87} color="bg-pink-500" />
              <ProductBar name="Servicio Z" sales={76} color="bg-indigo-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductBar = ({ name, sales, color }) => (
  <div className="bg-gray-100 rounded-lg p-4">
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold">{name}</span>
      <span className={`${color} text-white rounded-full px-2 py-1 text-xs`}>
        {sales} vendidos
      </span>
    </div>
    <div className="bg-gray-200 rounded-full h-2">
      <div
        className={`${color} rounded-full h-2`}
        style={{ width: `${(sales / 145) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default Dashboard;

// import React from 'react';
// import {
//   FaShoppingCart, FaBoxOpen, FaExclamationTriangle,
//   FaCut, FaMoneyBillWave, FaChartLine, FaPercentage
// } from 'react-icons/fa';

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-indigo-600 mb-8">Dashboard</h1>

//         {/* Métricas clave */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//           <MetricCard title="Total Productos" value="1,253" icon={<FaBoxOpen />} color="bg-purple-500" />
//           <MetricCard title="Stock Bajo" value="23" icon={<FaExclamationTriangle />} color="bg-yellow-400" />
//           <MetricCard title="Ventas de Hoy" value="$3,750" icon={<FaShoppingCart />} color="bg-green-500" />
//           <MetricCard title="Servicios de Hoy" value="$1,200" icon={<FaCut />} color="bg-blue-500" />
//           <MetricCard title="Gastos de Hoy" value="$850" icon={<FaMoneyBillWave />} color="bg-red-500" />
//           <MetricCard title="Beneficio Neto" value="$4,100" icon={<FaChartLine />} color="bg-indigo-500" />
//           <MetricCard title="Margen de Beneficio" value="45%" icon={<FaPercentage />} color="bg-pink-500" />
//           <MetricCard title="Clientes Nuevos" value="12" icon={<FaShoppingCart />} color="bg-teal-500" />
//         </div>

//         {/* Gráfico de ventas y gastos */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//           <h3 className="text-xl font-semibold mb-4">Resumen Semanal: Ventas, Servicios y Gastos</h3>
//           <div className="h-64 flex items-end space-x-2">
//             {[
//               { ventas: 40, servicios: 30, gastos: 20 },
//               { ventas: 60, servicios: 40, gastos: 25 },
//               { ventas: 80, servicios: 50, gastos: 30 },
//               { ventas: 100, servicios: 70, gastos: 40 },
//               { ventas: 70, servicios: 60, gastos: 35 },
//               { ventas: 90, servicios: 80, gastos: 45 },
//               { ventas: 50, servicios: 40, gastos: 30 }
//             ].map((day, index) => (
//               <div key={index} className="flex-grow flex flex-col-reverse">
//                 <div className="bg-green-500 rounded-t-lg" style={{height: `${day.ventas}%`}}></div>
//                 <div className="bg-blue-500" style={{height: `${day.servicios}%`}}></div>
//                 <div className="bg-red-500 rounded-b-lg" style={{height: `${day.gastos}%`}}></div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between mt-2 text-sm text-gray-600">
//             <span>Lun</span>
//             <span>Mar</span>
//             <span>Mié</span>
//             <span>Jue</span>
//             <span>Vie</span>
//             <span>Sáb</span>
//             <span>Dom</span>
//           </div>
//           <div className="flex justify-center space-x-4 mt-4">
//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//               <span>Ventas</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
//               <span>Servicios</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
//               <span>Gastos</span>
//             </div>
//           </div>
//         </div>

//         {/* Productos más vendidos y Servicios más populares */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-xl font-semibold mb-4">Productos Más Vendidos</h3>
//             <div className="space-y-4">
//               <ProductBar name="Producto A" sales={145} color="bg-blue-500" />
//               <ProductBar name="Producto B" sales={132} color="bg-green-500" />
//               <ProductBar name="Producto C" sales={117} color="bg-yellow-500" />
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-xl font-semibold mb-4">Servicios Más Populares</h3>
//             <div className="space-y-4">
//               <ProductBar name="Servicio X" sales={98} color="bg-purple-500" />
//               <ProductBar name="Servicio Y" sales={87} color="bg-pink-500" />
//               <ProductBar name="Servicio Z" sales={76} color="bg-indigo-500" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MetricCard = ({ title, value, icon, color }) => (
//   <div className={`${color} rounded-lg shadow-lg p-6 text-white`}>
//     <div className="flex justify-between items-center mb-4">
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <div className="text-3xl opacity-80">{icon}</div>
//     </div>
//     <p className="text-3xl font-bold">{value}</p>
//   </div>
// );

// export default Dashboard;
