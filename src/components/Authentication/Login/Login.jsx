import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider } from "../../../firebaseConfig"; // Ensure correct imports
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Import icons from react-icons

function Login() {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  // Email and Password login handler
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/master"); // Redirect to /master after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/master"); // Redirect to /master after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  // Facebook login handler
  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/master"); // Redirect to /master after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(to top left, orange, blue)' }}>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        
        {/* Email and Password Form */}
        <form onSubmit={handleEmailLogin} className="mb-4">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login with Email
          </button>
        </form>

        {/* Social Media Login Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            <FaGoogle className="mr-2" /> {/* Google Icon */}
            Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            <FaFacebook className="mr-2" /> {/* Facebook Icon */}
            Facebook
          </button>
        </div>
        <h4>Dont Have an account please <Link to={"/register"}>Register here</Link> </h4>
      </div>
    </div>
  );
}

export default Login;
