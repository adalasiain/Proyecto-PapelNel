import { CloseRounded } from "@mui/icons-material";
import Products from "../../../Services/ProductsService";
import { useState } from "react";
const AddProducts = ({ isOpen, setIsOpen, setAddedProduct }) => {
  const newProducts = new Products();
  var initialData = {
    imagen: null,
    nombre: "",
    descripcion: "",
    categoria: "",
    stock_bajo: null,
    seccion: "",
    precio: null,
    cantidad: null,
  };

  const [productData, setProductData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    setAddedProduct(formData)
    
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setProductData({ ...productData, imagen: selectedFile });
    } else {
      alert("Please upload an image file");
    }
  };

  return (
    isOpen && (
      <div className="z-20 fixed overflow-y-auto inset-0 bg-gray-800 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div
          className={`${
            isOpen ? "scale-100 opacity-100 " : "scale-95 opacity-0"
          }
                 bg-white p-5  md:w-1/2 w-full rounded-lg flex flex-col justify-center items-start gap-5 relative mx-4 overflow-auto shadow-lg transform transition-transform scale-95 opacity-0 duration-700 px-10 `}
        >
          <button
            onClick={handleCloseClick}
            className="absolute top-2 right-2 text-black hover:text-red-600"
          >
            <CloseRounded />
          </button>

          <h2 className="text-2xl font-bold ">Nuevo Producto</h2>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex gap-5 items-center">
                <div className="bg-green-500 text-white font-medium p-2 rounded-lg ">
                  <label className="cursor-pointer flex">
                    <input
                      type="file"
                      className="w-1"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <p className="bg-green-500 -translate-x-1">
                      {file ? "Cambiar imagen" : "Agregar imagen"}
                    </p>
                  </label>
                </div>

                {file && (
                  <div className=" w-1/4 h-[100px] rounded-lg border-2 border-gray-500">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Selected"
                      className=" w-fit rounded-lg h-full "
                    />
                  </div>
                )}
              </div>

              <label htmlFor="nombre" className=" font-semibold">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                onChange={handleChange}
                value={productData.nombre}
                className=" w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                placeholder="Nombre del Producto"
                required
              />
              <label htmlFor="nombre" className="font-semibold">
                Descripción
              </label>
              <input
                type="text"
                id="nombre"
                name="descripcion"
                onChange={handleChange}
                value={productData.descripcion}
                className=" text-wrap w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                placeholder="descripción del producto"
                required
              />
              <label htmlFor="nombre" className="font-semibold">
                Categoria
              </label>
              <input
                type="text"
                id="nom"
                name="categoria"
                onChange={handleChange}
                value={productData.categoria}
                className=" w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                placeholder="Categoria del producto"
                required
              />
              <div className="flex gap-3">
                <div>
                  <label htmlFor="nombre" className="font-semibold">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    id="nombre"
                    name="cantidad"
                    min={1}
                    onChange={handleChange}
                    value={productData.cantidad}
                    className=" w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                    placeholder="cantidad"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nombre" className="font-semibold">
                    Precio
                  </label>
                  <input
                    type="number"
                    id="nombre"
                    name="precio"
                    min="0"
                    step="0.01"
                    onChange={handleChange}
                    value={productData.precio}
                    className=" w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                    placeholder="Precio unitario"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <label htmlFor="nombre" className="font-semibold">
                    Sección
                  </label>
                  <select
                    name="seccion"
                    onChange={handleChange}
                    value={productData.seccion}
                    className=" w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                    placeholder="cantidad"
                    required
                  >
                    <option value="">Elige una opción</option>
                    <option value="papeleria">Papeleria</option>
                    <option className="" value="regalos">
                      Regalos
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="nombre" className="font-semibold">
                    Stock Bajo
                  </label>
                  <input
                    type="number"
                    name="stock_bajo"
                    min="0"
                    onChange={handleChange}
                    value={productData.stock_bajo}
                    className=" w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                    placeholder="Define el stock bajo"
                    required
                  />
                </div>
              </div>
              <div></div>
                <button
                  type="submit"
                  className="self-end mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-500 text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                >
                  Guardar
                </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default AddProducts;
