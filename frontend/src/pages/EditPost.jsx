import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/post/" + postId);
      console.log(res.data);
      setTitle(res.data.post.title);
      setDescription(res.data.post.description);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      description: description,
      username: user.username,
      userId: user.userId,
      category: "tech",
    };

    try {
      await axios.put(URL + "/api/posts/post/" + postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + postId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] bg-gray-900">
        <h1 className="font-bold md:text-2xl text-xl pt-5 text-white">
          Update a post
        </h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4 pb-5">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none text-white border-2 border-white bg-gray-900"
          />

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none  text-white border-2 border-white bg-gray-900"
            placeholder="Enter post description"
          />
          <button
            onClick={handleUpdate}
            className="bg-gray-800 w-full md:w-[20%] mx-auto text-white border-white border-2 font-semibold px-4 py-2 md:text-xl text-lg hover:bg-black"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
