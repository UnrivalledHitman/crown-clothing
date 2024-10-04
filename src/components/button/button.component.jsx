import PropTypes from "prop-types";
import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType = "", ...otherProps }) => {
  const buttonClass = BUTTON_TYPE_CLASSES[buttonType] || "";
  return (
    <button className={`button-container ${buttonClass}`} {...otherProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  buttonType: PropTypes.oneOf(["google", "inverted"]),
  otherProps: PropTypes.object,
};

export default Button;
