import { createContext, useContext, useEffect, useState } from "react";
import Products from "../Services/ProductsService";

export const ProductsContext = createContext();


export const useProductsContext = () => {
    
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("ProductsContext deberia estar dentro de authProvider");
  }
  return context;
};

export const ProductsProvider = ({ children }) => { 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(true);
  const [currentProduct, setCurrentProduct] = useState(true);

  async function getProducts() {
    const productsServices = new Products();
    try {
      const products = await productsServices
      .getAllProducts();
  
      setProducts(products.reverse());
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)

    }

   
  }

  const addProduct= async (formData)=>{
    const productsServices = new Products();
    try {
        const response = await productsServices.addProducts(formData);
        if (response.productSaved) {
          setLoadingAdd(false);
        } else {
          setLoadingAdd(false);
        }
      } catch (error) {
        setLoadingAdd(false);
      }

  }


  useEffect(()=>{
    
    
        getProducts();
        
  },[])






  return (
    <ProductsContext.Provider
      value={{products, getProducts, isLoading}}
    >
      {children}
    </ProductsContext.Provider>
  );
};
