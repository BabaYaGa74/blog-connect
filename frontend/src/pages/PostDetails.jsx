import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../url";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import Votes from "../components/Votes";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const commentInputRef = useRef(null);

  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/post/" + postId);
      console.log(res.data.post);
      setPost(res.data.post);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/post/" + postId, {
        withCredentials: true,
      });
      console.log(res.data.post);
      setTimeout(() => {
        toast.success("Post deleted successfully!", {
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

  useEffect(() => {
    fetchPost();
    fetchPostComments();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/post/comment/all/" + postId, {
        withCredentials: true,
      });
      setComments(res.data.result);
      console.log(comments);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = {
        content: comment,
        username: user.username,
        postId: postId,
        userId: user.userId,
        createdAt: "now",
      };
      const response = await axios.post(
        URL + "/api/post/comment/create",
        newComment,
        {
          withCredentials: true,
        }
      );
      const { insertId } = response.data.result;
      setComments([...comments, { ...newComment, commentId: insertId }]);

      commentInputRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = (id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.commentId !== id)
    );
  };

  const handleEditComment = (id, updatedContent) => {
    setComments((prevComments) => {
      return prevComments.map((comment) =>
        comment.commentId === id
          ? { ...comment, content: updatedContent }
          : comment
      );
    });
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] bg-gray-900 min-h-screen">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white mt-8 md:text-3xl">
              {post.title}
            </h1>
            {user?.userId === post?.userId && (
              <div className="flex items-center justify-center text-white mt-8 space-x-2">
                <p
                  className="cursor-pointer hover:text-blue-400"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p
                  className="cursor-pointer hover:text-red-700"
                  onClick={handleDeletePost}
                >
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4 text-gray-400">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.createdAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.createdAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <p
            className="mx-auto mt-8 text-gray-200"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />
          <div className="flex flex-col mt-5">
            <Votes userId={user?.userId} postId={postId} />

            <h3 className="mt-3 mb-4 font-semibold text-white">Comments:</h3>
            {comments.map((c) => (
              <Comment
                key={c.commentId}
                c={c}
                onCommentDelete={handleDeleteComment}
                onCommentEdit={handleEditComment}
              />
            ))}
          </div>
          {/* write a comment */}
          <div className="w-full flex flex-col mt-4 md:flex-row pb-5">
            <input
              ref={commentInputRef}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 mr-2"
            />
            <button
              onClick={postComment}
              className="bg-gray-800 text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0 border-2 hover:bg-black"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
