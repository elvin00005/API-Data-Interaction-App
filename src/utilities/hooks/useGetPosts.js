import axios from "axios";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useDeletePost } from "./useDeletePost";
import { COMMENT_API, POST_API, USER_API } from "../const/const";

export function useGetPosts() {
  const [posts, setPosts] = useState([]);
  const { deletePost } = useDeletePost(setPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const editUser = (id, data) => {
    setPosts((prev) => {
      return prev.map((post) => {
        const { userName, ...rest } = data;
        if (post.id === id) {
          return { ...post, ...rest, user: { ...post.user, name: userName } };
        }
        return post;
      });
    });
  };

  const getPostList = async () => {
    return await Promise.all([
      axios.get(POST_API),
      axios.get(USER_API),
      axios.get(COMMENT_API),
    ]);
  };

  useEffect(() => {
    setLoading(true);
    getPostList()
      .then(([posts, users, comments]) => {
        const usersMap = _.keyBy(users.data, "id");
        const commentsMap = _.groupBy(comments.data, "postId");
        const postsWithCommentsAndUsers = posts.data.map((post) => {
          return {
            ...post,
            user: usersMap[post.userId],
            comments: commentsMap[post.id],
          };
        });

        setPosts(postsWithCommentsAndUsers);
      })
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return {
    posts,
    setLoading,
    error,
    deletePost,
    setPosts,
    editUser,
  };
}
