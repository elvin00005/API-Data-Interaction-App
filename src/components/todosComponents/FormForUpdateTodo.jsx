import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import { useTodos } from "../../utilities/context/todosContext";

export const FormForUpdateTodo = ({ editedTodo, id, handleCloseEdit }) => {
  const { editTodo } = useTodos();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...editedTodo,
    },
  });
  const onSubmit = (data) => {
    editTodo(id, data);
    handleCloseEdit();
    toast.success("Todo changed");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label className="fw-bold fs-5">Title</Form.Label>
          <Form.Control
            className="p-2"
            {...register("title", { required: true })}
          />
        </Form.Group>

        <div className="d-flex gap-5 justify-content-center">
          <Button type="submit">Save</Button>
          <Button onClick={handleCloseEdit}>Cancel</Button>
        </div>
      </Form>
    </>
  );
};
