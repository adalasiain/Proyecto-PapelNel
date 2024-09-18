


class Products {
  constructor(){
    this.serverUri= "https://servidor-papelnet-1-zbzp.onrender.com"
    // this.serverUri= "http://localhost:5000"
    this.products=[]
  }
    async getAllProducts() {
        try {
            const response = await fetch(
                `${this.serverUri}/products`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const data = await response.json();
            this.products=data
            return data;
        } catch (error) {
            console.log(error);
        }
    }

  

    async editProducts(product, productId) {
      console.log(productId)
      console.log(product)
        try {
            const response = await fetch(
                `${this.serverUri}/products/updtProduct/${productId}`,
                {
                    method: "PUT",
                    headers: {},
                    body: product
                }
            );
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    async reorderProduct(product, productId) {
      console.log(productId)
      console.log(product)
        try {
            const response = await fetch(
                `${this.serverUri}/products/reorderProduct/${productId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(product) 
                }
            );
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }
  
      async addProducts(product){
        console.log(product)
        try {
          const response = await fetch(
            `${this.serverUri}/products/addProduct`,
            {
              method: "POST",
              headers: {},

              body:product
            }
          );
          const data = await response.json();
          console.log(data)
            return data;
          
        } catch (error) {
          console.log(error);
        }
      }

    async deleteProduct(productId) {
        try {
            const response = await fetch(
                `${this.serverUri}/products/deleteProduct/` + productId,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default Products;
