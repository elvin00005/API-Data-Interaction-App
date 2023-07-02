import axios from "axios";
import { toast } from "react-hot-toast";
import { useTodos } from "../context/todosContext";
import { useFavoriteTodos } from "../context/favoritiesTodosContext";
import { TODOS_API } from "../const/const";

export const useDeleteTodosFromSelect = (setSelectedTodos) => {
  const { setTodos } = useTodos();
  const { setFavoriteTodos } = useFavoriteTodos();
  const deleteTodos = async (selectedTodos) => {
    const todoToDelete = [...selectedTodos];

    const deleteRequests = todoToDelete.map((todoId) =>
      axios.delete(`${TODOS_API}/${todoId}`)
    );
    try {
      await Promise.all(deleteRequests);

      setTodos((prevTodos) => {
        const filtered = prevTodos.filter(
          (todo) => !todoToDelete.includes(todo.id)
        );
        return filtered;
      });

      setFavoriteTodos((prevFavoriteTodos) => {
        const newFavoriteTodos = prevFavoriteTodos.filter(
          (todoId) => !todoToDelete.includes(todoId)
        );
        localStorage.setItem("favoriteTodos", JSON.stringify(newFavoriteTodos));
        return newFavoriteTodos;
      });

      setSelectedTodos((prevSelectedTodos) =>
        prevSelectedTodos.filter((todoId) => !todoToDelete.includes(todoId))
      );

      toast.success("Selected todos removed");
    } catch (error) {
      toast.error("Failed to delete some todos");
    }
  };

  return { deleteTodos };
};
