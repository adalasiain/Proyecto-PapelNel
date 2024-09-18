import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { AiFillPrinter } from "react-icons/ai";
import { FaComputer } from "react-icons/fa6";
import { FaGift } from "react-icons/fa";
import {
  AddRounded,
  AttachMoneyRounded,
  CloseRounded,
  DeleteRounded,
  PlusOneRounded,
  RemoveRounded,
} from "@mui/icons-material";
import Sales from "../../Services/SalesServces";
import { useProductsContext } from "../../context/productsContext";
import { Link } from "react-router-dom";
// import { products } from './data'; // Suponiendo que tienes un archivo de datos con los productos

const CartItem = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) => (
  <div className="flex items-center justify-between py-1 border-b-2 border-blue-300 last:border-b-0">
    <div className="flex-1">
      <h3 className="text-sm font-medium text-gray-800">{item.nombre}</h3>
      <div className="flex items-center mt-1">
        <button
          onClick={decreaseQuantity}
          className="text-gray-500 hover:text-gray-700"
        >
          <RemoveRounded fontSize="small" />
        </button>
        <span className="mx-2  font-medium text-blue-500">{item.cantidad}</span>
        <button
          onClick={increaseQuantity}
          className={`text-gray-500 hover:text-gray-700 ${
            item?.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
          } `}
          disabled={item?.stock <= 0}
        >
          <AddRounded fontSize="small" />
        </button>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm text-gray-600">${item.precio.toFixed(2)} c/u</p>
      <p className="text-sm font-medium text-gray-800">
        Total: ${(item.precio * item.cantidad).toFixed(2)}
      </p>
      <button
        onClick={removeFromCart}
        className="text-xs text-red-500 hover:text-red-700 mt-1"
      >
        <DeleteRounded />
        Eliminar
      </button>
    </div>
  </div>
);

const ProductCard = ({ product, addToCart }) => (
  <div className="bg-gray-100 p-2 rounded-lg shadow-sm  transition-transform duration-300 transform  hover:scale-105 hover:shadow-xl z-0 ">
    <div className="relative  w-full flex items-center justify-center">
      <img
        src={
          product.imagen
            ? `data:${product.imagen?.contentType};base64,${product.imagen?.data}`
            : "https://cdn.icon-icons.com/icons2/20/PNG/256/business_inventory_maintenance_product_box_boxes_2326.png"
        }
        alt={product?.imagen?.name}
        className="w-32 h-32 object-cover rounded-md mb-4 self-center"
      />
      {product.stock<= product.stock_bajo &&
      <div className={`absolute  text-xs border top-0 right-0  ${product.stock=== 0 ?'bg-red-400 text-gray-50':'bg-yellow-400 text-gray-700'}    font-bold py-1 px-3 rounded-bl-lg`}>
        {product.stock=== 0 ?'Agotado':'stock bajo'}
      </div>}
      
    </div>
    <div className="px-4">
      <h3 className=" font-medium text-gray-800 mb-2 line-clamp-1">
        {product.nombre}
      </h3>
      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
        {product.descripcion}
      </p>
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-bold text-green-600">
          ${product?.precio?.toFixed(2)}
        </span>
        <span
          className={`text-sm font-semibold ${
            product.stock > 0 ? "text-blue-600" : "text-red-600"
          }`}
        >
          {product.stock > 0 ? `Stock: ${product.stock}` : "Agotado"}
        </span>
      </div>
      <button
        onClick={() => addToCart(product)}
        className={`w-full bg-blue-500 text-white font-bold px-3 py-2 rounded-full text-sm hover:bg-blue-600 transition duration-300 ${
          product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={product.stock === 0}
      >
        {product.stock > 0 ? "Agregar" : "Sin stock"}
      </button>
    </div>
  </div>
);

const Prueba = () => {
  // const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  // usa el contexto de productos
  const { products, isLoading } = useProductsContext();
  const salesService = new Sales();

  const payCart = async () => {
    const carrito = { productos: cart, total: totalPrice };
    await salesService.createSale(carrito);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const updateProductStock = (id, param) => {
    var stock;
    products.map((item) => {
      if (item._id === id) {
        item.stock = item.stock + param;
        stock = item?.stock;
      }
    });
    return stock;
  };

  const addToCart = (product) => {
    const stock = updateProductStock(product._id, -1);
    console.log(stock);

    const existingProduct = cart.find((item) => item.producto === product._id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.producto === product._id
            ? {
                ...item,
                stock: stock,
                cantidad: item.cantidad + 1,
                precio_total: item.precio * (item.cantidad + 1),
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          stock: stock,
          producto: product._id,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: 1,
          precio_total: product.precio,
        },
      ]);
    }
  };

  const removeFromCart = (productId) => {
    cart.map(
      (item) =>
        item.producto === productId &&
        updateProductStock(productId, item.cantidad)
    );
    setCart(cart.filter((item) => item.producto !== productId));
  };

  const increaseQuantity = (productId) => {
    const stock = updateProductStock(productId, -1);
    setCart(
      cart.map((item) =>
        item.producto === productId
          ? {
              ...item,
              stock,
              cantidad: item.cantidad + 1,
              precio_total: item.precio * (item.cantidad + 1),
            }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    const stock = updateProductStock(productId, 1);
    cart.map((item) =>
      item.producto === productId && item.cantidad > 1 ? stock : 0
    );

    setCart(
      cart.map((item) =>
        item.producto === productId && item.cantidad > 1
          ? {
              ...item,
              stock,
              cantidad: item.cantidad - 1,
              precio_total: item.precio * (item.cantidad - 1),
            }
          : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  return (
    <div className="flex h-screen overflow-hidden w-full">
      <div className="flex-grow  overflow-y-auto mb-20">
        <div className=" w-full py-4 px-2 shadow-lg sticky top-0 bg-white z-10 flex gap-2">
          <div className="flex items-center justify-between ">
            <nav>
              <ul className="flex items-center gap-x-1 p-1 rounded-full bg-white border-color_base border-2">
                <li className="flex items-center gap-x-2 font-bold  py-2 px-6 rounded-full hover:bg-color_base">
                  <a href="" className="flex">
                    <AiFillPrinter className="text-xl mr-1 " />
                    Productos
                  </a>
                </li>

                <li className="flex items-center gap-x-2 font-bold  py-2 px-6 rounded-full hover:bg-color_base">
                  <Link to={"/vendedor/servicios"} className="flex">
                    <FaComputer className="text-2xl mr-1" />
                    Servicios
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex relative gap-4">
            <i className=" absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <CiSearch />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter((product) =>
                  product?.nombre
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((product) => (
                  <ProductCard
                    key={product?._id}
                    product={product}
                    addToCart={() => addToCart(product)}
                  />
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Parte 3 (20%) */}
      <div className="w-auto">
        <div className="w-72 bg-gray-100 bg-opacity-95  p-3 sticky top-24 self-center h-full">
          <h2 className="text-lg font-bold mb-4  text-indigo-800">
            Carrito de Venta de Productos
          </h2>
          <div className="  h-3/5  overflow-y-auto bg-white mb-4 p-2 space-y-3 shadow-inner ">
            {cart?.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increaseQuantity={() => increaseQuantity(item.producto)}
                decreaseQuantity={() => decreaseQuantity(item.producto)}
                removeFromCart={() => removeFromCart(item.producto)}
              />
            ))}
          </div>
          <div className=" text-xl font-bold text-indigo-800">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <button
            className="mt-2 w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 rounded-xl hover:from-green-600 hover:to-blue-700 transition duration-300 font-bold text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            onClick={payCart}
            disabled={cart.length === 0}
          >
            Finalizar Venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prueba;
