import React from "react";
import { useCreatePostMutation } from "../api/apiSlice";

const PostForm = ({ localPosts, setLocalPosts }) => {
  const [createPost] = useCreatePostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const description = e.target.elements.description.value.trim();
    if (name && description) {
      const response = await createPost({ name, description });
      if (response.data) {
        // Si la creación del post fue exitosa, actualiza la lista local de posts
        setLocalPosts([response.data, ...localPosts]);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 flex justify-between px-4 py-4 rounded"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2 h-10"
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2 h-10"
        required
      />
      <button type="submit" className="bg-indigo-600 px-2 py-1 h-10">
        create
      </button>
    </form>
  );
};

export default PostForm;





