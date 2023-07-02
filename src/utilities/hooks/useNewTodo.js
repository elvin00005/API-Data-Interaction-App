import axios from "axios";
import { TODOS_API } from "../const/const";
import { useTodos } from "../context/todosContext";

export function useNewTodo() {
  const { todos, setTodos } = useTodos();

  const addNewTodo = async (todo) => {
    try {
      const response = await axios.post(`${TODOS_API}`, todo);
      const createdPost = {
        ...todo,
        id: response.data.id,
        completed: false,
      };

      setTodos([...todos, createdPost]);
    } catch (error) {
      console.log(error);
    }
  };

  return { addNewTodo };
}
