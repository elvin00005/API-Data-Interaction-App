import axios from "axios";
import { toast } from "react-hot-toast";
import { TODOS_API } from "../const/const";

export const useDeleteTodo = (setTodos) => {
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${TODOS_API}/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

      let favorites = JSON.parse(localStorage.getItem("favoriteTodos"));

      if (favorites) {
        favorites = favorites.filter((postId) => postId !== id);
        localStorage.setItem("favoriteTodos", JSON.stringify(favorites));
      }

      toast.success("todo deleted");
    } catch (error) {
      toast.error("todo not deleted");
    }
  };
  return { deleteTodo };
};
