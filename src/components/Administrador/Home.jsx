import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import Users from "../../Services/UsersServices";
import { useNavigate } from "react-router-dom";
import Menu from "./menu";

import { Outlet } from "react-router-dom";
import { ProductsProvider } from "../../context/productsContext";

const Home = () => {
  const newUser = new Users();

  const navegar = useNavigate();
  const { setUser, setIsAuth, isAuth, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuth && !isLoading) {
      navegar(`/`);
    }
  });

  useEffect(() => {
    const getUser = async () => {
      const user = await newUser.Profile();

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
    <div >
      {isLoading ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center p-3">
          <p>Iniciando Sesion Activa</p>
          <div className="flex justify-center p-3">
              <img className="h-20" src="/loader.svg" alt=""  />
            </div>
        </div>
      ) : (
        
          <div className="flex h-screen overflow-hidden w-screen ">
            <div className="w-auto ">
              <Menu />
            </div>
            <div className="flex-grow overflow-y-auto">
              <ProductsProvider>
                <Outlet/>
              </ProductsProvider>
            </div>
          </div>

      )}
    </div>
  );
};

export default Home;
