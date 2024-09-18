import { CloseRounded } from "@mui/icons-material";
import React, { useState } from "react";

const EditProduct = ({ product, isOpen, setIsOpen, handleUpdateProduct }) => {
  const [formData, setFormData] = useState({
    oldImageId: product?.imagen?._id || null,
    imagen: null,
    nombre: product?.nombre || "",
    descripcion: product?.descripcion || "",
    categoria: product?.categoria || "",
    seccion: product?.seccion || "",
    cantidad: product?.stock || "",
    precio: product?.precio || "",
    stock_bajo: product?.stock_bajo || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataEdit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataEdit.append(key, formData[key]);
    });
    handleUpdateProduct(formDataEdit);
  };

  const [base64Image, setBase64Image] = useState(
    product.imagen
      ? `data:${product.imagen?.contentType};base64,${product.imagen?.data}`
      : null
  );
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setBase64Image(null);
      setFormData({ ...formData, imagen: selectedFile });
    } else {
      alert("Please upload an image file");
    }
  };

  return (
    isOpen && (
      <div className="z-20 fixed min-h-screen h-full   inset-0 right-0 bg-gray-800 bg-opacity-30 backdrop-blur-sm flex justify-center items-center pb-5">
        <div
          className={`${
            isOpen ? "scale-100 opacity-100 " : "scale-95 opacity-0"
          } bg-white h-full md:w-1/2 w-full rounded-lg flex flex-col justify-center items-start gap-5 overflow-auto shadow-lg transform transition-transform duration-700 p-10 overflow-y-auto`}
        >
          <button
            onClick={setIsOpen}
            className="absolute top-3 right-2 text-black hover:text-red-600"
          >
            <CloseRounded />
          </button>
          <h2 className="text-xl font-bold">Editar Producto</h2>
          <form onSubmit={handleSubmit} className="w-full h-full pb-20 ">
            <div className="flex gap-5 items-center">
              <div className="bg-green-500 text-white font-medium p-2 rounded-lg">
                <label className="cursor-pointer flex">
                  <input
                    type="file"
                    className="w-1"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <p className="bg-green-500 -translate-x-1">
                    {file || base64Image ? "Cambiar imagen" : "Agregar imagen"}
                  </p>
                </label>
              </div>

              {base64Image ? (
                <div className="max-w-1/4 h-[200px] rounded-lg border-2 border-gray-500">
                  <img
                    src={base64Image}
                    alt="Base64"
                    className="w-full rounded-lg h-full object-cover"
                  />
                </div>
              ) : (
                <div className="p-2 w-2/3 max-h-[300px] overflow-hidden rounded-lg border-2 border-gray-500">
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Selected"
                      className="object-cover"
                    />
                  ) : (
                    <p>No hay imagen disponible</p>
                  )}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Nombre del producto</label>
            <input  name="nombre" type="text" value={formData.nombre} onChange={handleChange} className=" w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                  required/>
            </div>
            <div>
                  <label htmlFor="nombre" className="font-semibold">
                    Sección
                  </label>
                  <select
                    name="seccion"
                    onChange={handleChange}
                    value={formData.seccion}
                    className=" w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                    placeholder="cantidad"
                    required
                  >
                    <option value="papeleria">Papeleria</option>
                    <option  value="regalos">
                      Regalos
                    </option>
                  </select>
                </div>
            
            {[
              { label: "Descripción", name: "descripcion", type: "text" },
              { label: "Categoría", name: "categoria", type: "text" },
              { label: "Cantidad", name: "cantidad", type: "number" },
              { label: "Precio", name: "precio", type: "number" },
              { label: "Stock bajo", name: "stock_bajo", type: "number" },
            ].map((field, idx) => (
              <div key={idx} className="mb-4 ">

                
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className=" w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                  required
                />
              </div>
            ))}
            <div className="flex items-center justify-end pb-5">
              <button
                type="submit"
                className="self-end py-2 px-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm bg-blue-500 text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={setIsOpen}
                className="ml-3 inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditProduct;

