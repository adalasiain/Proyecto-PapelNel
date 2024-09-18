import { useEffect, useState } from "react";

import { Edit, Delete, Add, VisibilityRounded } from "@mui/icons-material";
import {
  FaBox,
  FaPencilAlt,
  FaGift,
  FaInfoCircle,
  FaArrowUp,
  FaSearch,
  FaMoon,
  FaSun,
  FaChartLine,
  FaDollarSign,
  FaTag,
} from "react-icons/fa";

import AddProducts from "./forms/addProducts";
import EditProduct from "./forms/EditProduct"; // Asegúrate de que la importación sea correcta
import Products from "../../Services/ProductsService";
import Swal from "sweetalert2";
import { useProductsContext } from "../../context/productsContext";

const Inventario = () => {
  const { products, getProducts, isLoading } = useProductsContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);


  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const newProducts = new Products();

  const getSectionIcon = (section) => {
    switch (section.toLowerCase()) {
      case "papeleria":
        return <FaPencilAlt className="mr-1" />;
      case "regalos":
        return <FaGift className="mr-1" />;
      default:
        return <FaBox className="mr-1" />;
    }
  };
  const lowStockItems = filteredProducts.filter(
    (item) => item.stock <= item.stock_bajo
  ).length;

  useEffect(() => {
    setSearch("");
    let filterProducts = products.filter(
      (product) => product.seccion === filter.toLowerCase()
    );
    setFilteredProducts(filterProducts);
    if (filter === "Todos" || filter === "") {
      setFilteredProducts(products);
    }
  }, [filter, products]);

  useEffect(() => {
    setFilter("");
    let searchProducts = products.filter((product) =>
      product.nombre.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(searchProducts);
  }, [search, products]);

  function handleFilter(e) {
    setFilter(e.target.value);
    setSearch("");
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const handleDelete = async (product) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "¡No, cancelar!",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Mostrar el loading spinner
          Swal.fire({
            title: "Eliminando...",
            text: "",
            html: ' <div class="flex flex-col justify-center items-center p-3 w-full col-span-3"><p class="font-bold">Espere mientras se elimina el producto</p><img class="h-32 " src="/deleteLoader.gif" alt=""  /></div> ',
            allowOutsideClick: false,
            showConfirmButton: false,
          });

          await newProducts.deleteProduct(product._id.toString());
          await getProducts();
          // Operación completada con éxito
          Swal.fire({
            title: "¡Eliminado!",
            text: `El producto ${product.nombre} fue eliminado`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
        } catch (error) {
          // Operación fallida
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong!",
          });
        }
      }
    });
  };


  const handleAddClick = (data) => {
    setShowAddModal(!showAddModal);
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);  
    setShowEditModal(true);  
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setCurrentProduct(null);
  };

  const handleAddedProduct = async (data) => {
    setShowAddModal(false);
    try {
      // Mostrar el loading spinner
      Swal.fire({
        title: "Guardando...",
        text: "",
        html: ' <div class="flex flex-col justify-center items-center p-3 w-full col-span-3"><p class="font-bold">Espere mientras se guarda el producto.</p><img class=" h-36" src="/addProductLoader.gif" alt=""  /></div> ',
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      const response = await newProducts.addProducts(data);
      await getProducts();
      if (response.productSaved) {
        setShowAddModal(false);
        Swal.fire({
          title: "¡Guardado!",
          text: `El producto fue guardado con exito`,
          icon: "success",
        });
      } else {
        setShowAddModal(false);
      }
    } catch (error) {
      setShowAddModal(false);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    setShowEditModal(false);
    try {
      // Mostrar el loading spinner
      Swal.fire({
        title: "Actualizando...",
        text: "",
        html: ' <div class="flex flex-col justify-center items-center p-3 w-full col-span-3"><p class="font-bold">Espere mientras se actualiza el producto.</p><img class="h-20 w-15" src="/updateLoader.svg" alt=""  /></div> ',

        allowOutsideClick: false,
        showConfirmButton: false,
      });
      await newProducts.editProducts(updatedProduct, currentProduct._id);
      await getProducts();
      // Operación completada con éxito
      Swal.fire({
        title: "¡Actualizado!",
        html: `El producto <b>${currentProduct.nombre}</b>
         fue actualizado`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      setCurrentProduct(null);
    } catch (error) {
      // Operación fallida
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="w-auto mx-auto bg-gray-100">
      <div className=" flex justify-between bg-gray-100 border-b-2 flex-col lg:flex-row gap-2 z-10 sticky top-0  px-2 py-4  ">
        <div className="flex items-center gap-2 justify-between md:justify-normal">
          <h1 className="text-4xl font-bold text-center">Inventario</h1>
          <button
            onClick={handleAddClick}
            className="self-end rounded-xl flex items-center px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            <Add />
            Nuevo Producto
          </button>
        </div>

        <div className="flex gap-1 border-2 rounded-full   p-1">
          <select
            value={filter}
            onChange={handleFilter}
            id=""
            className=" w-1/2 sm:w-auto px-3 py-2 border   rounded-3xl   focus:border-color_base focus:outline-none focus:ring-2"
          >
            <option defaultChecked value="">
              Filtrar por seccion
            </option>
            <option value="Papeleria">Papeleria</option>
            <option className="" value="Regalos">
              Regalos
            </option>
          </select>

          <input
            name="nombre"
            type="text"
            onChange={handleSearch}
            value={search}
            className="flex-grow  w-1/2 sm:w-auto px-3 py-2 border   rounded-full focus:border-color_base focus:outline-none focus:ring-2   "
            placeholder="buscar por nombre"
            required
          />
        </div>
      </div>

      <div className="flex p-3 py-4 space-x-5">
        <div
          className={`p-4 rounded-lg bg-purple-400 shadow-md flex items-center gap-6`}
        >
          <h2 className=" font-semibold ">Total Productos</h2>
          <p className="text-2xl font-bold">{filteredProducts.length}</p>
        </div>
        <div
          className={`px-4 rounded-lg bg-yellow-400 text-white shadow-md flex items-center gap-6`}
        >
          <h2 className="font-semibold ">Productos con Stock Bajo</h2>
          <p className="text-2xl font-bold">{lowStockItems}</p>
        </div>
      </div>

      <div className="w-full grid  sm:grid-cols-2 lg:grid-cols-3  px-5  gap-6  ">
        {filteredProducts.length === 0 ? (
          <div className="flex justify-center items-center p-3 w-full col-span-4">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center p-3 w-full col-span-3">
                <img className="h-16" src="/EllipsisLoader.svg" alt="" />

                <p className="font-bold">cargando productos ...</p>
              </div>
            ) : (
              <div className="w-full">
                <h2 className="text-1xl font-bold">
                  No hay productos relacionados con la busqueda
                </h2>
              </div>
            )}
          </div>
        ) : (
          filteredProducts?.map((product) => (
            <div key={product._id} className=" w-full  ">
              <div className=" z-0 flex flex-col overflow-hidden shadow-lg shadow-black/20 bg-white   rounded-lg p-4 ransition-transform duration-300 transform  hover:scale-105 hover:shadow-xl">
                <div className="relative h-48 w-full ">
                  <img
                    src={
                      product.imagen
                        ? `data:${product.imagen?.contentType};base64,${product.imagen?.data}`
                        : "/productPlaceholder.svg"
                    }
                    alt={product.imagen?.filename}
                    className="absolute h-full w-full  object-cover "
                  />
                  <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-2xl text-xs font-bold flex flex-col items-center">
                    <p className="text-gray-300">Sección:</p>{" "}
                    <div className="flex">
                      {getSectionIcon(product.seccion)}
                      {product.seccion}
                    </div>
                  </div>
                  {product.stock <= product.stock_bajo && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      Stock Bajo
                    </div>
                  )}
                </div>

                <div class=" py-4">
                  <div class="text-xl text-gray-800 font-semibold mb-2 flex items-center truncate">
                    <FaBox className="mr-2" />
                    {product.nombre}
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.descripcion}
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Categoría
                    </span>
                    <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                      {product.categoria}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Precio
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      ${product.precio.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Stock
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        false ? "text-red-500" : "text-blue-500"
                      }`}
                    >
                      {product.stock} unidades
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-4 flex items-center">
                    <FaInfoCircle className="mr-1" />
                    Ingresado el {product.fecha_ingreso}
                  </div>
                </div>
                <div class="px-6  pb-2 flex space-x-2 self-end">
                  
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    <Delete />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <AddProducts
        isOpen={showAddModal}
        setIsOpen={handleAddClick}
        setAddedProduct={handleAddedProduct}
      />

      {currentProduct && (
        <EditProduct
          product={currentProduct}
          isOpen={showEditModal}
          setIsOpen={handleCloseEdit}
          handleUpdateProduct={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default Inventario;
