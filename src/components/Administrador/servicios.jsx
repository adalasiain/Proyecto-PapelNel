import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../calendario.css';
import { FaMobileAlt, FaCopy, FaPrint, FaSearch, FaIdCard, FaMoneyBillWave, FaUserFriends, FaCalendarAlt } from "react-icons/fa";
import Service from "../../Services/ServiciosService";

const Dashboard = ({ todaySales, customerCount }) => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white px-4 py-3 rounded-lg flex items-center">
          <div className="text-3xl mr-4"><FaMoneyBillWave className="text-green-500" /></div>
          <div>
            <h3 className="text-lg font-semibold">Ventas de Hoy</h3>
            <p className="text-2xl font-bold">$ {todaySales.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white px-4 py-3 rounded-lg flex items-center">
          <div className="text-3xl mr-4"><FaUserFriends className="text-purple-500" /></div>
          <div>
            <h3 className="text-lg font-semibold">Clientes Atendidos</h3>
            <p className="text-2xl font-bold">{customerCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceItem = ({ service }) => {
  const getServiceIcon = (serviceName) => {
    switch (serviceName) {
      case 'Recargas':
        return <FaMobileAlt className="text-green-500" />;
      case 'Copias':
        return <FaCopy className="text-blue-500" />;
      case 'Impresiones':
        return <FaPrint className="text-red-500" />;
      case 'Investigaciones':
        return <FaSearch className="text-purple-500" />;
      case 'Impresión de CURP':
        return <FaIdCard className="text-yellow-500" />;
      default:
        return <FaMobileAlt />;
    }
  };

  return (
    <li className="flex justify-between items-center mb-2 p-2 rounded-lg bg-white">
      <div className="flex items-center">
        {getServiceIcon(service.nombre)}
        <span className="ml-2 font-medium">{service.nombre}</span>
        {service.tipo === 'Color' && <span className="ml-2 text-indigo-500">(Color)</span>}
      </div>
      <span>${service.total}</span>
    </li>
  );
};

const SaleCard = ({ sale }) => {
  const total = sale?.total_venta;

  return (
    <div className="bg-cyan-200 border-4 border-yellow-200 rounded-xl p-4 max-w-sm mx-auto m-4 w-80 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105">
      <div className="flex items-center mb-4">
        <FaCalendarAlt className="text-lg mr-2" />
        <span className="text-lg font-semibold">{new Date(sale.fecha).toLocaleString()}</span>
      </div>
      <div className="bg-white flex justify-between items-center rounded-lg p-4 shadow-md mb-2">
        <ul className="mb-4">
          {sale.detallesServicio?.map((service, index) => (
            <ServiceItem key={index} service={service} />
          ))}
        </ul>
      </div>
      <hr className="border-blue-300 mb-4" />
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">Total</span>
        <span className="text-2xl font-bold">${total}</span>
      </div>
      <div className="flex justify-end mt-4">
        <div className="bg-white p-2 rounded-full ml-2"></div>
        <div className="bg-white p-2 rounded-full ml-2"></div>
        <div className="bg-white p-2 rounded-full ml-2"></div>
      </div>
    </div>
  );
}

// agrupar ventas por fecha
const groupByDate = (sales) => {
  return sales.reduce((acc, sale) => {
    const date = new Date(sale.fecha).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(sale);
    return acc;
  }, {});
};

//mostrar dashboard de ventas
const SalesDashboard = ({ sales, selectedDate }) => {
  const groupedSales = groupByDate(sales);
  const salesForSelectedDate = groupedSales[selectedDate] || [];

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Ventas de Servicios</h1>
      {salesForSelectedDate.length === 0 ? (
        <p>No hay ventas para la fecha seleccionada.</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {salesForSelectedDate.reverse().map((sale, index) => (
            <SaleCard key={index} sale={sale} className="m-4" />
          ))}
        </div>
      )}
    </div>
  );
};

const ServiciosAdmin = () => {
  const [salesData, setSalesData] = useState({
    todaySales: 0,
    customerCount: 0,
  });

  const [salesHistory, setSalesHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datesWithSales, setDatesWithSales] = useState([]); 

  const getAllSalesServices = async () => {
    const Servicio = new Service();
    try {
      const response = await Servicio.getAllServiceSale();
      setSalesHistory(response);
      updateSalesData(response);
      extractDatesWithSales(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllSalesServices();
  }, []);

  const updateSalesData = (sales) => {
    const today = new Date().toLocaleDateString();
    const todaySales = sales
      .filter((sale) => new Date(sale?.fecha).toLocaleDateString() === today)
      .reduce((sum, sale) => sum + sale?.total_venta, 0);

    const todayCustomers = sales
      .filter((sale) => new Date(sale?.fecha).toLocaleDateString() === today).length;

    setSalesData({
      todaySales,
      customerCount: todayCustomers,
    });
  };

  const extractDatesWithSales = (sales) => {
    const dates = sales.map(sale => new Date(sale.fecha).toLocaleDateString());
    setDatesWithSales([...new Set(dates)]);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formattedSelectedDate = new Date(selectedDate).toLocaleDateString();

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && datesWithSales.includes(new Date(date).toLocaleDateString())) {
      return 'bg-blue-500 text-white rounded-full';
    }
    return '';
  };

  return (
    <div className="h-auto bg-white overflow-hidden">
      <div className="w-full p-4">
        <Dashboard {...salesData} />
        <br/>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Calendario de Ventas</h1>
          <div className="inline-block p-4 bg-white rounded-lg shadow-md">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName={tileClassName}
              minDate={new Date('2000-01-01')}
              maxDate={new Date()}
              className="react-calendar"
            />
          </div>
        </div>
        <SalesDashboard sales={salesHistory} selectedDate={formattedSelectedDate} />
      </div>
    </div>
  );
};

export default ServiciosAdmin;


