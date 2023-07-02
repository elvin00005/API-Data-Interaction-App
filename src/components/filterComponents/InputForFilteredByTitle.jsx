import React from "react";
import { Form } from "react-bootstrap";

import styles from "./InputForFilteredByTitle.module.scss";

export const InputForFilteredByTitle = ({ setSearchTerm, searchTerm }) => {
  return (
    <Form.Control
      className={styles.name}
      type="text"
      placeholder="Search by post title..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};
