import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const FavoriteContext = createContext({});

export function FavoriteProviderPosts({ children }) {
  const [favoritePosts, setFavoritePosts] = useState(
    JSON.parse(localStorage.getItem("favoritePosts")) || []
  );
  const [showFavorites, setShowFavorites] = useState(false);

  const handleAddMultiplyToFavoritiesPosts = (ids) => {
    const currentFavoritePosts =
      JSON.parse(localStorage.getItem("favoritePosts")) || [];
    const newFavorities = [...new Set([...currentFavoritePosts, ...ids])];
    localStorage.setItem("favoritePosts", JSON.stringify(newFavorities));
    setFavoritePosts(newFavorities);
    toast.success("posts added to Favorites!");
  };

  const handleToggleAddFavoritePosts = (postId) => {
    const hasInList = favoritePosts.includes(postId);
    if (hasInList) {
      const newFavoritePosts = favoritePosts.filter((id) => id !== postId);
      setFavoritePosts(newFavoritePosts);
      localStorage.setItem("favoritePosts", JSON.stringify(newFavoritePosts));
      toast.success(" post deleted to Favorites!");
    } else {
      const newFavoritePosts = [...favoritePosts, postId];
      setFavoritePosts(newFavoritePosts);
      localStorage.setItem("favoritePosts", JSON.stringify(newFavoritePosts));
      toast.success("post added to Favorites!");
    }
  };

  const handleRemoveMultiplyToFavoritiesPosts = () => {
    setFavoritePosts([]);
    localStorage.setItem("favoritePosts", JSON.stringify([]));
  };

  const value = {
    handleAddMultiplyToFavoritiesPosts,
    handleToggleAddFavoritePosts,
    handleRemoveMultiplyToFavoritiesPosts,
    favoritePosts,
    setFavoritePosts,
    showFavorites,
    setShowFavorites,
  };
  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavoritePosts = () => useContext(FavoriteContext);
