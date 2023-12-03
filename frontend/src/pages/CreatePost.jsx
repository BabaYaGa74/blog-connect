import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useContext(UserContext);
  const editor = useRef(null);
  const navigate = useNavigate();

  const config = {
    spellcheck: false,
    readonly: false,
    placeholder: "Start typings...",
    minHeight: 400,
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "table",
      "link",
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "fullsize",
    ],
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      description: desc,
      username: user.username,
      userId: user.userId,
    };

    try {
      await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      setTimeout(() => {
        toast.success("Post created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          theme: "dark",
        });
      }, 100);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] bg-gray-900">
        <h1 className="font-bold md:text-2xl text-xl pt-6 text-white">
          Create a post
        </h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4 pb-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none text-white border-2 border-white bg-gray-900"
          />

          <JoditEditor
            ref={editor}
            value={desc}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setDesc(newContent)} //preferred to use only this option to update the content for performance reasons
          />
          <button
            onClick={handleCreate}
            className="bg-gray-800 w-full md:w-[15%] mx-auto border-2 border-white text-white font-semibold px-4 py-2 md:text-xl text-lg hover:bg-black"
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
