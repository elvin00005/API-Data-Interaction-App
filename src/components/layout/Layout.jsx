import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";

import styles from "./Layout.module.scss";

export const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <Row className={cn(styles.container, "d-flex flex-column p-0 m-0")}>
      <Col className="d-flex flex-row p-4 justify-content-center gap-5 fs-3">
        <Link
          to="/posts"
          className={location.pathname === "/posts" ? styles.active : ""}
        >
          Posts
        </Link>
        <Link
          to="/albums"
          className={location.pathname === "/albums" ? styles.active : ""}
        >
          Photo
        </Link>
        <Link
          to="/todos"
          className={location.pathname === "/todos" ? styles.active : ""}
        >
          Todos
        </Link>
      </Col>
      <Col>{children}</Col>
    </Row>
  );
};
