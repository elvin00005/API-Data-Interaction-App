import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { useFilterPosts } from "../../utilities/hooks/useFilterPosts";
import { toast } from "react-hot-toast";
import { useNewPost } from "../../utilities/hooks/useNewPost";

export function PostAddForm({ setShowModalForAddNewPost }) {
  const { register, handleSubmit, reset } = useForm();
  const { userOptions } = useFilterPosts();
  const { addNewPost } = useNewPost();
  const onSubmit = (data) => {
    const selectedUser = userOptions.find((user) => user.value == data.userId);

    const newPost = { ...data, userId: Number(data.userId) };
    addNewPost(newPost, selectedUser.label);
    reset();
    setShowModalForAddNewPost(false);
    toast.success("post created");
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
      <Form.Group controlId="formBody">
        <Form.Label>Body</Form.Label>
        <Form.Control type="text" {...register("body", { required: true })} />
      </Form.Group>
      <Form.Group controlId="formUserId">
        <Form.Label>User</Form.Label>
        <Form.Control as="select" {...register("userId", { required: true })}>
          <option value="">Select user...</option>
          {userOptions?.map((user) => (
            <option key={user.value} value={user.value}>
              {user.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button className="w-25" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
