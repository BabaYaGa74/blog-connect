import { BiUpvote, BiDownvote } from "react-icons/bi";
import axios from "axios";
import { URL } from "../url";
import { useEffect, useState } from "react";

const Votes = ({ userId, postId }) => {
  const [voteCount, setVoteCount] = useState(0);

  const upVote = async () => {
    try {
      const res = await axios.post(
        URL + "/api/post/vote/up",
        { postId, userId },
        {
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        setVoteCount(res.data.voteCount);
      } else {
        console.log("ALready voted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downVote = async () => {
    try {
      const res = await axios.post(
        URL + "/api/post/vote/down",
        { userId, postId },
        { withCredentials: true }
      );
      if (res.data.success === true) {
        setVoteCount(res.data.voteCount);
      } else {
        console.log("Already voted once!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getVoteCount = async () => {
    const res = await axios.post(
      URL + "/api/post/vote/",
      { postId },
      { withCredentials: true }
    );
    setVoteCount(res.data.voteCount);
  };

  useEffect(() => {
    getVoteCount();
  }, []);

  return (
    <h3 className="flex gap-2 mt-6 mb-4 font-semibold text-white">
      Votes:
      <button
        className="flex items-center gap-1 text-blue-500 hover:text-blue-300"
        onClick={() => upVote()}
      >
        <BiUpvote className="text-lg" />
      </button>
      <span className="text-gray-300">{voteCount}</span>
      <button
        className="flex items-center gap-1 text-red-500 hover:text-red-300"
        onClick={() => downVote()}
      >
        <BiDownvote className="text-lg" />
      </button>
    </h3>
  );
};

export default Votes;
