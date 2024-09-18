import React from 'react';

const Filters = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vendedor</label>
          <input
            type="text"
            name="seller"
            value={filters.seller}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha</label>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="product">Producto</option>
            <option value="service">Servicio</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
