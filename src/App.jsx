import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Gastos from "./components/Gastos";
import Inventario from "./components/Administrador/Inventario";

import Home from "./components/Administrador/Home";
import UsersList from "./components/Administrador/usersList";
import VentasAdmin from "./components/Administrador/ventasAdmin";
import Ventas from "./components/Administrador/Ventas";
import Inicio_Ventas from "./components/inicio_Ventas";
import VentasVendedor from "./components/Vendedor/ventas_dos";

import Prueba from "./components/Vendedor/cobro";
import Servicio from "./components/Vendedor/servicios";
import ServiciosAdmin from "./components/Administrador/servicios";
import ListProducts from "./components/Vendedor/productos";
import SurtirProductos from "./components/Administrador/surtirProductos";
import Dashboard from "./components/Administrador/Inicio";
import VentasPrueba from "./components/Vendedor/ventas";
import VentasProductos from "./components/Administrador/ventasProductos";
import SalesDashboard from "./components/SalesDashboard";
import Reporte from "./components/Administrador/reporte";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sales" element={<SalesDashboard/>} />

      
        {/* rutas para los usuarios */}
        <Route path="/vendedor" element={<VentasVendedor />}>
          <Route path="ventas3" element={<Ventas />} />
          <Route path="ventas" element={<Prueba />} />
          
          <Route path="servicios" element={<Servicio />} />
          <Route path="productos" element={<ListProducts />} />
        </Route>
        <Route path="/vendedor/ventas2" element={<VentasPrueba />} />
      

      {/* Rutas para el Admin */}
      <Route path="/administrador" element={<Home />}>
      <Route path="" element={<Dashboard />} />
        <Route path="usuarios" element={<UsersList />} />
        <Route path="ventas" element={<VentasAdmin />} >
        <Route path="productos" element={<VentasProductos />} />
        <Route path="servicios" element={<ServiciosAdmin />} />

          
        </Route>
        <Route path="gastos" element={<Gastos />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="servicios" element={<ServiciosAdmin/>} />
        <Route path="surtir" element={<SurtirProductos/>} />
        <Route path="reporte" element={<Reporte/>}/>
      </Route>
    </Routes>
  );
}

export default App;
