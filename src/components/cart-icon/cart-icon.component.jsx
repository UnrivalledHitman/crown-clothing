import { useContext } from "react";
import shoppingBag from "/cart-icon/shopping-bag.svg"; // Import the SVG as an image
import { CartContext } from "../../contexts/cart.context";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      {/* Use img tag to display the SVG image */}
      <img src={shoppingBag} className="shopping-icon" alt="Shopping Icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
