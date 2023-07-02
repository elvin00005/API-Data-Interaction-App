import axios from "axios";
import { toast } from "react-hot-toast";
import { usePosts } from "../context/postsContext";
import { useFavoritePosts } from "../context/favoritiesPostsContext";
import { POST_API } from "../const/const";

export const useDeletePostsFromSelect = (setSelectedPosts) => {
  const { setPosts } = usePosts();
  const { setFavoritePosts } = useFavoritePosts();
  const deletePosts = async (selectedPosts) => {
    const postsToDelete = [...selectedPosts];

    const deleteRequests = postsToDelete.map((postId) =>
      axios.delete(`${POST_API}/${postId}`)
    );
    try {
      await Promise.all(deleteRequests);

      setPosts((prevPosts) => {
        const filtered = prevPosts.filter(
          (post) => !postsToDelete.includes(post.id)
        );
        return filtered;
      });

      setFavoritePosts((prevFavoritePosts) => {
        const newFavoritePosts = prevFavoritePosts.filter(
          (postId) => !postsToDelete.includes(postId)
        );
        localStorage.setItem("favoritePosts", JSON.stringify(newFavoritePosts));
        return newFavoritePosts;
      });

      setSelectedPosts((prevSelectedPosts) =>
        prevSelectedPosts.filter((postId) => !postsToDelete.includes(postId))
      );

      toast.success("Selected posts removed");
    } catch (error) {
      toast.error("Failed to delete some posts");
    }
  };

  return { deletePosts };
};
