import { useMemo, useState } from "react";
import { useFavoriteTodos } from "../context/favoritiesTodosContext";
import { useTodos } from "../context/todosContext";

export function useFilterTodos() {
  const { todos } = useTodos();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortCompleted, setSortCompleted] = useState(false);

  const { favoriteTodos, showFavorites, setShowFavorites } = useFavoriteTodos();

  const sortedTodos = useMemo(() => {
    const completedTodos = todos.filter((todo) => todo.completed);
    const uncompletedTodos = sortCompleted
      ? []
      : todos.filter((todo) => !todo.completed);
    return [...uncompletedTodos, ...completedTodos];
  }, [todos, sortCompleted]);

  const filteredTodos = useMemo(
    () =>
      sortedTodos.filter((todo) => {
        const titleMatch = todo.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const favoriteMatch = showFavorites
          ? favoriteTodos.includes(todo.id)
          : true;
        return titleMatch && favoriteMatch;
      }),
    [sortedTodos, searchTerm, favoriteTodos, showFavorites]
  );

  const toggleSortCompleted = () => {
    setSortCompleted(!sortCompleted);
  };

  return {
    searchTerm,
    setSearchTerm,
    setShowFavorites,
    filteredTodos,
    toggleSortCompleted,
    sortCompleted,
  };
}
