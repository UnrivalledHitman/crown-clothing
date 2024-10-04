import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss"

const Authentication = () => {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    console.error("Error signing in with Google Popup:", error.message);
  };

  return (
    <div className="authentication-container">
      <SignInForm onGoogleSignIn={logGoogleUser} />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
