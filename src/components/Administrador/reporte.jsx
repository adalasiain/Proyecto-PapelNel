import { useEffect, useState } from "react";
import Sales from "../../Services/SalesServces";
import { saveAs } from 'file-saver';
import htmlToPdfMake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { img1 } from '../../../public/img.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import Service from "../../Services/ServiciosService";
import Expense from "../../Services/ExpensesService";

const Reporte = () => {
  const salesService = new Sales();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salesByDate, setSalesByDate] = useState([]);
  const [salesByDateMes, setSalesByDateMes] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [gastosDelMes, setGastosDelMes] = useState([]);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // Servicios
  const [sales, setSales] = useState([]);
  const fetchSalesData = async () => {
    const Servicio = new Service();
    try {
      const data = await Servicio.getAllServiceSale(); // Obtén el array de ventas
      setSales(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {fetchSalesData();}, []);

  const groupByDate = (sales) => {
    if (!Array.isArray(sales)) {
      console.error('sales no es un arreglo');
      return {};
    }
    return sales.reduce((acc, sale) => {
      const date = new Date(sale.fecha).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(sale);
      return acc;
    }, {});
  };

  //Ventas
  useEffect(() => {
    const obtenerVentas = async () => {
      const ventas = await salesService.getSales();

      // Asegúrate de que ventas sea un array
      if (Array.isArray(ventas)) {
        setVentas(ventas);
      } else {
        console.error("Las ventas no son un array:", ventas);}
      setLoading(false);
    };
    obtenerVentas();
    console.log(ventas);
  }, []);

  useEffect(() => {
    if (!loading) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const ventasDelMesActual = ventas.filter((venta) => {
        const ventaDate = new Date(venta.createdAt);
        return ventaDate.getMonth() === currentMonth && ventaDate.getFullYear() === currentYear;
      });
      const ventasPorFecha = ventasDelMesActual.reverse().reduce((acc, venta) => {
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
    }
  }, [loading, ventas]);

  //Obtener Gastos
    useEffect(() => {
      const fetchGastos = async () => {
        const expensesService = new Expense();
        try {
          const data = await expensesService.getAllExpences(); // Obtén los gastos
          setGastos(data); // Almacena los gastos en el estado
        } catch (error) {
          console.error('Error al obtener los gastos:', error);
        }};
      fetchGastos(); // Llama a la función para obtener los gastos
    }, []);

    useEffect(() => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // Mes actual (0-11)
      const currentYear = currentDate.getFullYear(); // Año actual
      const filteredGastos = gastos.filter(gasto => {
        const fechaGasto = new Date(gasto.fecha);
        return (
          fechaGasto.getMonth() === currentMonth &&
          fechaGasto.getFullYear() === currentYear
        );});
      setGastosDelMes(filteredGastos);
    }, [gastos]);

  const reportePDF = async (ventasDelMes) => {
    // Verificar si ventasDelMes es un arreglo
    if (!Array.isArray(ventasDelMes)) {
      console.error('ventasDelMes no es un arreglo o está indefinido:', ventasDelMes);
      return;
    }

    const totalMes = ventasDelMes.reduce((acc, venta) => acc + venta.total, 0);
    const htmlContent = `
    <div style="text-align: center; margin-bottom: 0px;">
      <div style="text-align: center; margin-bottom: 0px;">
        <img src="${img1}" style="width: 200px; height: auto; margin-top: 10px;" />
        <h3 style="margin: 0; color: rgb(0, 0, 0);">Reporte Mensual de Ventas</h3>
      </div>
      <h2 style="text-align: start; color: rgb(61, 61, 191); margin: 0;">Ventas de ${meses[currentMonth]}</h2>
      <h4 style="color: rgb(255, 0, 0); flex: 1; margin-right: 10px; text-align: start;">Total del Mes: $${totalMes?.toFixed(2)}</h4>
      <div style="text-align: center; margin-bottom: 0px;">
          <table style="width: 100%; border-collapse: collapse; margin-right: 0px; margin-left: 70px;">
          <thead>
          <tr>
          <th style="border: 1px solid #ddd;">Fecha</th>
          <th style="border: 1px solid #ddd;">Total</th>
          <th style="border: 1px solid #ddd;">Vendedor</th>
          <th style="border: 1px solid #ddd;">Productos</th>          
          </tr>
          </thead>
          <tbody>
          ${ventasDelMes.map(venta => `
          <tr>
          <td style="border: 1px solid #ddd;">${venta.fecha}</td>
          <td style="border: 1px solid #ddd;">$${venta.total.toFixed(2)}</td>
          <td style="border: 1px solid #ddd; color: rgb(51, 255, 113);">${venta.ventas[0]?.vendedor.nombre}</td>
          <td style="border: 1px solid #ddd;">
          <ul style="margin: 0; padding: 0; list-style-type: none;">
          ${venta.ventas.map(v =>
      v.productos.map(producto => `
            <li>${producto.producto.nombre} - $${producto.precio_unitario}</li>
            `).join('')
    ).join('')}
            </ul>
            </td>
            </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
    </div>`;
    // Convierte el HTML a estructura PDFMake
    const pdfMakeContent = htmlToPdfMake(htmlContent);
    const docDefinition = {content: pdfMakeContent};
    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      saveAs(blob, `Reporte_venta_mensual.pdf`);
    });
  };

  const reportePDF2 = async () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
  
    // Filtrar los servicios para obtener solo los del mes y año actuales
    const filteredSales = sales.filter(service => {
      const serviceDate = new Date(service.fecha);
      return serviceDate.getMonth() === currentMonth && serviceDate.getFullYear() === currentYear;
    });
  
    // Agrupar los servicios filtrados por fecha
    const groupedServices = groupByDate(filteredSales);
  
    // Si no hay servicios para el mes actual, mostrar un mensaje
    if (filteredSales.length === 0) {
      const htmlContent = `
        <div style="text-align: center; margin-bottom: 0px;">
          <div style="text-align: center; margin-bottom: 0px;">
            <img src="${img1}" style="width: 200px; height: auto; margin-top: 10px;" />
            <h3 style="margin: 0; color: rgb(0, 0, 0);">Reporte Mensual de Servicios</h3>
          </div>
          <h2 style="text-align: start; color: rgb(61, 61, 191); margin: 0;">Ventas de ${meses[currentMonth]}</h2>
          <p style="color: rgb(255, 0, 0);">No hay servicios registrados para este mes.</p>
        </div>`;
  
      const pdfMakeContent = htmlToPdfMake(htmlContent);
      const docDefinition = { content: pdfMakeContent };
      pdfMake.createPdf(docDefinition).getBlob((blob) => {
        saveAs(blob, `Reporte_servicios_${meses[currentMonth]}.pdf`);
      });
      return;
    }
  
    const htmlContent = `
      <div style="text-align: center; margin-bottom: 0px;">
        <div style="text-align: center; margin-bottom: 0px;">
          <img src="${img1}" style="width: 200px; height: auto; margin-top: 10px;" />
          <h3 style="margin: 0; color: rgb(0, 0, 0);">Reporte Mensual de Servicios</h3>
        </div>
        <h2 style="text-align: start; color: rgb(61, 61, 191); margin: 0;">Ventas de ${meses[currentMonth]}</h2>
        <div style="text-align: center; margin-bottom: 0px;">
          <table style="width: 100%; border-collapse: collapse; margin: auto;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd;">Fecha</th>
                <th style="border: 1px solid #ddd;">Total</th>
                <th style="border: 1px solid #ddd;">Vendedor</th>
                <th style="border: 1px solid #ddd;">Servicios</th>
              </tr>
            </thead>
            <tbody>
              ${Object.keys(groupedServices).map(date => `
                <tr>
                  <td style="border: 1px solid #ddd;">${date}</td>
                  <td style="border: 1px solid #ddd;">$${groupedServices[date].reduce((sum, sale) => sum + sale.total_venta, 0)?.toFixed(2)}</td>
                  <td style="border: 1px solid #ddd;">${groupedServices[date][0]?.vendedor?.nombre}</td>
                  <td style="border: 1px solid #ddd;">
                    <ul style="margin: 0; padding: 0; list-style-type: none;">
                      ${groupedServices[date].map(service => `
                        ${service.detallesServicio.map(detalleServicio => `
                        <li>${detalleServicio.nombre} - $${detalleServicio.total}</li>
                      `).join('')}
                      `).join('')}
                    </ul>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  
    const pdfMakeContent = htmlToPdfMake(htmlContent);
    const docDefinition = { content: pdfMakeContent };
    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      saveAs(blob, `Reporte_servicios_${meses[currentMonth]}.pdf`);
    });
  };
  

  const reportePDF3 = async (gastos) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
  
    // Filtrar los gastos para obtener solo los del mes y año actuales
    const filteredGastos = gastos.filter(gasto => {
      const gastoDate = new Date(gasto.fecha);
      return gastoDate.getMonth() === currentMonth && gastoDate.getFullYear() === currentYear;
    });
  
    // Calcular el total de los gastos del mes
    const totalGastoMes = filteredGastos.reduce((acc, gasto) => acc + gasto.cantidad, 0);
  
    // Si no hay gastos para el mes actual, mostrar un mensaje
    if (filteredGastos.length === 0) {
      const htmlContent = `
        <div style="text-align: center; margin-bottom: 0px;">
          <div style="text-align: center; margin-bottom: 0px;">
            <img src="${img1}" style="width: 200px; height: auto; margin-top: 10px;" />
            <h3 style="margin: 0; color: rgb(0, 0, 0);">Reporte Mensual de Gastos</h3>
          </div>
          <h2 style="text-align: start; color: rgb(61, 61, 191); margin: 0;">Gastos de ${meses[currentMonth]}</h2>
          <p style="color: rgb(255, 0, 0);">No hay gastos registrados para este mes.</p>
        </div>`;
  
      const pdfMakeContent = htmlToPdfMake(htmlContent);
      const docDefinition = { content: pdfMakeContent };
      pdfMake.createPdf(docDefinition).getBlob((blob) => {
        saveAs(blob, `Reporte_gastos_${meses[currentMonth]}.pdf`);
      });
      return;
    }
  
    // Si hay gastos, generar la tabla como de costumbre
    const htmlContent = `
      <div style="text-align: center; margin-bottom: 0px;">
        <div style="text-align: center; margin-bottom: 0px;">
          <img src="${img1}" style="width: 200px; height: auto; margin-top: 10px;" />
          <h3 style="margin: 0; color: rgb(0, 0, 0);">Reporte Mensual de Gastos</h3>
        </div>
        <h2 style="text-align: start; color: rgb(61, 61, 191); margin: 0;">Gastos de ${meses[currentMonth]}</h2>
        <h2 style="text-align: start; color: rgb(255, 0, 0); margin: 0;">Total $${totalGastoMes}</h2>
        <div style="text-align: center; margin-bottom: 0px;">
          <table style="width: 100%; border-collapse: collapse; margin-left: 70px;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd;">Fecha</th>
                <th style="border: 1px solid #ddd;">Cantidad</th>
                <th style="border: 1px solid #ddd;">Motivo</th>
                <th style="border: 1px solid #ddd;">Vendedor</th>
                <th style="border: 1px solid #ddd;">Rol</th> 
              </tr>
            </thead>
            <tbody>
              ${filteredGastos.map(g => `
                <tr>
                  <td style="border: 1px solid #ddd;">${new Date(g.fecha).toLocaleDateString()}</td>
                  <td style="border: 1px solid #ddd;">$${g.cantidad}</td>
                  <td style="border: 1px solid #ddd;">${g.motivo}</td>
                  <td style="border: 1px solid #ddd;">${g?.vendedor?.nombre}</td>
                  <td style="border: 1px solid #ddd;">${g?.vendedor?.rol}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  
    const pdfMakeContent = htmlToPdfMake(htmlContent);
    const docDefinition = { content: pdfMakeContent };
    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      saveAs(blob, `Reporte_gastos_${meses[currentMonth]}.pdf`);
    });
  };
  

  return (
    <div className="w-full flex-auto p-6 bg-gray-100 rounded-lg shadow-md">
    <div className="px-4">
      <h1 className="text-3xl font-bold mb-5 text-gray-800">Reportes Mensuales</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Reportes de Ventas</h2>
        <div className="space-y-4">
          <button onClick={() => reportePDF(salesByDate)} className="w-full mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200">Descargar reporte de Productos</button>
          <button onClick={() => reportePDF2()}className="w-full mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200">Descargar reporte de Servicios</button>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Reporte de Gastos</h2>
        <div className="space-y-4">
          <button onClick={() => reportePDF3(gastosDelMes)}className="w-full mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200">Descargar reporte de Gastos</button>
        </div>
      </div>
    </div>
  </div>
  );
};
export default Reporte;