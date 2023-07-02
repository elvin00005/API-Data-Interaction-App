import { createContext, useContext } from "react";
import { useGetPosts } from "../hooks/useGetPosts";

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const methods = useGetPosts();

  return (
    <PostsContext.Provider value={methods}>{children}</PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);
