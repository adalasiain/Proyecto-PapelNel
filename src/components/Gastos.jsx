import React, { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaMoneyBillWave,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import Expense from "../Services/ExpensesService";

function RegistroGastos() {
  const [motivo, setMotivo] = useState("");
  const [cantidad, setCantidad] = useState("");

  const Expenses = new Expense();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoGasto = {
      motivo,
      cantidad,
    };

    await Expenses.addExpense(nuevoGasto);

    setMotivo("");
    setCantidad("");
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Registrar Gasto
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="motivo"
              className="block text-sm font-medium text-gray-700"
            >
              Motivo
            </label>
            <input
              type="text"
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="cantidad"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad
            </label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

function MostrarGastos({ gastos }) {
  const gastosPorDia = gastos.reduce((acc, gasto) => {
    if (!acc[new Date(gasto.fecha).toLocaleDateString()]) {
      acc[new Date(gasto.fecha).toLocaleDateString()] = [];
    }
    acc[new Date(gasto.fecha).toLocaleDateString()].push(gasto);
    return acc;
  }, {});

  const calcularTotalDia = (gastos) => {
    return gastos
      .reduce((total, gasto) => total + gasto.cantidad, 0)
      .toFixed(2);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Gastos Registrados
      </h2>
      {Object.keys(gastosPorDia).map((fecha) => (
        <div key={fecha} className="mb-8">
          
          <div className="p-4 flex justify-between bg-gray-200 rounded shadow-inner mb-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Fecha de corte: {fecha}</h3>
            <p className="text-lg font-semibold text-gray-800">
              Total del Día: ${calcularTotalDia(gastosPorDia[fecha])}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gastosPorDia[fecha].map((gasto, index) => (
              <div
                key={index}
                className="  rounded-lg shadow-red-300 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="bg-red-100 rounded-t-lg  px-4 py-2">
                  <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-2" />
                    <p className="text-lg text-gray-700">
                      Vendedor: {gasto.vendedor?.nombre}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-red-500 mr-2" />
                    <p className="text-sm text-gray-700">
                      Fecha: {new Date(gasto.fecha).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <p className="text-lg font-medium text-gray-900">
                      Motivo: {gasto.motivo}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign className="text-yellow-500 mr-2" />
                    <p className="text-sm text-gray-700">
                      Cantidad: ${gasto.cantidad.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const Gastos = () => {
  const Expenses = new Expense();
  const [gastos, setGastos] = useState([]);

  async function getExpenses() {
    const expenses = await Expenses.getAllExpences();
    setGastos(expenses?.reverse());
  }

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
     <div className="z-10 mb-5 flex justify-between  border-b-2 flex-col lg:flex-row gap-2 sticky top-0 bg-white px-2 py-4 ">
        <div className="flex items-center gap-2 justify-between md:justify-normal">
          <h1 className="text-4xl font-bold text-center">Gastos </h1>
        </div>
      </div>

      <RegistroGastos />
      <MostrarGastos gastos={gastos} />
    </div>
  );
};
export default Gastos;
