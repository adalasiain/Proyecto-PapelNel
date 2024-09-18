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
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import htmlToPdfMake from 'html-to-pdfmake';
import { saveAs } from 'file-saver';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { img1 } from "../../../public/img";
// Configurar las fuentes de pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const VentasProductos = () => {
  const salesService = new Sales();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedVenta, setExpandedVenta] = useState(null);

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

  const toggleVenta = (index) => {
    setExpandedVenta(expandedVenta === index ? null : index);
  };
  const generatePDF = async (ventasDelDia, fecha,total) => {
    // Asegúrate de que ventasDelDia.ventas sea un arreglo
    if (!ventasDelDia || !Array.isArray(ventasDelDia.ventas)) {
      console.error('ventasDelDia.ventas debe ser un arreglo');
      return;
    }
    console.log(ventasDelDia);
    const htmlContent = `
      <div>
        <div style="text-align: center; margin-bottom: 20px;">
        <img src="${img1}" style="width: 200px; height: auto; margin-top: 10px;" />
          <h3 style="margin: 0; color: rgb(0, 0, 0);">Reporte de ventas</h3>
        </div>
        <h2 style="text-align: start; color: rgb(61, 61, 191); margin: 0;">Ventas del día: ${fecha}</h2>
        <h4 style="text-align: start; color: rgb(255, 0, 0); margin: 0;">Total: $ ${total.toFixed(2)}</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; "text-align: center;">Vendedor</th>
              <th style="border: 1px solid #ddd; padding: 8px; "text-align: center;">Subtotal</th>
              <th style="border: 1px solid #ddd; padding: 8px; "text-align: center;">Descuento</th>
              <th style="border: 1px solid #ddd; padding: 8px; "text-align: center;">Total</th>
              <th style="border: 1px solid #ddd; padding: 8px; "text-align: center;">Productos</th>
            </tr>
          </thead>
          <tbody>
            ${ventasDelDia.ventas.map(venta => `
              <tr>

                <td style="border: 1px solid #ddd; padding: 8px; color: rgb(51, 255, 113);">${venta.vendedor.nombre} </td>
                <td style="border: 1px solid #ddd; padding: 8px;">$${venta.subtotal}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${venta.descuento}%</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$${venta.total}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">
                  <ul style="margin: 0; padding: 0; list-style-type: none;">
                    ${venta.productos.map(producto => `
                        <p style="margin: 0;">Nombre: ${producto.producto?.nombre}</p>
                        <p style="margin: 0;">Descripción: ${producto.producto?.descripcion}</p>
                        <p style="margin: 0;">Cantidad: ${producto.cantidad}</p>
                        <p style="margin: 0;">Precio Unitario: $${producto.precio_unitario?.toFixed(2)}</p>
                        <p style="margin: 0; color: rgb(255, 0, 0)">Total: $${producto.precio_total?.toFixed(2)}</p>
                        <br>
                    `).join('')}
                  </ul>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  
    // Convierte el HTML a estructura PDFMake
    const pdfMakeContent = htmlToPdfMake(htmlContent);
    const docDefinition = {
      content: pdfMakeContent
    };
  
    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      saveAs(blob, `Reporte_de_venta_${fecha}.pdf`);
    });
  };
  
  return (
    <div className="w-full flex-auto ">
      
      <div className="px-4">
        <h1 className="text-3xl font-bold mb-5 ">Ventas de Productos</h1>
        <div className="flex gap-3 flex-col space-y-6">
          {salesByDate.map((ventas, index) => (
            <div
              className=" flex border-b-2 flex-col gap-3  bg-gray-100  overflow-hidden"
              key={index}
            >
              <div className="bg-gray-200 rounded text-gray-800 p-4 flex justify-between items-center cursor-pointer">
                <div
                 className="text-lg flex">
                 <h1 className="font-bold block">Fecha de Corte:</h1><p className="block">{ventas.fecha}</p> 
                </div>
                <div>
                  <span className="mr-4 flex gap-4">
                    Total de Ventas: ${ventas.total.toFixed(2)}
                  </span>
                </div>
                <div>
                  <button onClick={() => generatePDF(ventas, ventas.fecha, ventas.total)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Descargar PDF</button>
                </div>
              </div>
              <div className="p-2 ">
                {ventas.ventas.map((venta) => (
                  <div key={venta._id} className="mb-3 ">
                    <div
                      className={`p-5 py-2 cursor-pointer flex flex-col sm:flex-row hover:bg-blue-200  transition duration-200  ${
                        expandedVenta === venta._id
                          ? "bg-blue-200 rounded-t-lg"
                          : "bg-blue-100  rounded-lg border"
                      }`}
                      onClick={() => toggleVenta(venta._id)}
                    >
                      <div className=" flex flex-col   w-full">
                        <div className=" relative flex  justify-between items-center">
                          <span className="font-semibold">
                            {" "}
                            <Person2Rounded className="mr-2 " />
                            {venta.vendedor?.nombre}
                          </span>
                          <div className=" absolute top-0 right-0 mb-2 text-blue-600 font-bold  rounded-full p-1 flex items-center">
                            <ShoppingCartRounded className="mr-2" /> Total: $
                            {venta.total}
                          </div>
                        </div>

                        <div className="flex space-x-3 items-center">
                          <div className="flex text-sm items-center  text-gray-600">
                            <CalendarTodayRounded className="mr-2 " />{" "}
                            {new Date(venta.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center  text-gray-600">
                            <AccessTimeIcon className="mr-2 text-xs" />{" "}
                            {new Date(venta.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      {expandedVenta === venta._id && (
                        <div
                          key={venta?._id}
                          className="px-5 py-2 hover:shadow-lg hover:shadow-blue-200 bg-gray-100  rounded-b-lg border border-blue-200"
                        >
                          <h4 className="text-lg font-medium text-gray-800 mb-2">
                            Productos
                          </h4>
                          <div className="flex flex-col gap-2">
                            {venta.productos.map((producto, index) => (
                              // card de cada producto
                              <Producto key={index} producto={producto} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Producto = ({ producto }) => {
  const { products } = useProductsContext();

  const getImageData = (id) => {
    const image = products.find((product) => product._id === id)?.imagen;
    const DataImg = image
      ? `data:${image?.contentType};base64,${image?.data}`
      : "/productPlaceholder.svg";

    return DataImg;
  };
  return (
    <div className="flex flex-col md:flex-row    border px-4 py-2 rounded-lg  bg-white">
      <div className="flex flex-grow  flex-wrap items-center">
        <div className="w-full md:w-auto flex justify-center">
          <img
          src={getImageData(producto?.producto?._id)}
          alt={producto?.nombre}
          className="w-16 h-16 rounded-full mr-4"
        />
        </div>
        

        <div className="flex-grow">
          <h4 className="text-lg font-semibold">{producto.producto?.nombre}</h4>
          <p className="text-sm text-gray-600">
            {producto.producto?.descripcion}
          </p>
          <p className="text-sm text-gray-700 font-medium">
            cantidad: {producto.cantidad}
          </p>
        </div>
      </div>
      <div className=" flex flex-row md:flex-col  justify-between ">
        <p className="text-sm font-medium">
          Precio:${producto.precio_unitario?.toFixed(2)}
        </p>
        <p className="text-md font-semibold bg-green-300 rounded p-1">
          Total:${producto.precio_total?.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default VentasProductos;
