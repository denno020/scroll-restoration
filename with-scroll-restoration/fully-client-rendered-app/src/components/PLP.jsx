import React from "react";
import { useHistory } from 'react-router-dom';
import ProductCard from "./ProductCard";

import { allProducts } from "../products.js";

const PLP = () => {
  const [products, setProducts] = React.useState([]);
  const restorationRef = React.useRef(null);
  const history = useHistory();

  React.useEffect(() => {
    // Simulate an async network request
    const timeoutId = setTimeout(() => {
      setProducts(allProducts);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [allProducts])

  const [productMarkerId] = React.useState(() => {
    // History action will be POP when a user is "moving back" to a page. Alternative will be "PUSH"
    if (history.action !== 'POP') {
      return null;
    }

    // Reading in a callback to ensure we only query sessionStorage once, even after a re-render
    const persistedId = sessionStorage.getItem(
      "scroll-position-product-id-marker"
    );

    sessionStorage.removeItem("scroll-position-product-id-marker");

    return persistedId ? persistedId : null;
  });

  const persistScrollPosition = (id) => {
    // Use sessionStorage in place of global state management
    sessionStorage.setItem("scroll-position-product-id-marker", id);
  };

  if (products.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <ul className="products">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            onSelect={persistScrollPosition}
            restorationRef={Number(productMarkerId) === product.id ? restorationRef : null}
          />
        </li>
      ))}
    </ul>
  );
};

export default PLP;
