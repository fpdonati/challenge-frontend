import React, { useState } from "react";
import { useDeletePostMutation, useGetPostsQuery } from "../api/apiSlice";

const PostsList = () => {
  const { data: posts, isLoading, isError, error } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  const filteredPosts = posts.filter(
    (post) =>
      post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <form
        className="bg-zinc-800 flex justify-between px-4 py-4 rounded"
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleChange}
          type="text"
          name="search"
          placeholder="Search"
          className="w-full p-2 rounded-md bg-zinc-600 mb-2 h-10"
        />
      </form>

      <div className="bg-neutral-800 p-4 rounded-md flex justify-between items-center py-4 my-2">
        <p className="basis-1/3">name</p>
        <p className="basis-1/3">description</p>
        <p className="basis-1/3">action</p>
      </div>

      <div className="flex flex-col">
        {filteredPosts.map((post) => (
          <div className="bg-neutral-800 p-4 rounded-md my-0.5" key={post.id}>
            <div className="flex justify-between align-center">
              <p className="basis-1/3 break-all px-2">{post.name}</p>
              <p className="basis-1/3 break-all px-2">{post.description}</p>
              <div className="basis-1/3 flex justify-center">
                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-500 px-2 py-1 text-xs rounded-md h-6"
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
