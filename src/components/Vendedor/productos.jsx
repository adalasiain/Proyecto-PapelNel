import React, { useState } from "react";
import { useProductsContext } from "../../context/productsContext";
import Sales from "../../Services/SalesServces";
import { AddRounded, SearchRounded } from "@mui/icons-material";

const ProductCard = ({ product, addToCart }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 ">
    <div className="relative">
      <img
        src={
          product.imagen
            ? `data:${product.imagen?.contentType};base64,${product.imagen?.data}`
            : "https://cdn.icon-icons.com/icons2/20/PNG/256/business_inventory_maintenance_product_box_boxes_2326.png"
        }
        alt={product?.imagen?.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <div className="absolute top-0 right-0 bg-yellow-400 text-gray-800 font-bold py-1 px-3 rounded-bl-lg">
        Nuevo
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-medium text-gray-800 mb-2">
        {product.nombre}
      </h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.descripcion}</p>
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold text-gray-800">
          ${product?.precio?.toFixed(2)}
        </span>
        <span
          className={`text-sm ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.stock > 0 ? `Stock: ${product.stock}` : "Agotado"}
        </span>
      </div>
      <button 
      onClick={() => addToCart(product)}
      className={`w-full bg-blue-500 text-white px-3 py-2 rounded-full text-sm hover:bg-blue-600 transition duration-300 ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={product.stock === 0}
    >
      {product.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
    </button>
    </div>
  </div>
);

const ListProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // usa el contexto de productos
  const { products, isLoading } = useProductsContext();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex-grow  overflow-y-auto">
      <div className=" w-full py-4 px-2 shadow-lg sticky top-0 bg-white">
        <div className="flex relative gap-4">
          <i className=" absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            <SearchRounded />
          </i>
          <input
            type="text"
            placeholder="Buscar Productos..."
            className="flex-grow pl-10 w-auto px-3 py-2 border  rounded-full focus:border-color_base  focus:outline-none focus:ring-2"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="mt-4 space-y-4 p-4">
        {isLoading ? (
          <h1>Cargando...</h1>
        ) : (
          products
            .filter((product) =>
              product?.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <div
                key={product?._id}
                className="bg-white shadow-md rounded-lg p-4 flex items-center"
              >
                <ProductCard product={product} />
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default ListProducts;
