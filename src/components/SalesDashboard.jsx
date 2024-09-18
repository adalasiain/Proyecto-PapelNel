import React, { useState } from 'react';

import Filters from './Filters';

const SalesCard = ({ venta }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 hover:shadow-2xl transition-shadow duration-300">
      <div className="px-6 py-4 bg-blue-100 border-b">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Venta</h2>
          <span className="text-sm text-gray-500">{venta.fecha}</span>
        </div>
        <div className="text-gray-700">
          <p className="mb-2">
            <span className="font-semibold">Vendedor:</span> {venta.vendedor}
          </p>
          <p className="mb-2 text-blue-700">
            <span className="font-semibold">Total Venta:</span> ${venta.totalVenta}
          </p>
        </div>
      </div>
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Detalles:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {venta.productos?.map((producto, index) => (
            <li key={index} className="mb-1 flex justify-between items-center">
              <span>{producto.nombre}</span>
              <span className="text-gray-500">${producto.precio} x {producto.cantidad}</span>
              <span className="text-blue-700 font-semibold">${producto.total}</span>
            </li>
          ))}
          {venta['detalles servicio']?.map((servicio, index) => (
            <li key={index} className="mb-1 flex justify-between items-center">
              <span>{servicio.nombre}</span>
              <span className="text-gray-500">${servicio.precio} x {servicio.cantidad}</span>
              <span className="text-blue-700 font-semibold">${servicio.total}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
  const ventasProductos = [
    {
      fecha: '2024-07-18',
      vendedor: 'Juan',
      productos: [
        { nombre: 'Cuaderno', precio: 10, cantidad: 2, total: 20 },
        { nombre: 'Lápiz', precio: 1, cantidad: 10, total: 10 },
      ],
      totalVenta: 30,
    },
    {
      fecha: '2024-07-17',
      vendedor: 'María',
      productos: [
        { nombre: 'Borrador', precio: 2, cantidad: 5, total: 10 },
        { nombre: 'Pluma', precio: 3, cantidad: 4, total: 12 },
      ],
      totalVenta: 22,
    },
    // Más ventas de productos...
  ];
  
  const ventasServicios = [
    {
      fecha: '2024-07-18',
      vendedor: 'Ana',
      'detalles servicio': [
        { nombre: 'Impresión', precio: 5, cantidad: 3, total: 15 },
        { nombre: 'Fotocopia', precio: 1, cantidad: 20, total: 20 },
      ],
      totalVenta: 35,
    },
    {
        fecha: '2024-07-18',
        vendedor: 'Ana',
        'detalles servicio': [
          { nombre: 'Impresión', precio: 5, cantidad: 3, total: 15 },
          { nombre: 'Fotocopia', precio: 1, cantidad: 20, total: 20 },
        ],
        totalVenta: 35,
      },
    
    {
      fecha: '2024-07-17',
      vendedor: 'Carlos',
      'detalles servicio': [
        { nombre: 'Escaneo', precio: 2, cantidad: 10, total: 20 },
        { nombre: 'Encuadernado', precio: 3, cantidad: 5, total: 15 },
      ],
      totalVenta: 35,
    },
    // Más ventas de servicios...
  ];
    

const SalesDashboard = () => {
    const [tipoVenta, setTipoVenta] = useState('productos');

    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard de Ventas</h1>
          <div>
            <button
              className={`px-4 py-2 mr-2 ${tipoVenta === 'productos' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setTipoVenta('productos')}
            >
              Productos
            </button>
            <button
              className={`px-4 py-2 ${tipoVenta === 'servicios' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setTipoVenta('servicios')}
            >
              Servicios
            </button>
          </div>
        </div>
        <SalesList ventas={tipoVenta === 'productos' ? ventasProductos : ventasServicios} tipo={tipoVenta} />
      </div>
    );
};
const SalesList = ({ ventas }) => {
    const [filtroVendedor, setFiltroVendedor] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');
  
    const agruparVentasPorFecha = (ventas) => {
      return ventas.reduce((acc, venta) => {
        const fecha = venta.fecha;
        if (!acc[fecha]) {
          acc[fecha] = { ventas: [], totalDia: 0 };
        }
        acc[fecha].ventas.push(venta);
        acc[fecha].totalDia += venta.totalVenta;
        return acc;
      }, {});
    };
  
    const ventasFiltradas = ventas.filter(venta => 
      (filtroVendedor ? venta.vendedor.includes(filtroVendedor) : true) &&
      (filtroFecha ? venta.fecha.includes(filtroFecha) : true)
    );
  
    const ventasAgrupadas = agruparVentasPorFecha(ventasFiltradas);
  
    return (
      <div>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Filtrar por vendedor"
            className="border rounded px-4 py-2"
            value={filtroVendedor}
            onChange={(e) => setFiltroVendedor(e.target.value)}
          />
          <input
            type="date"
            className="border rounded px-4 py-2"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />
        </div>
        {Object.keys(ventasAgrupadas).map((fecha) => (
          <div key={fecha} className="mb-8">
            <div className="bg-gray-200 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-bold text-gray-800">Fecha: {fecha}</h2>
              <p className="text-gray-700">Total Vendido: ${ventasAgrupadas[fecha].totalDia}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ventasAgrupadas[fecha].ventas.map((venta, index) => (
                <SalesCard key={index} venta={venta} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

export default SalesDashboard;
