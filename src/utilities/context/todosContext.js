import React, { createContext, useContext } from "react";
import { useGetTodos } from "../hooks/useGetTodos";

const TodosContext = createContext({});

export function TodosProvider({ children }) {
  const methods = useGetTodos();

  return (
    <TodosContext.Provider value={methods}>{children}</TodosContext.Provider>
  );
}

export const useTodos = () => useContext(TodosContext);
