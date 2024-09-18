import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { AiFillPrinter } from "react-icons/ai";
import { FaGift, FaPaperPlane } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoCart, IoChevronBack } from "react-icons/io5";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { IoSearchCircle } from "react-icons/io5";

import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

import { IoIosCloseCircleOutline } from "react-icons/io";

const Ventas = () => {  
  const [open, setOpen] = useState(false);
  const ruta = useLocation();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [alert, setAlert] = useState("");

  {/* Modal de Cobro */}
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  const initialProducts = [...Array(12)].map((_, index) => ({
    id: index,
    name: `Producto ${index + 1}`,
    description: `Descripción del producto ${index + 1}.`,
    price: 100.00,
    stock: 10,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkEjuMveu-4ukf1LWxnDhtihgqwDJk3Acj2w&s'
  }));

  const [products, setProducts] = useState(initialProducts);

  const addProduct = (product) => {
    if (product.stock > 0) {
      setSelectedProducts(prevSelectedProducts => {
        const existingProduct = prevSelectedProducts.find(p => p.id === product.id);
        if (existingProduct) {
          return prevSelectedProducts.map(p =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          );
        } else {
          return [...prevSelectedProducts, { ...product, quantity: 1 }];
        }
      });

      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        )
      );

      setTotal(prevTotal => prevTotal + product.price);

      if (product.stock - 1 === 5) {
        setAlert("stock bajo");
      } else if (product.stock - 1 === 0) {
        setAlert("sin stock");
      } else {
        setAlert("");
      }
    }
  };

  const removeProduct = (product) => {
    setSelectedProducts(prevSelectedProducts => {
      const existingProduct = prevSelectedProducts.find(p => p.id === product.id);
      if (existingProduct.quantity === 1) {
        return prevSelectedProducts.filter(p => p.id !== product.id);
      } else {
        return prevSelectedProducts.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
        );
      }
    });

    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === product.id ? { ...p, stock: p.stock + 1 } : p
      )
    );

    setTotal(prevTotal => prevTotal - product.price);
  };

    const deleteProduct = (product) => {
      setSelectedProducts(prevSelectedProducts => prevSelectedProducts.filter(p => p.id !== product.id));
  
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === product.id ? { ...p, stock: p.stock + product.quantity } : p
        )
      );

      setTotal(prevTotal => prevTotal - (product.price * product.quantity));
  
  };

  return (
    <div className='h-screen flex'>
      <div>
        <div className={`bg-gray-100 h-screen p-5 pt-8 z-20 border-r-2 border-gray-300 rounded-lg ${open ? "w-32" : "w-[90px]" } duration-300 w-72 relative`}>
          <IoChevronBack className={`text-4xl text-black bg-gray-100 rounded-full absolute -right-3 top-9 border-2 border-gray-300 cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />

          <div className='inline-flex'>
            <FaPaperPlane className={`bg-gray-50 text-3xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`} />
            <h1 className={`text-gray-700 origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>PapelNet</h1>
          </div>

          <div className='items-center rounded-md'>
            <Link to="/" className={`flex mt-8 border-2 border-gray-300 hover:border-yellow-400 w-full text-2xl rounded-lg items-center  ${open ? "px-4" : "px-2"} ${!open && "hover:text-yellow-400"}`}> 
              <p><FaHome className={`text-2xl mr-5 m-2 ${!open && "ml-1"}`} /></p><p className={`${!open && "hidden"}`}>Inicio</p>
            </Link>

            <Link to="/ventas_vendedor" className={`flex mt-8 border-2 border-gray-300 hover:border-blue-400 w-full text-2xl rounded-lg items-center ${ruta.pathname==="/ventas_vendedor" ? "bg-blue-400" : ""} ${open ? "px-4" : "px-2"} ${!open && "text-black"}`}> 
              <p><IoCart className={`text-2xl mr-5 m-2 ${!open && "ml-1"}`} /></p><p className={`${!open && "hidden"}`}>Ventas</p>
            </Link>

            <Link to="/gastos_vendedor" className={`flex mt-8 border-2 border-gray-300 hover:border-purple-400 w-full text-2xl rounded-lg items-center ${open ? "px-4" : "px-2"} ${!open && "hover:text-purple-400"}`}> 
              <p><FaCircleDollarToSlot className={`text-2xl mr-5 m-2 ${!open && "ml-1"}`} /></p><p className={`${!open && "hidden"}`}>Gastos</p>
            </Link>

            <button className={`flex mt-8 border-2 border-gray-300 hover:border-green-400 w-full text-2xl rounded-lg items-center ${open ? "px-4" : "px-2"} ${!open && "hover:text-green-400"}`}> 
              <p><GiMoneyStack className={`text-2xl mr-5 m-2 ${!open && "ml-1"}`} /></p><p className={`${!open && "hidden"}`}>Caja</p>
            </button>

            <button className={`flex mt-40 border-2 border-gray-300 hover:border-pink-400 w-full text-2xl rounded-lg items-center ${open ? "px-4" : "px-2"} ${!open && "hover:text-pink-400"}`}> 
              <p><BiLogOut className={`text-2xl mr-5 m-2 ${!open && "ml-1"} `} /></p><p className={`${!open && "hidden"}`}>Salir</p>
            </button>
          </div>
        </div>       
      </div>

      <div className='flex-grow flex flex-col overflow-hidden'>
        <div className=''>
          <div className='mt-3'>
            <div className='flex justify-center'>
              <ul className='flex items-center gap-x-1 p-1 rounded-full bg-white border-blue-400 border-2'>
                <li className='flex items-center gap-x-2 text-sm py-3 px-6 rounded-full hover:bg-blue-400'>
                  <a href="" className='flex'><AiFillPrinter className='text-2xl mr-1' />Papeleria</a>
                </li>
                <li className='flex items-center gap-x-2 text-sm py-3 px-6 rounded-full hover:bg-blue-400'>
                  <a href="" className='flex'><FaGift className='text-2xl mr-1' />Regalos</a>
                </li>
                <li className='flex items-center gap-x-2 text-sm py-3 px-6 rounded-full hover:bg-blue-400'>
                  <a href="" className='flex'><FaComputer className='text-2xl mr-1' />Servicios</a>
                </li>
              </ul>
            </div>

            {/* Productos */}
            <div className={`grid ${open ? "grid-cols-2" : "grid-cols-3"} gap-4 mt-4 p-2  overflow-y-auto h-[calc(100vh-100px)]`}>
            {products.map((product) => (
            <div key={product.id} className='bg-gray-100 p-4 border hover:border-blue-400 rounded-lg shadow-md hover:shadow-blue-400 h-[350px] flex flex-col'>
            <img src={product.imageUrl} alt={product.name} className='w-full h-32 object-cover rounded-lg' />
            <h2 className='text-xl font-semibold mt-2 text-center'>{product.name}</h2>
            <p className='text-gray-600 text-center'>{product.description}</p>
            <div className='mt-auto flex justify-between'>
              <p className='text-gray-800 font-bold'>${product.price.toFixed(2)}</p>
              <p className={`text-sm ${product.stock <= 5 ? 'text-red-500' : 'text-gray-500'}`}>Stock: {product.stock}</p>
            </div>
            <button className='mt-2 bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-600' onClick={() => addProduct(product)} disabled={product.stock === 0}>
              Agregar
            </button>
            </div>
            ))}
          </div>

          </div>
        </div>
      </div>

      <div className='p-5 w-[350px] border-l-2 border-black rounded-xl'>
        <div className='flex items-start text-blue-400'>
          <input type="text" placeholder='Buscar Producto...' className="border-blue-400 w-full p-2 border-2 rounded-full" />
          <IoSearchCircle className='text-[45px]' />
        </div>
        <div className='border-[2px] border-black w-[320px] h-[450px] mt-2 rounded-xl overflow-y-auto'>
          {selectedProducts.map(product => (
            <div key={product.id} className='flex justify-between items-center border-b border-blue-400 '>
              <div className='flex flex-col items-center w-2/5 h-[80px] border-r border-blue-400'>
                <img src={product.imageUrl} alt={product.name} className='w-16 h-16 object-cover rounded-lg mt-1' />
                <h3 className='text'>{product.name}</h3>
              </div>

              <div className='flex w-[80px] h-[80px] border-r border-blue-400'>
                <div className='items-start mt-1'>
                  <button className='bg-green-400 text-white text-[20px] p-1 m-1 rounded-full' onClick={() => addProduct(product)}>
                    <IoIosAddCircleOutline />
                  </button>
                  <button className='bg-red-400 text-white text-[20px] p-1 m-1 rounded-full' onClick={() => removeProduct(product)}>
                    <IoIosRemoveCircleOutline />
                  </button>
                </div>
                <div>
                  <button className='bg-blue-400 text-white text-[20px] p-1 m-1 rounded-full mt-6' onClick={() => deleteProduct(product)}>
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>

              <div className='w-2/5 h-[80px]'>
                <p className='text-[15px] text-center mt-2'>Cantidad: {(product.quantity)}</p>
                <p className='text-[15px] text-center mt-4'>Total: ${(product.price * product.quantity).toFixed(2)}</p>
              </div>
            </div>
              
          ))}
        </div>

        <div className='w-[320px] flex justify-between items-center gap-x-5 bg-blue-400 rounded-xl mt-2'>
          <div className='flex flex-col gap-y-2'>
            <p className='text-2xl pl-2 text-white'>Total: ${total.toFixed(2)}</p>
          </div>
          <div className='flex gap-x-2 items-center'>
            <button className='w-[100px] bg-white border-[2px] border-blue-400 text-black rounded-xl p-2' onClick={openPopup}>Cobrar</button>
          </div>
        </div>
      </div>

      
      {isPopupOpen && (
        <div className='absolute w-[930px] h-full pl-[450px] pt-[50px] bg-white rounded-xl'>
        <div>
          <div className='border-2 border-blue-400 shadow-2xl shadow-blue-400 w-[400px] h-[500px] rounded-xl'>
              <div className='flex justify-end'>
                <button className='' onClick={closePopup}><IoIosCloseCircleOutline className='text-4xl mt-1 mr-1 hover:text-blue-400' /></button>
              </div>
              <h1 className='text-center text-3xl'>Confirmar Pago.</h1>
              <br />
              <h1 className='ml-5 text-2xl'>Total de Productos: {selectedProducts.length}</h1>
              <br />
              <h1 className='ml-5 text-2xl'>Total: ${total.toFixed(2)}</h1>
              <br />
              <div className='flex'>
                <h1 className='ml-5 text-2xl'>Recibido: $</h1>
                <input className='border-2 border-blue-400 rounded-xl ml-2 w-40 text-center' type="number" required />
              </div>
              <br />
              <div className='flex'>
                <h1 className='ml-5 text-2xl'>Descuento:</h1>
                <input className='border-2 border-blue-400 rounded-xl ml-2 w-40 text-center' type="number" required /> <p className='text-2xl ml-1'>%</p>
              </div>
              <br />
              <br />
              <h1 className='ml-5 text-2xl'>Cambio: $</h1>
              <br />
              <button className='border-2 border-blue-400 text-xl rounded-xl p-1 ml-32 hover:bg-blue-400 hover:text-white hover:border-white' type='submit'>Guardar Venta</button> 
          </div>
        </div>
        </div>
      )}
      

    </div>
  );
}

export default Ventas;