const ProfilePosts = ({ p }) => {
  console.log("Post: ", p);
  return (
    <div className="w-full flex mt-8 space-x-4 bg-gray-900 hover:rounded-lg hover:bg-gray-800">
      <div className="flex flex-col w-[90%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl text-white">
          {p.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-300 items-center md:mb-4">
          <p>@{p.username}</p>
        </div>
        {/* <p className="text-sm md:text-lg text-white">
          {p.description + " ...Read more"}
        </p> */}
        <p
          className="text-sm md:text-lg overflow-clip text-gray-300"
          dangerouslySetInnerHTML={{
            __html: p.description?.slice(0, 200),
          }}
        />
        {p.description?.length > 200 ? (
          <span className="text-gray-500 ">Read more</span>
        ) : null}
        <div class="border-t-2 border-white"></div>
      </div>
    </div>
  );
};

export default ProfilePosts;
