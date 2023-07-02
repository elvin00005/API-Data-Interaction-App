import React from "react";
import { Button } from "react-bootstrap";
import { InputForFilteredByTitle } from "../filterComponents/InputForFilteredByTitle";
import { FilteringInputByFavoritePosts } from "../filterComponents/FilteringInputByFavoritePosts";
import { SelectToogle } from "../filterComponents/SelectToogle";
import { FilterByCompleted } from "../filterComponents/FilterByCompleted";
import { useFilterTodos } from "../../utilities/hooks/useFilterTodos";

export const TodosFilterMenu = ({
  setShowModalForAddNewTodo,
  postsPerPage,
  changePage,
  setSearchTerm,
  searchTerm,
  toggleSortCompleted,
  sortCompleted,
}) => {
  const { setShowFavorites, showFavorites } = useFilterTodos();

  return (
    <div className="d-flex bg-white justify-content-between align-items-center p-2 m-1 rounded gap-3">
      <div className="d-flex flex-row align-items-center m-1 gap-2">
        <SelectToogle postsPerPage={postsPerPage} changePage={changePage} />
        <InputForFilteredByTitle
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
        <FilteringInputByFavoritePosts
          setShowFavorites={setShowFavorites}
          showFavorites={showFavorites}
        />
        <FilterByCompleted
          toggleSortCompleted={toggleSortCompleted}
          sortCompleted={sortCompleted}
        />
      </div>
      <Button
        onClick={() => {
          setShowModalForAddNewTodo((prev) => !prev);
        }}
      >
        Add new Todo
      </Button>
    </div>
  );
};
