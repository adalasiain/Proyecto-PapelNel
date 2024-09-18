import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

import { FaHome } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";

import { FaPaperPlane } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

import { IoIosCloseCircleOutline } from "react-icons/io";

const Gastos = () => {

  {/* Modal de Gastos */}
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  const [open, setOpen] = useState(false); 
  const ruta = useLocation()

  return (
    <div className='flex'>

      <div className={`bg-gray-100 h-screen p-5 pt-8 z-20 border-r-2 border-gray-300 rounded-lg ${open ? "w-32" : "w-[90px]" } duration-300 w-72 relative`}>
        <IoChevronBack className={`text-4xl text-black bg-gray-100 rounded-full absolute -right-3 top-9 border-2 border-gray-300 cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />

        <div className='inline-flex'>
          <FaPaperPlane className={`bg-gray-50 text-3xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`} />
          <h1 className={`text-gray-700 origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>PapelNet</h1>
        </div>

        <div className=' items-center rounded-md'>
          <Link to="/" className={`flex mt-8 border-2 border-gray-300 hover:border-yellow-400 w-full text-2xl rounded-lg items-center ${open ? "px-4" : "px-2"} ${!open && "hover:text-yellow-400"}`}> <p><FaHome className={`text-2xl mr-5 m-2 ${!open && "ml-1"}`} /></p><p className={`${!open && "hidden"}`}>Inicio</p></Link>

          <Link to="/ventas_vendedor" className={`flex mt-8 border-2 border-gray-300 hover:border-blue-400 w-full text-2xl rounded-lg items-center ${open ? "px-4" : "px-2"} ${!open && "hover:text-blue-400"}`}> <p><IoCart className={`text-2xl mr-5 m-2 ${!open && "ml-1"}`} /></p><p className={`${!open && "hidden"}`}>Ventas</p></Link>

          <Link to="/gastos_vendedor" className={`flex mt-8 border-2 border-gray-300 hover:border-purple-400 w-full text-2xl rounded-lg items-center ${ruta.pathname==="/gastos_vendedor" ? "bg-purple-400" : ""} ${open ? "px-4" : "px-2"} ${!open && "text-black"}`}> <p><FaCircleDollarToSlot className={`text-2xl mr-5 m-2 ${!open && "ml-1"}`} /></p><p className={`${!open && "hidden"}`}>Gastos</p></Link>

          <button className={`flex mt-8 border-2 border-gray-300 hover:border-green-400 w-full text-2xl rounded-lg items-center ${open ? "px-4" : "px-2"} ${!open && "hover:text-green-400"}`}> <p><GiMoneyStack className={`text-2xl mr-5 m-2 ${!open && "ml-1"}`} /></p><p className={`${!open && "hidden"}`}>Caja</p></button>

          <button className={`flex mt-40 border-2 border-gray-300 hover:border-pink-400 w-full text-2xl rounded-lg items-center ${open ? "px-4" : "px-2"} ${!open && "hover:text-pink-400"}`}> <p><BiLogOut className={`text-2xl mr-5 m-2 ${!open && "ml-1"} `} /></p><p className={`${!open && "hidden"}`}>Salir</p></button>

        </div>
      </div>

      <div className='flex justify-between w-full h-[60px] ml-10 mr-10 border-b-4 border-purple-400'>
        <div className=''>
          <h1 className='text-4xl mt-2'>Apartado de Gastos</h1>
        </div>
        <div className=''>
        <button className='mt-1 border-2 bg-purple-400 text-xl rounded-xl p-2 hover:text-white' onClick={openPopup}>Generar Gasto</button>
        </div>
      </div>

      <div className='absolute ml-[130px] mt-[80px] w-[550px] h-[400px]'>
        <table className='border-2 border-purple-400 w-[550px] h-[400px]'>
        <thead className=''>
          <tr className='flex'>
            <th className='text-center w-1/2 border-r-2 border-purple-400'>Motivo de gasto</th>
            <th className='text-center w-1/2'>Monto de gasto</th>
          </tr>
        </thead>
        <tbody className='border-2 border-purple-400 w-[400px]'>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        </table>
      </div>

      <div className='absolute ml-[740px] mt-[80px] bg-white rounded-xl'>
      {isPopupOpen && (
        <div>
          <div className='border-2 border-purple-400 shadow-2xl shadow-purple-400 w-[500px] h-[300px] rounded-xl'>
              <button className='' onClick={closePopup}><IoIosCloseCircleOutline className='text-4xl mt-1 hover:text-purple-400' /></button>
              <h1 className='text-center text-3xl'>Nuevo Gasto.</h1>
              <br />
              <br />
              <div className='flex'>
                <h1 className='ml-5 text-2xl'>Motivo del Gasto:</h1>
                <input className='border-2 border-purple-400 rounded-xl ml-2 w-[270px] text-center' type="text" required />
              </div>
              <br />
              <div className='flex'>
                <h1 className='ml-5 text-2xl'>Monto del Gasto: $</h1>
                <input className='border-2 border-purple-400 rounded-xl ml-2 w-[100px] text-center' type="number" required />
              </div> 
              <br />
              <button className='border-2 border-purple-400 text-xl rounded-xl p-1 ml-44 hover:bg-purple-400 hover:text-white hover:border-white' type='submit'>Guardar Gasto</button> 
          </div>
        </div>
      )}
      </div>

      <div className='absolute ml-[150px] mt-[500px]'>
        <button className='mt-1 border-2 bg-purple-400 text-xl rounded-xl p-2 hover:text-white'>Generar PDF de Gastos</button>
        <button className='mt-1 ml-2 border-2 bg-red-400 text-xl rounded-xl p-2 hover:text-white'>Limpiar todos los Registros</button>
      </div>

    </div>
  )
}

export default Gastos