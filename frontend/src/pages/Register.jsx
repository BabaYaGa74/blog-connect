import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        name,
        username,
        email,
        password,
      });
      setName(res.data.result.username);
      setUsername(res.data.result.username);
      setEmail(res.data.result.email);
      setPassword(res.data.result.password);
      setError(false);
      setTimeout(() => {
        toast.success("Registered successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          theme: "dark",
        });
      }, 100);
      navigate("/login");
    } catch (err) {
      setError(true);
      console.log(err);
      toast.error("Unable to register!", {
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
          <Link to="/login">Login</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] bg-gray-900">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left text-white">
            Create an account
          </h1>
          <input
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 text-white border-2 border-white outline-0 focus:bg-gray-200 focus:text-black"
            type="text"
            placeholder="Enter Name"
          />
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 text-white border-2 border-white outline-0 focus:bg-gray-200 focus:text-black"
            type="text"
            placeholder="Enter Username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 text-white border-2 border-white outline-0 focus:bg-gray-200 focus:text-black"
            type="text"
            placeholder="Enter Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 text-white border-2 border-white outline-0 focus:bg-gray-200 focus:text-black"
            type="password"
            placeholder="Enter Password"
          />
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-300 hover:text-black "
          >
            Register
          </button>
          {error && <h3 className="text-red-500 text-sm ">Enter valid data</h3>}
          <div className="flex justify-center items-center space-x-3 text-white">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-orange-100">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
