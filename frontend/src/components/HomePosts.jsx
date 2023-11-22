const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[60%] bg-gray-900 border-b-2 border-white p-4 hover:shadow-lg hover:border-2 hover:rounded-lg hover:bg-gray-800 mt-8">
        <div className="flex flex-col">
          <div className="flex mb-1 text-sm font-semibold text-gray-400 items-center justify-between">
            <p>@{post.username}</p>
            <div className="flex space-x-2 text-sm">
              <p>{new Date(post.createdAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.createdAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <h1 className="flex text-xl font-bold mb-2 md:text-2xl text-center">
            {post.title}
          </h1>
          <p className="flex text-sm md:text-lg">
            {post.description?.slice(0, 200)}{" "}
          </p>
          {post.description?.length > 200 ? (
            <span className="text-gray-500 ">Read more</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomePosts;
