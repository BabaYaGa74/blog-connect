import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [posts, setPosts] = useState([{}]);
  const [updated, setUpdated] = useState(false);
  const { user, setUser } = useContext(UserContext);
  let pass = "";

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/user/" + user.userId);
      console.log(res.data.user);
      setName(res.data.user.name);
      setUsername(res.data.user.username);
      setEmail(res.data.user.email);
      setPassword(res.data.user.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/user/" + user.userId,
        { name, username, email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
      setTimeout(() => {
        toast.error("Failed to update user!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          theme: "dark",
        });
      }, 100);
      navigate("/");
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(URL + "/api/users/user/" + user.userId, {
        withCredentials: true,
      });
      setUser(null);
      setTimeout(() => {
        toast.success("User deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          theme: "dark",
        });
      }, 100);
      navigate("/");
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        toast.error("Cannot delete user!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          theme: "dark",
        });
      }, 100);
      navigate("/");
    }
  };
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/post/user/" + user.userId);
      setPosts(res.data.userPosts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px] flex md:flex-row flex-col-reverse md:items-start items-start bg-gray-900">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0 pb-5 ">
          <h1 className="text-xl font-bold mt-8 mb-4 text-white">
            Your posts:
          </h1>
          {posts != [{}]
            ? posts?.map((p) => (
                <Link to={`/posts/post/${p.postId}`}>
                  <ProfilePosts key={p.postId} p={p} />
                </Link>
              ))
            : "No post available."}
        </div>
        <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
          <div className=" flex flex-col space-y-4 mt-8 items-start border-2 p-5 bg-gray-950">
            <h1 className="text-xl font-bold mb-4 mt-3 text-white">Profile:</h1>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your email"
              type="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your password"
              type="password"
            />
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-slate-800 px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-slate-800 px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                User updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
