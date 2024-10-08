// PrivateRoute.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig"; // Import your Firebase config

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // If user is not authenticated, redirect to login
        navigate("/master");
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [navigate]);

  return children; // Render children if authenticated
};

export default PrivateRoute;
