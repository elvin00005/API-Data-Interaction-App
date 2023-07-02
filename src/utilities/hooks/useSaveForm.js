import { toast } from "react-hot-toast";
import axios from "axios";
import { POST_API } from "../const/const";
import { usePosts } from "../context/postsContext";

export default function useSaveForm({ setEditedPost, editedPost }) {
  const { posts, setPosts } = usePosts();

  const saveData = async (id) => {
    try {
      const response = await axios.put(`${POST_API}/${id}`, editedPost);
      if (response.status === 200) {
        const updatedPosts = posts.map((post) =>
          post.id === id
            ? Object.assign({}, post, {
                ...response.data,
                user: { ...post.user, name: response.data.userName },
              })
            : post
        );
        setPosts(updatedPosts);
        toast.success("post updated");
        const updatedEditedPost = Object.assign({}, editedPost, {
          userName: response.data.userName,
        });

        setEditedPost(updatedEditedPost);
      } else {
        toast.error("post update error");
      }
    } catch (error) {
      toast.error("post update error");
    }
  };

  return { saveData };
}
