import axios from "axios";
import { toast } from "react-hot-toast";
import { POST_API } from "../const/const";

export const useDeletePost = (setPosts) => {
  const deletePost = async (id) => {
    try {
      await axios.delete(`${POST_API}/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

      let favorites = JSON.parse(localStorage.getItem("favoritePosts"));

      if (favorites) {
        favorites = favorites.filter((postId) => postId !== id);
        localStorage.setItem("favoritePosts", JSON.stringify(favorites));
      }

      toast.success("post deleted");
    } catch (error) {
      toast.error("post not deleted");
    }
  };
  return { deletePost };
};
