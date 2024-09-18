import { useEffect, useState } from "react";
import Users from "../Services/UsersServices";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { AccountCircle, Lock } from "@mui/icons-material";


const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    usuario: "",
    contraseña: "",
  });

  const [loading, setLoading] = useState(false);

  const { user, authErrors, setAuthErrors, isAuth, setIsAuth } = useAuthContext();

  useEffect(() => {
    if (isAuth) {
      navigate(`/${user.rol.toLowerCase()}`);
    }
  }, [isAuth, navigate, user.rol]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLogin = new Users();
    setLoading(true);

    const userLogged = await userLogin.login(userData);
    if ("token" in userLogged) {
      setLoading(false);
      setIsAuth(true)
      navigate(`/${userLogged.rol?.toLowerCase()}`);
    } else {
      setAuthErrors(userLogged.error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300 opacity-50 rounded-full "></div>
      <div className="absolute top-16 left-0 w-48 h-48 bg-blue-400 opacity-50 rounded-full"></div>
      <div className="absolute bottom-0 right-32 w-56 h-56 bg-green-300 opacity-50 rounded-full"></div>
      <div className="absolute bottom-16 left-24 w-40 h-40 bg-yellow-300 opacity-50 rounded-full animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-300 opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2 ">a</div>

      <div className="relative z-10 bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <img src="https://ideogram.ai/assets/image/lossless/response/WRZ_pJoCTHqWPWLKNDRSoQ" alt="PapelNet Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Iniciar Sesión</h2>
       
        {authErrors ? (
          <div className="bg-red-400 border border-red-200 rounded-lg p-2 text-white mb-4">
            {authErrors}
          </div>
        ) : (
          <div></div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <AccountCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              onChange={handleChange}
              value={userData.usuario}
              name="usuario"
              className="text-gray-900 w-full pl-10 pr-3 py-2 border rounded-md bg-white focus:border-blue-500 focus:outline-none"
              placeholder="Usuario"
              required
              type="text"
            />
          </div>
          <div className="mb-4 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              onChange={handleChange}
              value={userData.contraseña}
              name="contraseña"
              className="text-gray-900 w-full pl-10 pr-3 py-2 border rounded-md bg-white focus:border-blue-500 focus:outline-none"
              placeholder="Contraseña"
              required
              type="password"
            />
          </div>
          {loading ? (
            
            <div className="flex justify-center p-3">
              <img className=" h-16" src={"/loader.svg"} alt=""  />
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-center p-3">
            
          </div>
          

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:opacity-90"
            >
              ACCEDER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
