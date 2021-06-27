import React from "react";
import ProductCard from "./ProductCard";

import { allProducts } from "../products.js";

const PLP = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    // Simulate an async network request
    const timeoutId = setTimeout(() => {
      setProducts(allProducts);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [allProducts])

  if (products.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <ul className="products">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
};

export default PLP;
