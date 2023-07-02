import { useEffect, useState } from "react";

export function usePagination({ list }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(
    localStorage.getItem("quantityPosts") || "10"
  );
  const [currentLists, setCurrentLists] = useState([]);

  useEffect(() => {
    if (postsPerPage === "all") {
      setCurrentLists(list);
    } else {
      const lastIndexPost = currentPage * parseInt(postsPerPage);
      const firstIndexPost = lastIndexPost - parseInt(postsPerPage);

      setCurrentLists(list.slice(firstIndexPost, lastIndexPost));
    }
  }, [currentPage, postsPerPage, list]);

  const paginate = (number) => setCurrentPage(number);
  const changePage = (value) => {
    setPostsPerPage(value);
    localStorage.setItem("quantityPosts", value);
  };

  return {
    postsPerPage,
    setCurrentPage,
    currentPage,
    paginate,
    changePage,
    currentLists,
  };
}
