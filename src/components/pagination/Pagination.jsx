import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import cn from "classnames";

import styles from "./Pagination.module.scss";

export const Pagination = ({
  somethingPerPage,
  totalSomething,
  setCurrentPage,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalSomething / somethingPerPage); i++) {
    pageNumbers.push(i);
  }

  const prevPage = () => {
    setCurrentPage((prev) => {
      if (prev - 1 === 0) {
        return (prev = 1);
      } else {
        return prev - 1;
      }
    });
  };
  const nextPage = () => {
    setCurrentPage((prev) => {
      if (prev + 1 === pageNumbers.length + 1) {
        return (prev = pageNumbers.length);
      } else {
        return prev + 1;
      }
    });
  };
  return (
    <ul className={cn(styles.container, "m-1 p-3 rounded")}>
      <Button onClick={() => prevPage()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-left"
          viewBox="0 0 16 16"
        >
          <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
        </svg>
      </Button>
      <ul>
        {pageNumbers.map((number) => {
          return (
            <li
              key={number}
              onClick={() => {
                paginate(number);
              }}
            >
              <div>
                <Link
                  to="#"
                  className={currentPage === number ? styles.purpleBtn : ""}
                >
                  {" "}
                  {number}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <Button onClick={() => nextPage()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-right"
          viewBox="0 0 16 16"
        >
          <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
        </svg>
      </Button>
    </ul>
  );
};
