import { useMemo, useState } from "react";
import { usePosts } from "../context/postsContext";
import { useFavoritePosts } from "../context/favoritiesPostsContext";

export function useFilterPosts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { favoritePosts, showFavorites, setShowFavorites } = useFavoritePosts();
  const { posts } = usePosts();

  const uniqueUsers = Array.from(
    new Set(posts.map((post) => (post.user ? post.user.id : "Anonymous")))
  ).map((id) => {
    const post = posts.find((post) => post.user && post.user.id === id);
    return post ? post.user : { name: "Anonymous", id: "Anonymous" };
  });

  const userOptions = uniqueUsers.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const titleMatch = post.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const userMatch =
          selectedUsers.length === 0 ||
          selectedUsers.find((user) => user.value === post.userId);
        const favoriteMatch = showFavorites
          ? favoritePosts.includes(post.id)
          : true;
        return titleMatch && userMatch && favoriteMatch;
      }),
    [posts, searchTerm, selectedUsers, favoritePosts, showFavorites]
  );

  return {
    userOptions,
    searchTerm,
    selectedUsers,
    setSearchTerm,
    setSelectedUsers,
    setShowFavorites,
    filteredPosts,
  };
}
