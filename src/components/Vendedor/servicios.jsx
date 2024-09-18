import { CiSearch } from "react-icons/ci";

import { AiFillPrinter } from "react-icons/ai";
import { FaComputer } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import {
  FaMobile,
  FaCopy,
  FaPrint,
  FaSearch,
  FaIdCard,
  FaCertificate,
  FaVoteYea,
  FaIdBadge,
  FaFileInvoice,
  FaKeyboard,
  FaMobileAlt,
  FaMoneyBillWave,
  FaUserFriends,
} from "react-icons/fa";
import SweetAlert from "./alertTailwind";
import Service from "../../Services/ServiciosService";
import { Link } from "react-router-dom";
import { DeleteRounded } from "@mui/icons-material";

const Dashboard = ({ todaySales, customerCount }) => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg shadow-lg ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <ServiceCard
          icon={<FaChartBar className="text-blue-500" />}
          title="Ventas Totales"
          value={`$${totalSales.toFixed(2)}`}
        /> */}
        <div className="bg-white px-4 py-3 rounded-lg flex items-center">
          <div className="text-3xl mr-4">
            <FaMoneyBillWave className="text-green-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Ventas de Hoy</h3>
            <p className="text-2xl font-bold">$ {todaySales.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white px-4 py-3 rounded-lg flex items-center">
          <div className="text-3xl mr-4">
            <FaUserFriends className="text-purple-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Clientes Atendidos</h3>
            <p className="text-2xl font-bold">{customerCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DynamicServiceForm = ({ service, onSubmit, close }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let total = 0;
    let precio_unitario = 0;
    if (service?.name === "Recargas") {
      total = parseFloat(formData.cantidadRecarga || 0);
      onSubmit({ ...formData, total, precio_unitario, nombre: service.name });
    } else if (service?.name === "Investigaciones") {
      const selectedType = service.fields
        .find((field) => field.name === "tipo")
        ?.options.find((option) => option.value === formData.tipo);

      const precio_investigacion = service.fields.find(
        (field) => field.name === "precio"
      )?.value;

      total =
        (selectedType?.price || 0) * (parseInt(formData.cantidad) || 0) +
        (parseInt(precio_investigacion) || 0);
      precio_unitario = selectedType?.price;

      onSubmit({
        ...formData,
        total,
        precio_unitario,
        precio_investigacion,
        nombre: service.name,
      });
    }else if(service?.name === "Captura de texto"){
      const precio_hoja = service.fields.find(
        (field) => field.name === "precio"
      )?.value;

      total = (parseInt(formData.cantidad) || 0) *
      (parseInt(precio_hoja) || 0);
    precio_unitario = parseInt(precio_hoja);

    onSubmit({...formData,  precio_unitario, total, nombre: service.name, })

    }

     else {
      const selectedType = service.fields
        .find((field) => field.name === "tipo")
        ?.options.find((option) => option.value === formData.tipo);

      total = (selectedType?.price || 0) * (parseInt(formData.cantidad) || 0);
      precio_unitario = selectedType?.price;

      onSubmit({ ...formData, total, precio_unitario, nombre: service.name });
    }

    close();
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="text-2xl font-bold mb-4">{service?.name}</h2>
      {service?.fields?.map((field) => (
        <div key={field?.name} className="mb-4">
          <label
            htmlFor={field?.name}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {field?.label}
          </label>
          {(() => {
            switch (field?.type) {
              case "disabled":
                return (
                  <div className=" font-semibold text-xl">$ {field.value}</div>
                );

              case "select":
                return (
                  <select
                    id={field?.name}
                    name={field?.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} - ${option.price}
                      </option>
                    ))}
                  </select>
                );
              case "tel":
                return (
                  <>
                    <input
                      type="tel"
                      id={field.name}
                      name={field.name}
                      minLength={10}
                      maxLength={10}
                      onChange={handleChange}
                      onChangeCapture={(e) => {
                        e.stopPropagation();
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        if (numericValue !== e.target.value) {
                          e.target.value = numericValue;
                        }
                      }}
                      placeholder="Ingrese el número de teléfono"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      aria-required
                    />
                    <p>
                      {field.value?.length
                        ? "el numero debe ser de 10 digitos"
                        : ""}
                    </p>
                  </>
                );
              default:
                return (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    min={1}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                );
            }
          })()}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Agregar
      </button>
    </form>
  );
};

const Servicio = () => {
  const [services, setServices] = useState([
    {
      name: "Recargas",
      icon: <FaMobile />,
      color: "bg-blue-500",
      fields: [
        { name: "numero", label: "Número de teléfono", type: "tel" },
        {
          name: "cantidadRecarga",
          label: "Cantidad de Recarga",
          type: "select",
          options: [10, 20, 30, 50, 80, 100, 150, 200, 300, 500].map(
            (amount) => ({
              value: amount,
              label: `Recarga de ${amount}`,
              price: amount,
            })
          ),
        },
      ],
    },
    {
      name: "Copias",
      icon: <FaCopy />,
      color: "bg-green-500",
      fields: [
        {
          name: "tipo",
          label: "Tipo",
          type: "select",
          options: [
            { value: "Blanco y Negro", label: "Blanco y Negro", price: 1 },
            { value: "Color", label: "Color", price: 5 },
          ],
        },
        { name: "cantidad", label: "Cantidad", type: "number" },
      ],
    },
    {
      name: "Impresiones",
      icon: <FaPrint />,
      color: "bg-yellow-500",
      fields: [
        {
          name: "tipo",
          label: "Tipo",
          type: "select",
          options: [
            { value: "Blanco y Negro", label: "Blanco y Negro", price: 2 },
            { value: "Color", label: "Color", price: 8 },
          ],
        },
        { name: "cantidad", label: "Cantidad", type: "number" },
      ],
    },
    {
      name: "Investigaciones",
      icon: <FaSearch />,
      color: "bg-purple-500",
      fields: [
        {
          name: "precio",
          label: "Precio por la investigacion",
          type: "disabled",
          value: 5,
        },
        {
          name: "tipo",
          label: "Tipo",
          type: "select",
          options: [
            { value: "Blanco y Negro", label: "Blanco y Negro", price: 1 },
            { value: "Color", label: "Color", price: 5 },
          ],
        },
        { name: "cantidad", label: "Cantidad", type: "number" },
      ],
    },
    {
      name: "Credencial de Elector",
      icon: <FaIdBadge />,
      color: "bg-cyan-600",
      fields: [
        {
          name: "tipo",
          label: "Tipo",
          type: "select",
          options: [
            { value: "Blanco y Negro", label: "Blanco y Negro", price: 2 },
            { value: "Color", label: "Color", price: 3 },
          ],
        },
        { name: "cantidad", label: "Cantidad", type: "number" },
      ],
    },
    {
      name: "CURP",
      icon: <FaIdCard />,
      color: "bg-red-400",
      fields: [
        {
          name: "tipo",
          label: "Tipo",
          type: "select",
          options: [
            { value: "Blanco y Negro", label: "Blanco y Negro", price: 1 },
            { value: "Color", label: "Color", price: 5 },
          ],
        },
        { name: "cantidad", label: "Cantidad", type: "number" },
      ],
    },
    {
      name: "Acta de Nacimiento",
      icon: <FaVoteYea />,
      color: "bg-red-500",
      fields: [
        {
          name: "tipo",
          label: "Tipo",
          type: "select",
          options: [
            { value: "Blanco y Negro", label: "Blanco y Negro", price: 3 },
            { value: "Color", label: "Color", price: 4 },
          ],
        },
        { name: "cantidad", label: "Cantidad", type: "number" },
      ],
    },

    {
      name: "Comprobante de luz",
      icon: <FaFileInvoice/>,
      color: "bg-cyan-500",
      fields: [
        {
          name: "tipo",
          label: "Tipo",
          type: "select",
          options: [
            { value: "Blanco y Negro", label: "Blanco y Negro", price: 1 },
            { value: "Color", label: "Color", price: 5 },
          ],
        },
        { name: "cantidad", label: "Cantidad", type: "number" },
      ],
    },
    {
      name: "Captura de texto",
      icon: <FaKeyboard/>,
      color: "bg-amber-300",
      fields: [
        {
          name: "precio",
          label: "Precio por unidad",
          type: "disabled",
          value: 16,
        },
        { name: "cantidad", label: "Cantidad", type: "number" },
      ],
    },
  ]);

  // datos VentaServicios
  const [dataVentaServicios, setDataVentaServicios] = useState({
    total_venta: 0,
    detallesServicio: [],
  });

  const [salesData, setSalesData] = useState({
    totalSales: 0,
    todaySales: 0,
    customerCount: 0,
  });
  const [salesHistory, setSalesHistory] = useState([]);
  const getAllSalesServices = async () => {
    const Servicio = new Service();
    try {
      const response = await Servicio.getAllServiceSale();
      setSalesHistory(response);
      updateSalesData(response);
    } catch (error) {}
  };

  useEffect(() => {
    getAllSalesServices();
  }, []);

  const updateSalesData = (sales) => {
    const today = new Date().toLocaleDateString();
    const todaySales = sales.filter(
      (sale) => new Date(sale?.fecha).toLocaleDateString() === today
    );
    const totalTodaySales = todaySales.reduce(
      (sum, sale) => sum + sale?.total_venta,
      0
    );
    const todayCustomers = todaySales?.length;
    setSalesData({
      todaySales: totalTodaySales,
      customerCount: todayCustomers,
    });
  };

  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    content: "",
  });

  const closeAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const addSaleInCart = (saleData) => {
    setDataVentaServicios((prevVenta) => {
      return {
        total_venta: prevVenta.total_venta + saleData?.total,
        detallesServicio: [...prevVenta.detallesServicio, saleData],
      };
    });
  };

  const removeFromCart = (index) => {
    setDataVentaServicios((prevVenta) => {
      return {
        total_venta:
          prevVenta.total_venta - prevVenta.detallesServicio[index].total,
        detallesServicio: prevVenta.detallesServicio.filter(
          (_, i) => i !== index
        ),
      };
    });
  };

  const handleRegisterSale = async () => {
    const Servicio = new Service();
    if (dataVentaServicios.detallesServicio?.length) {
      await Servicio.addServiceSale(dataVentaServicios);
      getAllSalesServices();
      setDataVentaServicios({
        total_venta: 0,
        detallesServicio: [],
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden w-full">
      <div className="flex-grow  overflow-auto mb-20  ">
        <div className=" w-full py-4 px-2 shadow-lg sticky top-0 bg-white z-10 flex gap-2">
          <div className="flex items-center justify-between ">
            <nav>
              <ul className="flex items-center gap-x-1 p-1 rounded-full bg-white border-color_base border-2">
                <li className="flex items-center gap-x-2 font-bold  py-2 px-6 rounded-full hover:bg-color_base">
                  <Link to={"/vendedor/ventas"} className="flex">
                    <AiFillPrinter className="text-xl mr-1 " />
                    Productos
                  </Link>
                </li>

                <li className="flex items-center gap-x-2 font-bold  py-2 px-6 rounded-full hover:bg-color_base">
                  <Link to={"/vendedor/servicios"} className="flex">
                    <FaComputer className="text-2xl mr-1" />
                    Servicios
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-4  p-8 flex-grow overflow-auto items-center ">
          {services.map((service) => (
            <button
              key={service.name}
              className={`${service.color}  text-white p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-${service.color} flex flex-col justify-center items-center`}
              onClick={() => {
                setAlertConfig((prev) => ({
                  ...prev,
                  isOpen: true,
                  content: (
                    <DynamicServiceForm
                      service={service}
                      onSubmit={addSaleInCart}
                      close={closeAlert}
                    />
                  ),
                }));
              }}
            >
              <div className="text-5xl mb-4">{service?.icon}</div>
              <div className="text-xl font-semibold">{service?.name}</div>
            </button>
          ))}
        </div>
        {/* carrito */}
      </div>
      <div className="w-auto">
        <div className="w-72 bg-gray-100 bg-opacity-95  p-3 sticky top-24 self-center h-full">
          <h2 className="text-lg font-bold mb-4  text-indigo-800">
            Carrito de Venta de Servicios
          </h2>

          <div className="  h-3/5  overflow-y-auto bg-white mb-4 p-2 space-y-3 shadow-inner ">
            {dataVentaServicios?.detallesServicio?.map((servicio, index) => (
              <div
                key={index}
                className=" px-4 py-2 flex flex-col items-center justify-between border-b-2 border-blue-300 last:border-0"
              >
                <div className="flex  items-center justify-start w-full">
                  <div
                    className={`bg-blue-500 p-2 text-gray-100 text-xl rounded-full mr-4`}
                  >
                    {
                      services.find(
                        (service) => service.name === servicio.nombre
                      )?.icon
                    }
                  </div>
                  <h3 className="font-bold">{servicio.nombre}</h3>
                </div>
                <div className="flex justify-between w-full">
                  {(() => {
                    switch (servicio?.nombre) {
                      case "Recargas":
                        return (
                          <div>
                            <p className="text-sm text-gray-600">
                              Recarga de: ${servicio?.cantidadRecarga}
                            </p>
                            <p className="text-xs text-gray-600">
                              Número: {servicio?.numero}
                            </p>
                          </div>
                        );
                      case "Investigaciones":
                        return (
                          <div>
                            <p className="text-sm text-gray-600">
                              Tipo: {servicio?.tipo}
                            </p>
                            <p className="text-sm text-gray-600">
                              precio: {servicio?.precio_investigacion}
                            </p>
                            <div className="text-sm text-gray-600 flex font-semibold space-x-4">
                              <p>{servicio?.cantidad}</p>

                              <p>X</p>
                              <p className="text-green-500 ">
                                ${servicio?.precio_unitario} c/u
                              </p>
                            </div>
                          </div>
                        );
                        default:
                          return  <div>
                          <p className="text-sm text-gray-600">
                            Tipo: {servicio?.tipo}
                          </p>
                          <div className="text-sm text-gray-600 flex font-semibold space-x-4">
                            <p>{servicio?.cantidad}</p>
    
                            <p>X</p>
                            <p className="text-green-500 ">
                              ${servicio?.precio_unitario} c/u
                            </p>
                          </div>
                        </div>
                    }
                  })()}

                 
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">
                      Total: ${servicio?.total.toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-xs text-red-500 hover:text-red-700 mt-1"
                    >
                      <DeleteRounded />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" text-xl font-bold text-indigo-800">
            Total: ${dataVentaServicios?.total_venta.toFixed(2)}
          </div>
          <button
            className="mt-2 w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 rounded-xl hover:from-green-600 hover:to-blue-700 transition duration-300 font-bold text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            onClick={handleRegisterSale}
            disabled={dataVentaServicios?.length === 0}
          >
            Finalizar Venta
          </button>
        </div>
      </div>

      <SweetAlert
        isOpen={alertConfig.isOpen}
        onClose={closeAlert}
        content={alertConfig.content}
      />
    </div>
  );
};

const getServiceIcon = (serviceName) => {
  switch (serviceName) {
    case "Recarga de celular":
      return <FaMobileAlt className="text-green-500" />;
    case "Copias":
      return <FaCopy className="text-blue-500" />;
    case "Impresiones":
      return <FaPrint className="text-red-500" />;
    case "Investigaciones":
      return <FaSearch className="text-purple-500" />;
    case "Impresión de CURP":
      return <FaIdCard className="text-yellow-500" />;
    default:
      return <FaMobileAlt />;
  }
};

export default Servicio;
