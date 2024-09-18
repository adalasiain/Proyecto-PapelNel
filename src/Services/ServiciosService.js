
import Cookies from "js-cookie";
const getCookie = (name) => {
    return Cookies.get(name);
  };


class Service{
    constructor(){
        this.serverUri= "https://servidor-papelnet-1-zbzp.onrender.com"
        // this.serverUri= "http://localhost:5000"
        this.token=getCookie('token')
      }

    async addServiceSale(serviceData) {
        try {
          const response = await fetch(`${this.serverUri}/services/sellService`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
              },
              body:JSON.stringify(serviceData)
          });
          const data = await response.json();
          console.log(data);
          return data;
        } catch (error) {
          console.log(error);
        }
      }
      async getAllServiceSale() {
        try {
          const response = await fetch(`${this.serverUri}/services`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
              },
          });
          const data = await response.json();
          console.log(data);
          return data;
        } catch (error) {
          console.log(error);
        }
      }
    
    

}

export default Service;