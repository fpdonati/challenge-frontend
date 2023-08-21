import React, { useEffect, useState } from "react";
import { useDeletePostMutation, useGetPostsQuery } from "../api/apiSlice";
import PostForm from "./postForm";

const PostsList = () => {
  const { data: posts, isLoading, isError, error } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [localPosts, setLocalPosts] = useState([]);

  useEffect(() => {
    if (posts) {
      setLocalPosts(posts);
    }
  }, [posts]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      setLocalPosts(localPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

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
        {localPosts
          .filter((post) => {
            const searchTermLower = searchTerm.toLowerCase();
            return (
              post.name.toLowerCase().includes(searchTermLower) ||
              post.description.toLowerCase().includes(searchTermLower)
            );
          })
          .map((post) => (
            <div className="bg-neutral-800 p-4 rounded-md my-0.5" key={post.id}>
              <div className="flex justify-between align-center">
                <p className="basis-1/3 break-all px-2">{post.name}</p>
                <p className="basis-1/3 break-all px-2">{post.description}</p>
                <div className="basis-1/3 flex justify-center">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 px-2 py-1 text-xs rounded-md h-6"
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <PostForm
        localPosts={localPosts} // Pasa la lista de posts al componente PostForm
        setLocalPosts={setLocalPosts} // Pasa la función para actualizar la lista de posts
      />
    </div>
  );
};

export default PostsList;
