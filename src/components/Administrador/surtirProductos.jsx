import React, { useState } from 'react';
import { FaBox, FaArrowUp, FaSearch, FaMoon, FaSun, FaChartLine, FaDollarSign, FaTag } from 'react-icons/fa';
import { useProductsContext } from '../../context/productsContext';
import Products from '../../Services/ProductsService';
import Swal from 'sweetalert2';

const SurtirProductos = () => {


  const Product = new Products()
  const [searchTerm, setSearchTerm] = useState('');


  const {products, getProducts}= useProductsContext()
  const lowStockProducts = products.filter(item => item.stock <= item.stock_bajo);

  const filteredItems = lowStockProducts.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [reorderQuantity,setReorderQuiantity]= useState([])


  const handleReorderQuantityChange = async (product) => {
  
    

    const cantidad=product.stock + parseInt(reorderQuantity[product._id])
    try {
      
      

      await Product.reorderProduct({cantidad}, product._id )
    await getProducts()
    Swal.fire({
      title: 'Agregando Producto',
      html: `
          <div class="flex justify-center items-center">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6em' height='6em' viewBox='0 0 24 24'%3E%3Cpath fill='%236c53ea' d='M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z'%3E%3CanimateTransform attributeName='transform' dur='0.75s' repeatCount='indefinite' type='rotate' values='0 12 12;360 12 12'/%3E%3C/path%3E%3C/svg%3E" alt="Spinner">
          </div>
        
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    await Product.reorderProduct({ cantidad }, product._id);
    await getProducts();

    Swal.fire({
      icon: 'success',
      title: 'Producto agregado con éxito',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al surtir el producto',
      showConfirmButton: false,
      timer: 1500
    });
  }
    
  };

  const getRecommendation = (item) => {
    const salesRatio = item.salesLastMonth / item.minStock;
    if (salesRatio > 1.5) {
      return `Considera aumentar el stock mínimo a ${Math.ceil(item.minStock * 1.5)} ${item.unit}s`;
    } else if (salesRatio < 0.5) {
      return `Podrías reducir el stock mínimo a ${Math.floor(item.minStock * 0.75)} ${item.unit}s`;
    }
    return "El stock mínimo actual parece adecuado";
  };

  return (
    <div className={`min-h-screen   bg-white text-gray-800`}>
      <div className="w-full">
      <div className=" flex justify-between  border-b-2 flex-col lg:flex-row gap-2 z-10 sticky top-0 bg-white px-2 py-4  ">
        <div className="flex items-center gap-2 justify-between md:justify-normal">
          <h1 className="text-4xl font-bold text-center">Surtir Productos</h1>
        </div>

        <div className="flex gap-1 border-2 rounded-full w-full sm:w-1/2  p-1">
          <input
            name="nombre"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            
            className="flex-grow  w-1/2 sm:w-auto px-3 py-2 border   rounded-full focus:border-color_base focus:outline-none focus:ring-2   "
            placeholder="Buscar producto o categoría..."
            required
          />
        </div>
      </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {!filteredItems.length? (searchTerm ? "No se encontraron resultados":"No tienes productos con Stock Minimo")  : filteredItems.map((item) => (

            <div key={item?._id} className={`rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 bg-gray-100`}>
              <form id={`reponer-${item._id}`} onSubmit={(e)=>{
                e.preventDefault()
                handleReorderQuantityChange(item)}}>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 flex items-center">
                  <FaBox className="mr-2" /> {item.nombre}
                </h2>
                <p className="text-sm text-gray-500 mb-4 flex items-center">
                  <FaTag className="mr-2" /> {item.categoria} | {item.seccion}
                </p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Stock Actual</span>
                  <span className={`text-lg font-bold text-red-600`}>
                    {item.stock} unidades
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Stock Mínimo</span>
                  <span className="text-lg font-semibold">{item.stock_bajo} unidades</span>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Cantidad a Reponer</span>
                  <input
                    type="number"
                    min={1}
                    id={item._id}
                    name={item._id}
                    value={reorderQuantity[item._id]}
                    onChange={(e)=>setReorderQuiantity({ ...reorderQuantity, [e.target.name]: e.target.value })}
                    className={`w-20 text-right bg-white text-gray-800 border rounded p-1`}
                    required
                  />
                </div>

                
                
                {/* <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${(item.currentStock / item.minStock) * 100}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        item.currentStock < item.minStock ? 'bg-red-500' : 'bg-green-500'
                      }`}
                    ></div>
                  </div>
                </div> */}
                {/* <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                  <FaChartLine className="inline mr-2" />
                  {getRecommendation(item)}
                </div> */}
              </div>
              <div className={`px-6 py-4 bg-gray-50`}>
                
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center"
                form={`reponer-${item._id}`}
                type='submit'
                >
                  <FaArrowUp className="mr-2" /> Reponer Stock
                </button>
              </div>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurtirProductos;