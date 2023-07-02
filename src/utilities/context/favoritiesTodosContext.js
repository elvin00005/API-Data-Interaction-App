import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const FavoriteContext = createContext({});

export function FavoriteProviderTodos({ children }) {
  const [favoriteTodos, setFavoriteTodos] = useState(
    JSON.parse(localStorage.getItem("favoriteTodos")) || []
  );
  const [showFavorites, setShowFavorites] = useState(false);
  const handleAddMultiplyToFavoritiesTodos = (ids) => {
    const currentfavoriteTodos =
      JSON.parse(localStorage.getItem("favoriteTodos")) || [];
    const newFavorities = [...new Set([...currentfavoriteTodos, ...ids])];
    localStorage.setItem("favoriteTodos", JSON.stringify(newFavorities));
    setFavoriteTodos(newFavorities);
    toast.success("todo added to Favorites!");
  };

  const handleToggleAddfavoriteTodos = (postId) => {
    const hasInList = favoriteTodos.includes(postId);
    if (hasInList) {
      const newFavoriteTodos = favoriteTodos.filter((id) => id !== postId);
      setFavoriteTodos(newFavoriteTodos);
      localStorage.setItem("favoriteTodos", JSON.stringify(newFavoriteTodos));
      toast.success("todo deleted to Favorites!");
    } else {
      const newFavoriteTodos = [...favoriteTodos, postId];
      setFavoriteTodos(newFavoriteTodos);
      localStorage.setItem("favoriteTodos", JSON.stringify(newFavoriteTodos));
      toast.success("todo added to Favorites!");
    }
  };

  const handleRemoveMultiplyToFavoritiesTodos = () => {
    setFavoriteTodos([]);
    localStorage.setItem("favoriteTodos", JSON.stringify([]));
  };

  const value = {
    handleAddMultiplyToFavoritiesTodos,
    handleToggleAddfavoriteTodos,
    handleRemoveMultiplyToFavoritiesTodos,
    favoriteTodos,
    setFavoriteTodos,
    showFavorites,
    setShowFavorites,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavoriteTodos = () => useContext(FavoriteContext);
