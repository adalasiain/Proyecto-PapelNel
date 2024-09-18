import Cookies from "js-cookie";
const saveCookie = (name, value) => {
  Cookies.set(name, value, { expires: 1 });
};

const getCookie = (name) => {
  return Cookies.get(name);
};



const serverUri= "https://servidor-papelnet-1-zbzp.onrender.com"
  //  const serverUri= "http://localhost:5000"



class Users {
  constructor(usuario, contraseña) {
    this.usuario = usuario;
    this.contraseña = contraseña;
  }


  async getUsers(){
    try {
      const response = await fetch(
        `${serverUri}/users`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },    
        }
      );
      const data = await response.json();
        return data;
        
      
    } catch (error) {
      console.log(error);
    }
  }
  async deleteUser(userId){
    try {
      const response = await fetch(
        `${serverUri}/users/deleteUser/`+ userId,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          
        }
      );
      const data = await response.json();
      console.log(data)
        return data;
      
    } catch (error) {
      console.log(error);
    }
  }
  async updateUser(user) {
    try {
      const response = await fetch(
        `${serverUri}/users/updateUser/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addUsers(user){
    try {
      const response = await fetch(
        `${serverUri}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify(user)
        }
      );
      const data = await response.json();
      console.log(data)
        return data;
      
    } catch (error) {
      console.log(error);
    }
  }


  async login(user) {
    try {
      const response = await fetch(
        `${serverUri}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      if ("token" in data) {
        saveCookie("token", data.token);
        return data;
      } else {
        console.log(data)
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async Profile(user) {
    const token = getCookie("token");
    try {
      const response = await fetch(`${serverUri}/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(user),
      });
      const data = await response.json(); 
        return data;
     
    } catch (error) {
      console.log(error);
    }
  }

  logOut(){
    Cookies.remove('token');
  }
}

export default Users;
