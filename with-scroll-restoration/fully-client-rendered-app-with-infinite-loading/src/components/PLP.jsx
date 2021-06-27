import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import ProductCard from "./ProductCard";

import { loadPage } from "../products.js";

const PLP = () => {
  const [products, setProducts] = React.useState([]);
  const restorationRef = React.useRef(null);
  const history = useHistory();
  const location = useLocation();
  const pageToLoad = location.search.replace('?page=', '');
  const pageNo = pageToLoad ? Number(pageToLoad) : 1;

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

  const persistScrollPosition = (id, pageNo) => {
    // Set the page value in the query string to match the page that the selected product is on
    history.replace(`?page=${pageNo}`);
    // Use sessionStorage in place of global state management
    sessionStorage.setItem("scroll-position-product-id-marker", id);
  };

  const loadNextPage = (nextPageNo) => {
    history.replace(`?page=${nextPageNo}`);
    // Simulate an async network request
    setTimeout(() => {
      const products = loadPage(nextPageNo);
      setProducts((prevProducts) => (
        [
          ...prevProducts,
          ...products.map(product => ({...product, pageNo: nextPageNo}))
        ]
      ));
    }, 300);
  }

  React.useEffect(() => {
    loadNextPage(pageNo);
  }, [])

  if (products.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <React.Fragment>
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
      {pageNo < 3 && (
        <button className="btn--load-more" type="button" onClick={() => loadNextPage(pageNo + 1)}>Load Next</button>
      )}
    </React.Fragment>
  );
};

export default PLP;
