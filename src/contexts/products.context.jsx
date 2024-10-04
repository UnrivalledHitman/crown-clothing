import { createContext, useState } from "react";
import PropTypes from "prop-types";
import PRODUCTS from "../shop-data.json";

// Create the context with an initial state of an empty array
export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS || []);

  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

// Add prop validation for ProductsProvider
ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
