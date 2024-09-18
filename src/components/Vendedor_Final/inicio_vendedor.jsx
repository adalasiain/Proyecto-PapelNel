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

const Inicioventas = () => {

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
          <Link to="/" className={`flex mt-8 border-2 border-gray-300 hover:border-yellow-400 w-full text-2xl rounded-lg items-center ${ruta.pathname==="/" ? "bg-yellow-400" : ""} ${open ? "px-4" : "px-2"} ${!open && "text-black"}`}> <p><FaHome className={`text-2xl mr-5 m-2 ${!open && "ml-1"}`} /></p><p className={`${!open && "hidden"}`}>Inicio</p></Link>

          <Link to="/ventas_vendedor" className={`flex mt-8 border-2 border-gray-300 hover:border-blue-400 w-full text-2xl rounded-lg items-center ${open ? "px-4" : "px-2"} ${!open && "hover:text-blue-400"}`}> <p><IoCart className={`text-2xl mr-5 m-2 ${!open && "ml-1"}`} /></p><p className={`${!open && "hidden"}`}>Ventas</p></Link>

          <Link to="/gastos_vendedor" className={`flex mt-8 border-2 border-gray-300 hover:border-purple-400 w-full text-2xl rounded-lg items-center ${open ? "px-4" : "px-2"} ${!open && "hover:text-purple-400"}`}> <p><FaCircleDollarToSlot className={`text-2xl mr-5 m-2 ${!open && "ml-1"}`} /></p><p className={`${!open && "hidden"}`}>Gastos</p></Link>

          <Link to="/caja_vendedor" className={`flex mt-8 border-2 border-gray-300 hover:border-green-400 w-full text-2xl rounded-lg items-center ${open ? "px-4" : "px-2"} ${!open && "hover:text-green-400"}`}> <p><GiMoneyStack className={`text-2xl mr-5 m-2 ${!open && "ml-1"}`} /></p><p className={`${!open && "hidden"}`}>Caja</p></Link>

          <button className={`flex mt-40 border-2 border-gray-300 hover:border-pink-400 w-full text-2xl rounded-lg items-center ${open ? "px-4" : "px-2"} ${!open && "hover:text-pink-400"}`}> <p><BiLogOut className={`text-2xl mr-5 m-2 ${!open && "ml-1"} `} /></p><p className={`${!open && "hidden"}`}>Salir</p></button>

        </div>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300 opacity-50 rounded-full "></div>
      <div className="absolute top-16 left-40 w-48 h-48 bg-blue-400 opacity-50 rounded-full"></div>
      <div className="absolute bottom-0 right-32 w-56 h-56 bg-green-300 opacity-50 rounded-full"></div>
      <div className="absolute bottom-16 left-32 w-40 h-40 bg-yellow-300 opacity-50 rounded-full animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-300 opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2 "></div>

      <img src="../../public/Logo.jpg" className='w-[700px] h-[500px] ml-60 mt-10' />

    </div>
  )
}

export default Inicioventas