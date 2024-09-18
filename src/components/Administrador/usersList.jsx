import { Edit, Delete, PersonAddAltRounded, SearchRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Users from "../../Services/UsersServices";
import AddUsers from "./forms/addUsers";

const newUser = new Users();



const UsersList = () => {

  const handleEditUser = async (user) => {
    const { value: formValues } = await Swal.fire({
      title: "<h3 class='text-2xl mb-4 mt-3 text-center font-bold text-gray-900'>Editar Usuario</h3>",
      html: `
      <div class="p-4">
          <input id="swal-input1" class= "w-72 mt-3 px-2 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2" type="text" placeholder="Nombre" value="${user.nombre}">
          <input id="swal-input2" class= "w-72 mt-3 px-2 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2" type="text" placeholder="Usuario" value="${user.usuario}">
          <input id="swal-input3" class= "w-72 mt-3 px-2 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2" type="password" placeholder="Contraseña" value="${user.password}">
          <input id="swal-input4" class= "w-72 mt-3 px-2 py-2 border rounded-full focus:border-color_base focus:outline-none focus:ring-2 focus:ring-offset-2" type="tel" placeholder="Teléfono" value="${user.telefono}">
        </div>
        `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Enviar",
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
        ];
      },
    });
  
    if (formValues) {
      const updatedUser = {
        ...user,
        nombre: formValues[0],
        usuario: formValues[1],
        password: formValues[2],
        telefono: formValues[3],
      };
  
      try {
        const response = await newUser.updateUser(updatedUser);
        if (response) {
          Swal.fire("Usuario actualizado", "", "success");
          getUsers(); // Actualizar la lista de usuarios
        } else {
          Swal.fire("Error al actualizar", "", "error");
        }
      } catch (error) {
        Swal.fire("Error al actualizar", error.message, "error");
      }
    }
  };
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [addedUser, setAddedUser] = useState(false);

  const handleDelete = async (user) => {
    await Swal.fire({
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
          
          Swal.fire({
            title: "Eliminando...",
            text: "Espere mientras se elimina el usuario.",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          await newUser.deleteUser(user._id.toString());
          getUsers()
          // Operación completada con éxito
          Swal.fire({
            title: "¡Eliminado!",
            text: `${user.nombre} fue eliminado`,
            icon: "success",
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

  const handleAddedUser = (data) => {
    if (data) {
      setAddedUser(true);
      getUsers();
    }
  };

  const handleAddUser = () => {
    openModal ? setOpenModal(false) : setOpenModal(true);
  };

  async function getUsers() {
    const users = await newUser.getUsers();
    setUsers(users.reverse());
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="mb-5 flex justify-between  border-b-2 flex-col lg:flex-row gap-2 sticky top-0 bg-white px-2 py-4 ">
        <div className="flex items-center gap-2 justify-between md:justify-normal">
          <h1 className="text-4xl font-bold text-center">Usuarios</h1>
          <button
            className="self-end rounded-xl flex items-center px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleAddUser}
          >
            <PersonAddAltRounded className="mr-2" />
            Nuevo Usuario
          </button>
        </div>
       
        <div className="flex gap-1 border-2 rounded-full p-1">
          <input
            name="nombre"
            type="text"
            className="flex-grow w-auto px-3 py-2 border rounded-r rounded-full focus:border-color_base focus:outline-none focus:ring-2"
            placeholder="Buscar usuario"
            required
          />
          <button className="self-end rounded-full rounded-l flex items-center px-4 py-2 bg-green-500 text-white hover:bg-green-600">
            <SearchRounded />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto px-8">
        {
      !users.length
              ? 
              <div className="flex flex-col items-center justify-center p-3">
              <img className="h-16" src="/EllipsisLoader.svg" alt=""  />
              <p className="font-bold">cargando la lista de usuarios</p>
            </div>
              : 
        <table className="w-full text-sm text-left text-gray-500  border-collapse bg-white shadow-lg rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>

            <th
                scope="col"
                className="px-3 sm:px-6 py-3 border-b border-gray-300 "
              >
                Nombre
              </th>
              <th
                scope="col"
                className="hidden sm:block px-3 sm:px-6 py-3 border-b border-gray-300 "
              >
                Usuario
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-3 border-b border-gray-300 "
              >
                Rol
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-3 border-b border-gray-300"
              >
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-white border-b d hover:bg-gray-50 "
                  >
                    <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.nombre}
                      <p className="font-bold sm:hidden">{user.usuario}</p>
                    </td>
                    <td className=" hidden sm:block px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {user.usuario}
                    </td>
                    <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.rol}
                    </td>


                    <td className="px-3 sm:px-6 py-4">
                      <button
                        className="mr-2 text-blue-500  hover:text-blue-700"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit />
                      </button>
                      <button
                        className="text-red-500  hover:text-red-700"
                        onClick={() => handleDelete(user)}
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>}
      </div>

      {/* formulario para agregar un nuevo usuario */}
      <AddUsers
        isOpen={openModal}
        setIsOpen={handleAddUser}
        setAddedUser={handleAddedUser}
      />
    </div>
  );
};

export default UsersList;
