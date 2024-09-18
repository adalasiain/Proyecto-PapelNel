import { useState } from "react";
import Users from "../../../Services/UsersServices";
import Swal from "sweetalert2";

const AddUsers = ({ isOpen, setIsOpen, setAddedUser }) => {
  const newUser = new Users();

  var initialData = {
    nombre: "",
    telefono: 0,
    usuario: "",
    contraseña: "",
  };
  const [userData, setUserData] = useState(initialData);
  const [userError, setUserError] = useState();
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setUserData(initialData);
    setAddedUser(false);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await newUser.addUsers(userData);

      if (response.error) {
        setUserError(response.error);
      } else {
        setIsOpen(false);
        setAddedUser(true);
        setUserData(initialData)
        Swal.fire({
          title: "¡Guardado!",
          text: `El usuario fue creado con éxito`,
          icon: "success",
        });
      }
    } catch (error) {
      setUserError("Error al agregar usuario");
      console.error("Error en handleSubmit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "fixed translate-y-0 opacity-100" : "hidden translate-y-10 opacity-0"
      } transform transition-transform duration-700 ease-in-out inset-0 bg-gray-800 bg-opacity-30 flex justify-center items-center w-screen h-screen backdrop-blur-sm`}
    >
      <div className="bg-white rounded-lg overflow-hidden m-5 md:w-1/2 lg:w-1/3 w-full">
        <h3 className="text-2xl mb-4 mt-3 text-center leading-6 font-bold text-gray-900">
          Agregar Nuevo Usuario
        </h3>

        <div className="m-6">
          {userError && (
            <div className="bg-red-500 border border-red-800 rounded-lg p-2 text-color_base">
              {userError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-lg font-semibold">
                Nombre
              </label>
              <input
                name="nombre"
                onChange={handleChange}
                value={userData.nombre}
                type="text"
                className="w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="telefono" className="block text-lg font-semibold">
                Teléfono
              </label>
              <input
                type="number"
                name="telefono"
                onChange={handleChange}
                value={userData.telefono}
                className="w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="usuario" className="block text-lg font-semibold">
                Usuario
              </label>
              <input
                type="text"
                name="usuario"
                onChange={handleChange}
                value={userData.usuario}
                className="w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="contraseña" className="block text-lg font-semibold">
                Contraseña
              </label>
              <input
                type="password"
                name="contraseña"
                onChange={handleChange}
                value={userData.contraseña}
                className="w-full px-3 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2"
                required
              />
            </div>
            <div className="flex justify-end">
              {loading ? (
                <div className="flex items-center gap-2">
                  <p className="mr-2">Guardando...</p>
                  <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  >
                    Agregar
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;

