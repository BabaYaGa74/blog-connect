import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../url";
import axios from "axios";
import { toast } from "react-toastify";

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("UserId from Menu: ", user.userId);

  const handleLogout = async () => {
    try {
      await axios.post(URL + "/api/auth/logout", null, {
        withCredentials: true,
      });
      setUser(null);
      setTimeout(() => {
        toast.success("Logged out successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
      }, 100);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/login">Login</Link>
        </h3>
      )}
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/register">Register</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/profile/" + user.userId}>Profile</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/write">Write</Link>
        </h3>
      )}
      {user && (
        <h3
          onClick={handleLogout}
          className="text-white text-sm hover:text-gray-500 cursor-pointer"
        >
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;
