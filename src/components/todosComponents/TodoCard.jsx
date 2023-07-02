import React, { useState } from "react";
import cn from "classnames";
import { Card, Form, FormCheck } from "react-bootstrap";
import {
  ButtonToAddToFavorites,
  DeleteButton,
  EditButton,
} from "../../utilities/const/Buttons";
import { useFavoriteTodos } from "../../utilities/context/favoritiesTodosContext";
import { useTodos } from "../../utilities/context/todosContext";
import { FormForUpdateTodo } from "./FormForUpdateTodo";

import styles from "./TodoCard.module.scss";

export const TodoCard = ({
  todo,
  setSelectedTodos,
  setShowModalOfDelete,
  selectedTodos,
  setSelectedTodosId,
}) => {
  const { favoriteTodos, handleToggleAddfavoriteTodos } = useFavoriteTodos();
  const { toggleCompleted } = useTodos();
  const [isEdit, setIsEdit] = useState(false);
  const handleCloseEdit = () => setIsEdit(false);

  const handleEdit = () => {
    setIsEdit(true);
  };
  const userMainData = {
    title: todo?.title,
  };

  if (isEdit) {
    return (
      <div
        key={todo.id}
        className="d-flex flex-column bg-light p-3 m-1 rounded"
      >
        <FormForUpdateTodo
          id={todo?.id}
          editedTodo={userMainData}
          handleCloseEdit={handleCloseEdit}
        />
      </div>
    );
  }

  return (
    <Card
      className={`${styles.container} ${
        favoriteTodos.includes(todo.id) ? "bg-warning" : "bg-light"
      }`}
    >
      <div>
        <Form.Check
          className={styles.check}
          checked={selectedTodos.includes(todo.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedTodos([...selectedTodos, todo.id]);
            } else {
              setSelectedTodos(
                selectedTodos.filter((todoId) => todoId !== todo.id)
              );
            }
          }}
        />

        <h3
          className={`d-flex justify-content-center gap-3 `}
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {" "}
          <FormCheck
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCompleted(todo.id)}
            className="p-0 m-0"
          />
          {todo?.title}
        </h3>
      </div>

      <div className={cn(styles.bntsDiv, "d-flex justify-content-center")}>
        <EditButton onClick={handleEdit} />
        <ButtonToAddToFavorites
          onClick={() => handleToggleAddfavoriteTodos(todo.id)}
        />
        <DeleteButton
          onClick={() => {
            setSelectedTodosId(todo.id);
            setShowModalOfDelete(true);
          }}
        />
      </div>
    </Card>
  );
};
