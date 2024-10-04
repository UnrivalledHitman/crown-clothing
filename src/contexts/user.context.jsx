import { createContext, useState, useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

import PropTypes from "prop-types";

// Create the UserContext with default values
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// UserProvider component to manage the context state
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user );
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Add prop validation for UserProvider
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
