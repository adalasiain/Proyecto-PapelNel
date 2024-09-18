import React, { useContext, useEffect } from 'react';

import { FaComputer } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { TfiMoney } from "react-icons/tfi";
import { BsGraphDownArrow } from "react-icons/bs";
import { SlRefresh } from "react-icons/sl";
import { FaCashRegister } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ProductsProvider } from '../../context/productsContext';
import { AuthContext } from '../../context/authContext';
import Users from '../../Services/UsersServices';

const VentasVendedor = () => {
    const User = new Users();
    const ruta = useLocation();

    const getSeccion=()=>{
      switch(ruta.pathname){
        case "/vendedor/ventas": 
        return 'Ventas'
        break;
      }
    }
  // cerrr sesion
  const handleLogout = () => {
    setIsAuth(false);
    User.logOut();
  };

  const navegar = useNavigate();
  const { setUser, setIsAuth, isAuth, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuth && !isLoading) {
      navegar(`/`);
    }
  },[isAuth, isLoading]);

  useEffect(() => {
    const getUser = async () => {
      const user = await User.Profile();

      if (user?.error) {
        setIsAuth(false);
      }

      setUser(user);
    };
    if (isAuth && !isLoading) {
      getUser();
    }
  });

  return (
    <div className='h-screen overflow-hidden w-screen'>
        <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container flex justify-between items-center p-2 ">
        <section className=' flex items-center'>
        <img
            src="https://ideogram.ai/assets/image/lossless/response/WRZ_pJoCTHqWPWLKNDRSoQ"
            className={`overflow-hidden transition-all w-24`}
            alt=""
          />
         
            </section>
            <h1 className='text-4xl font-bold text-center'>{getSeccion()}</h1>
          <div className="text-xl font-bold ">
            Vendedor
          </div>
        </div>
      </header>

        
       

        <div className='flex w-screen'>
            <div className='bg-gray-200 w-auto h-full rounded-lg'>
                <ul className='flex flex-col items-center gap-4 w-20'>
                    <li className='relative group bg-white mt-8 mb-1 p-2 rounded-lg hover:bg-color_base'>
                        <a href=""><FaHome className='text-3xl' /></a>
                            <span className="absolute z-20 left-full ml-2 px-2 py-1 text-sm text-color_base bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Inicio
                            </span>
                    </li>
                </ul>

                <ul className='flex flex-col items-center gap-4'>
                    <li className='relative group bg-white mt-8 mb-1 p-2 rounded-lg hover:bg-color_base'>
                        <a href=""><TfiMoney className='text-3xl' /></a>
                        <span className="absolute z-20 left-full ml-2 px-2 py-1 text-sm text-color_base bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Ventas
                        </span>
                    </li>
                </ul>

                <ul className='flex flex-col items-center gap-4'>
                    <li className='relative group bg-white mt-8 mb-1 p-2 rounded-lg hover:bg-color_base'>
                        <a href=""><BsGraphDownArrow className='text-3xl' /></a>
                        <span className="absolute z-20 left-full ml-2 px-2 py-1 text-sm text-color_base bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Gastos
                        </span>
                    </li>
                </ul>

                <ul className='flex flex-col items-center gap-4'>
                    <li className='relative group bg-white mt-8 mb-1 p-2 rounded-lg hover:bg-color_base'>
                        <a href=""><SlRefresh className='text-3xl' /></a>
                        <span className="absolute z-20 left-full ml-2 px-2 py-1 text-sm text-color_base bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Surtir
                        </span>
                    </li>
                </ul>

                <ul className='flex flex-col items-center gap-4'>
                    <li className='relative group bg-white mt-8 mb-1 p-2 rounded-lg hover:bg-color_base'>
                        <a href=""><FaCashRegister className='text-3xl' /></a>
                        <span className="absolute z-20 left-full ml-2 px-2 py-1 text-sm text-color_base bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Corte_Caja
                        </span>
                    </li>
                </ul>

                <ul className='flex flex-col items-center gap-4'>
                    <button onClick={handleLogout} className='relative group bg-white mt-8 mb-1 p-2 rounded-lg hover:bg-color_base'>
                        <p><TbLogout2 className='text-3xl' /></p>
                        <span className="absolute z-20 left-full ml-2 px-2 py-1 text-sm text-color_base bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Salir
                        </span>
                    </button>
                </ul>
            </div>

            <div className=' flex-grow w-full '>
            <ProductsProvider>
                <Outlet/>
            </ProductsProvider>
            
            </div>

            
        </div>
    </div>
  )
}

export default VentasVendedor
