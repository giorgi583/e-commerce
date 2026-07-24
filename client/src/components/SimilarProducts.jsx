import React, { useEffect } from 'react'
import Slider from './Slider'
const SimilarProducts = ({product}) => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = React.useState([]);

  const getProductsByCategory = async () => {
    console.log(product?.category);
console.log(`${apiURL}/products/categories/${product?.category}`);
        try {
        const response = await fetch(`${apiURL}/products/categories/${product?.category}`);
        const result = await response.json();
        console.log(result);
        const filteredProducts = result.products.filter((p) => p.id !== product.id);
        setProducts(filteredProducts);} 
        catch (error) {
            console.log(error);
        }
    }
    console.log(products);
    useEffect(() => {
       if (!product?.category) return;
        getProductsByCategory();
    }, [product?.category]);
  return (
      <div>
     <Slider title={'Similar Products'} data={products}/>
      </div>

  )
}

export default SimilarProducts