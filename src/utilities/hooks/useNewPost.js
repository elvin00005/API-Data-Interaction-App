import axios from "axios";
import { usePosts } from "../context/postsContext";
import { POST_API } from "../const/const";

export function useNewPost() {
  const { posts, setPosts } = usePosts();

  const addNewPost = async (newPost, selectedUser) => {
    try {
      const response = await axios.post(`${POST_API}`, newPost);
      const createdPost = {
        ...newPost,
        id: response.data.id,
        user: { name: selectedUser },
      };

      setPosts([...posts, createdPost]);
    } catch (error) {
      console.log(error);
    }
  };

  return { addNewPost };
}
