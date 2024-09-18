import { useState, createContext, useContext, useEffect } from "react";
import {
  AccountCircle,
  ShoppingCart,
  Assignment,
  MonetizationOn,
  Storefront,
  ExitToApp,
  MenuOpen,
  MenuTwoTone,
  Inventory,
  Inventory2Rounded,
  LocalLaundryServiceSharp,
  SignalWifiConnectedNoInternet4,
  LocalPrintshopRounded,
  Report,
  AssessmentRounded,
  Home,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Users from "../../Services/UsersServices";

const SidebarContext = createContext();

function SidebarItem({ icon, text }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li className="relative group flex items-center p-2 hover:bg-white rounded">
      {icon}
      <span className={`ml-4 transition-all ${expanded ? "block" : "hidden"}`}>
        {text}
      </span>
      <span
        className={`ml-4 transition-all ${
          !expanded ? "block" : "hidden"
        } absolute left-full ml-2 px-2 py-1 text-sm text-color_base bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        {text}
      </span>
    </li>
  );
}

export default function Menu({ children }) {
  const { setIsAuth } = useContext(AuthContext);
  const ruta = useLocation();

  const LoggedUser = new Users();
  // cerrr sesion
  const handleLogout = () => {
    setIsAuth(false);
    LoggedUser.logOut();
  };

  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    }
    // Agregar el event listener para el cambio en el tamaño de la pantalla
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  return (
    <aside
      className={`h-full bg-gray-100  overflow-y-auto overflow-x-hidden border-r-2 shadow-sm shadow-gray-100 ${
        expanded ? "w-48  " : "w-15  "
      }`}
    >
      <nav className=" sticky top-0 bottom-0 h-full overflow-hidden ">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://ideogram.ai/assets/image/lossless/response/WRZ_pJoCTHqWPWLKNDRSoQ"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 "
          >
            {expanded ? <MenuOpen /> : <MenuTwoTone />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="h-full  overflow-auto flex-1 flex flex-col gap-3 px-3">
            <Link
              to={"/administrador"}
              className={
                ruta.pathname === "/administrador" &&
                "bg-gray-300 rounded font-bold"
              }
            >
              <SidebarItem icon={<Home />} text="Inicio" />
            </Link>
            <Link
              to={"/administrador/usuarios"}
              className={
                ruta.pathname === "/administrador/usuarios" &&
                "bg-gray-300 rounded font-bold"
              }
            >
              <SidebarItem icon={<AccountCircle />} text="Usuarios" />
            </Link>
            <Link
              to={"/administrador/ventas/productos"}
              className={
                ruta.pathname.includes("/administrador/ventas") &&
                "bg-gray-300 rounded font-bold"
              }
            >
              <SidebarItem icon={<ShoppingCart />} text="Ventas" />
            </Link>
            <Link
              to="/administrador/gastos"
              className={
                ruta.pathname === "/administrador/gastos" &&
                "bg-gray-300 rounded font-bold"
              }
            >
              <SidebarItem icon={<MonetizationOn />} text="Gastos" />
            </Link>
            <Link
              to="/administrador/inventario"
              className={
                ruta.pathname === "/administrador/inventario" &&
                "bg-gray-300 rounded font-bold"
              }
            >
              <SidebarItem icon={<Inventory2Rounded />} text="Inventario" />
            </Link>
            <Link
              to={"/administrador/surtir"}
              className={
                ruta.pathname === "/administrador/surtir" &&
                "bg-gray-300 rounded font-bold"
              }
            >
              <SidebarItem icon={<Storefront />} text="Surtir" />
            </Link>

            {/* <Link to={"/administrador/servicios"} className={ ruta.pathname ==="/administrador/servicios" && "bg-gray-300 rounded font-bold" }>
              <SidebarItem icon={<LocalPrintshopRounded />} text="Servicios" />
            </Link> */}
            <Link
              to={"/administrador/reporte"}
              className={
                ruta.pathname === "/administrador/reporte" &&
                "bg-gray-300 rounded font-bold"
              }
            >
              <SidebarItem icon={<AssessmentRounded />} text="Reportes" />
            </Link>
            

            {/* <SidebarItem
              icon={<AssessmentRounded />}
              text="Reportes"
              className={
                ruta.pathname === "/administrador/reportes" &&
                "bg-gray-300 rounded font-bold"
              }
            /> */}

            <button
              onClick={handleLogout}
              className=" absolute bottom-0 left-0 rounded right-0 m-3  bg-red-500"
            >
              <li className="relative group font-bold flex items-center p-2 hover:bg-red-600 hover:text-white rounded">
              <ExitToApp />
                <span
                  className={`ml-4 transition-all ${
                    expanded ? "block" : "hidden"
                  }`}
                >
                  Salir
                </span>
                <span
                  className={`ml-4 transition-all ${
                    !expanded ? "block" : "hidden"
                  } absolute left-full ml-2 px-2 py-1 text-sm text-color_base bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  Salir
                </span>
              </li>
              
            </button>
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}
