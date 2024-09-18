import Cookies from "js-cookie";
const getCookie = (name) => {
    return Cookies.get(name);
  };


class Expense{
    constructor(){
        this.serverUri= "https://servidor-papelnet-1-zbzp.onrender.com"
        // this.serverUri= "http://localhost:5000"
        this.token=getCookie('token')
      }

    async addExpense(expenseData) {
        try {
          const response = await fetch(`${this.serverUri}/expenses/addExpense`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
              },
              body:JSON.stringify(expenseData)
          });
          const data = await response.json();
          console.log(data);
          return data;
        } catch (error) {
          console.log(error);
        }
      }
      async getAllExpences() {
        try {
          const response = await fetch(`${this.serverUri}/expenses`, {
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

export default Expense;