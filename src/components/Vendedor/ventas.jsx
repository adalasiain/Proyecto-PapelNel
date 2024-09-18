
import React, { useState } from 'react';

const ProductCard = ({ product, addToCart }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
    <div className="relative">
      <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
      <div className="absolute top-0 right-0 bg-yellow-400 text-gray-800 font-bold py-1 px-3 rounded-bl-lg">
        Nuevo
      </div>
    </div>
    <div className="p-5">
      <h3 className="font-bold text-2xl mb-2 text-gray-800">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-3xl font-extrabold text-indigo-600">${product.price}</span>
        <button 
          onClick={() => addToCart(product)}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Añadir
        </button>
      </div>
    </div>
  </div>
);

const CartItem = ({ item, updateQuantity, removeFromCart }) => (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
        <div className="flex items-center mt-1">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
            </svg>
          </button>
          <span className="mx-2 text-sm">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-600">${item.price.toFixed(2)} c/u</p>
        <p className="text-sm font-medium text-gray-800">Total: ${(item.price * item.quantity).toFixed(2)}</p>
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-xs text-red-500 hover:text-red-700 mt-1"
        >
          Eliminar
        </button>
      </div>
    </div>
  );

const VentasPrueba = () => {
  const [products] = useState([
    { id: 1, name: "Smartphone XYZ", price: 599.99, description: "Último modelo con cámara de alta resolución", image: "url_imagen_1" },
    { id: 2, name: "Laptop UltraSlim", price: 999.99, description: "Potente y ligera para profesionales", image: "url_imagen_2" },
    { id: 3, name: "Auriculares NoiseCancel", price: 199.99, description: "Cancelación de ruido premium", image: "url_imagen_3" },
    // Añade más productos aquí
  ]);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const totalSales = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            TechVentas Pro
          </h1>
          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 px-4 rounded-full shadow-lg">
            Ventas: ${totalSales.toFixed(2)}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <h2 className="text-4xl font-extrabold text-white mb-8 shadow-text">Catálogo de Productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-6 sticky top-24">
              <h2 className="text-3xl font-bold mb-6 text-indigo-800">Carrito de Venta</h2>
              <div className="max-h-96 overflow-y-auto mb-6 pr-2 space-y-3">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
                ))}
              </div>
              <div className="mt-6 text-2xl font-bold text-indigo-800">
                Total: ${totalSales.toFixed(2)}
              </div>
              <button className="mt-6 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-xl hover:from-green-500 hover:to-blue-600 transition duration-300 font-bold text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
                Finalizar Venta
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl">&copy; 2024 TechVentas Pro. Potenciando tus ventas con tecnología.</p>
        </div>
      </footer>
    </div>
  );
};

export default VentasPrueba;