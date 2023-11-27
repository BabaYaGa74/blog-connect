import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c, onCommentDelete, onCommentEdit }) => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(c.content);
  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/post/comment/delete/" + id, {
        withCredentials: true,
      });
      onCommentDelete(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditComment = async (id) => {
    try {
      console.log(content);
      const res = await axios.put(
        URL + "/api/post/comment/update/" + id,
        { content },
        {
          withCredentials: true,
        }
      );
      onCommentEdit(id, res.data.result.content);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c.username}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>
            {c.createdAt === "now"
              ? "Just now"
              : new Date(c.createdAt).toString().slice(0, 15)}
          </p>
          <p>
            {c.createdAt === "now"
              ? null
              : new Date(c.createdAt).toString().slice(16, 24)}
          </p>
          {user?.userId === c?.userId ? (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer hover:text-blue-700"
                onClick={() => setIsOpen(true)}
              >
                <BiEdit />
              </p>
              <p
                className="cursor-pointer hover:text-red-700"
                onClick={() => handleDeleteComment(c.commentId)}
              >
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-4 mt-2 flex gap-4 justify-between">
        {!isOpen ? (
          content
        ) : (
          <>
            <input
              onChange={(e) => setContent(e.target.value)}
              type="text"
              placeholder="Edit Comment"
              className="px-4 py-2 outline-none w-[90%]"
            />
            <button
              className=" bg-black text-white rounded-lg p-2 hover:bg-gray-700"
              onClick={() => handleEditComment(c.commentId)}
            >
              Update
            </button>
            <button
              className=" bg-black text-white rounded-lg p-2 hover:bg-gray-700  "
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default Comment;
