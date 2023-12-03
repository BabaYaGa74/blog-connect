import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { getUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post(
        URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      getUser();
      setTimeout(() => {
        toast.success("Logged in successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          theme: "dark",
        });
      }, 100);
      navigate("/");
    } catch (err) {
      setError(true);
      toast.error("Invalid Credentials!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        theme: "dark",
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-950">
        <h1 className="text-lg md:text-xl font-extrabold text-orange-600">
          <Link to="/">Blog Connect</Link>
        </h1>
        <h3 className="text-orange-600">
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] bg-gray-900">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left text-white">
            Log in to your account
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 text-white border-2 border-white outline-0 focus:bg-gray-200 focus:text-black "
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 text-white border-2 border-white outline-0 focus:bg-gray-200 focus:text-black"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black "
          >
            Log in
          </button>
          {error && (
            <h3 className="text-red-500 text-sm ">
              Please enter correct username or password
            </h3>
          )}
          <div className="flex justify-center items-center space-x-3 text-white">
            <p>New here?</p>
            <p className="text-gray-500 hover:text-orange-100">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
