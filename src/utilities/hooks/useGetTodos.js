import { useEffect, useState } from "react";
import axios from "axios";
import { TODOS_API } from "../const/const";
import { useDeleteTodo } from "./useDeleteTodo";

export function useGetTodos() {
  const [todos, setTodos] = useState([]);
  const { deleteTodo } = useDeleteTodo(setTodos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const editTodo = (id, updatedTodo) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, ...updatedTodo };
        }
        return todo;
      });
    });
  };

  const toggleCompleted = (id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        return {
          ...todo,
          completed: id === todo.id ? !todo.completed : todo.completed,
        };
      })
    );
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await axios.get(TODOS_API);
      const data = await res.data;
      setTodos(data);
    };
    fetch()
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { todos, deleteTodo, setTodos, editTodo, toggleCompleted };
}
