import React from "react";
import { Form } from "react-bootstrap";

export const SelectToogle = ({ postsPerPage, changePage }) => {
  return (
    <Form.Select
      aria-label="Default select example"
      className="w-auto"
      value={postsPerPage}
      onChange={(event) => changePage(event.target.value)}
    >
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="all">All</option>
    </Form.Select>
  );
};
