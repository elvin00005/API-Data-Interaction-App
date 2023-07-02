import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNewTodo } from "../../utilities/hooks/useNewTodo";

export function TodoAddForm({ setShowModalForAddNewTodo }) {
  const { register, handleSubmit, reset } = useForm();
  const { addNewTodo } = useNewTodo();
  const onSubmit = (data) => {
    addNewTodo(data);
    reset();
    setShowModalForAddNewTodo(false);
    toast.success("todo created");
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex flex-column gap-3"
    >
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          {...register("title", {
            required: true,
          })}
        />
      </Form.Group>
      <Button className="w-25" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
