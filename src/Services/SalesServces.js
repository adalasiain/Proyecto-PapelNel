
import Cookies from "js-cookie";
const getCookie = (name) => {
    return Cookies.get(name);
  };

class Sales {
  constructor() {
    this.serverUri= "https://servidor-papelnet-1-zbzp.onrender.com"
    // this.serverUri= "http://localhost:5000"
    this.token=getCookie('token')
  }
  async createSale(products) {
    try {
      const response = await fetch(`${this.serverUri}/sales/addSale`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body:JSON.stringify(products)
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getSales() {
    try {
      const response = await fetch(`${this.serverUri}/sales`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Sales;
