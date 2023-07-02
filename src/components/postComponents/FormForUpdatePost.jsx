import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { usePosts } from "../../utilities/context/postsContext";
import { toast } from "react-hot-toast";

const FormForUpdatePost = ({ editedPost, id, handleCloseEdit }) => {
  const { editUser } = usePosts();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...editedPost,
    },
  });
  const onSubmit = (data) => {
    editUser(id, data);
    handleCloseEdit();
    toast.success("post changed");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicUser">
          <Form.Label className="fw-bold fs-5">User</Form.Label>
          <Form.Control
            className="p-2"
            {...register("userName", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label className="fw-bold fs-5">Title</Form.Label>
          <Form.Control
            className="p-2"
            {...register("title", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBody">
          <Form.Label className="fw-bold fs-5">Description</Form.Label>
          <Form.Control
            className="p-2"
            as="textarea"
            {...register("body", { required: true })}
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

export default FormForUpdatePost;
