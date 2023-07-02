import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const FavoriteContext = createContext(null);

export function FavoriteProviderALbums({ children }) {
  const [favoriteAlbums, setFavoriteAlbums] = useState(
    JSON.parse(localStorage.getItem("favoriteAlbums")) || []
  );
  const [showFavorites, setShowFavorites] = useState(false);

  const handleAddMultiplyToFavoritiesAlbums = (ids) => {
    const currentFavoritePosts =
      JSON.parse(localStorage.getItem("favoriteAlbums")) || [];
    const newFavorities = [...new Set([...currentFavoritePosts, ...ids])];
    localStorage.setItem("favoriteAlbums", JSON.stringify(newFavorities));
    setFavoriteAlbums(newFavorities);
    toast.success("posts added to Favorites!");
  };

  const handleToggleAddFavoriteAlbums = (postId) => {
    const hasInList = favoriteAlbums.includes(postId);
    if (hasInList) {
      const newFavoritePosts = favoriteAlbums.filter((id) => id !== postId);
      setFavoriteAlbums(newFavoritePosts);
      localStorage.setItem("favoriteAlbums", JSON.stringify(newFavoritePosts));
      toast.success(" post deleted to Favorites!");
    } else {
      const newFavoritePosts = [...favoriteAlbums, postId];
      setFavoriteAlbums(newFavoritePosts);
      localStorage.setItem("favoriteAlbums", JSON.stringify(newFavoritePosts));
      toast.success("post added to Favorites!");
    }
  };

  const handleRemoveMultiplyToFavoritiesAlbums = () => {
    setFavoriteAlbums([]);
    localStorage.setItem("favoriteAlbums", JSON.stringify([]));
  };

  const value = {
    handleAddMultiplyToFavoritiesAlbums,
    handleToggleAddFavoriteAlbums,
    handleRemoveMultiplyToFavoritiesAlbums,
    favoriteAlbums,
    setFavoriteAlbums,
    showFavorites,
    setShowFavorites,
  };
  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavoriteAlbums = () => useContext(FavoriteContext);
