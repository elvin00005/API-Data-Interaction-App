import React from "react";
import { Form } from "react-bootstrap";

export function FilterByCompleted({ sortCompleted, toggleSortCompleted }) {
  return (
    <Form.Group
      className="d-flex flex-row align-items-center gap-2"
      controlId="exampleForm.ControlInput2s"
    >
      <Form.Label className="m-0">Completed</Form.Label>
      <Form.Check
        className="w-auto m-0"
        type="checkbox"
        checked={sortCompleted}
        onChange={toggleSortCompleted}
      />
    </Form.Group>
  );
}
