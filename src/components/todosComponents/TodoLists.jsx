import React from "react";
import { TodoCard } from "./TodoCard";

export function TodoLists({
  todos,
  setSelectedTodos,
  selectedTodos,
  setSelectedTodosId,
  setShowModalOfDelete,
}) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          setSelectedTodos={setSelectedTodos}
          selectedTodos={selectedTodos}
          setShowModalOfDelete={setShowModalOfDelete}
          setSelectedTodosId={setSelectedTodosId}
        />
      ))}
    </div>
  );
}
