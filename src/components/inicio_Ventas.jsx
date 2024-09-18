import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Users from '../Services/UsersServices';
import { AuthContext } from '../context/authContext';

const Inicio_Ventas = () => {

  const productos=[
    {nombre:"lapicero"},
    {nombre:"fdfdfdfdf"},
    {nombre:"fdfdfdfdf"},
    {nombre:"fdfdfdfdf"},
    {nombre:"fdfdfdfdf"},
    
  ]

  

  const [searchProduct, setSearchProduct] =useState()

  const [filteredProducts, setFilterdProducts] =useState([])

  const handleSearch=()=>{
   
    const productsfilter= productos.filter(producto=>producto.nombre===searchProduct)
      setFilterdProducts(productsfilter)
    
  }
  return (
    <div>
      <header className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-40"> 
        <Link to="#" className='hover:text-color_base'>Inicio</Link>
        <a href="#" className="hover:text-color_base">Ventas</a>
        <a href="#" className="hover:text-color_base">Gastos</a>
      </div>
      <div>
        <img src="./Logo.png" alt="" width="150" />
      </div>
      <div className="flex items-center space-x-40"> 
        <a href="#" className="hover:text-color_base">Surtir</a>
        <a href="#" className="hover:text-color_base">Corte_Caja</a>
        <button onClick={handleLogout} className="hover:text-color_base">
        Salir
        </button>
        <a href="#" ></a>
      </div>
    </header>

    <div className="container mx-auto py-8">
                <div className='flex'>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="Search products..." 
                    className="w-full px-4 py-2 rounded-lg border"
                    value={searchProduct}
                    onChange={e => setSearchProduct(e.target.value)}
                />
                <button onClick={handleSearch} className='rounded bg-blue-300'>buscar</button>
                

                </div>

               
                <div id="productList" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {filteredProducts.map((product, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow">
                            {product.nombre}
                        </div>
                    ))}
                </div>
            </div>
    </div>

  )
}

export default Inicio_Ventas


      