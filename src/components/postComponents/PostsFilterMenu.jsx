import React from "react";
import { Button } from "react-bootstrap";
import { InputForFilteredByTitle } from "../filterComponents/InputForFilteredByTitle";
import { SelectForFilteredByName } from "../filterComponents/SelectForFilteredByName";
import { FilteringInputByFavoritePosts } from "../filterComponents/FilteringInputByFavoritePosts";
import { SelectToogle } from "../filterComponents/SelectToogle";
import { useFilterPosts } from "../../utilities/hooks/useFilterPosts";

export const PostsFilterMenu = ({
  setShowModalForAddNewPost,
  postsPerPage,
  changePage,
  setSearchTerm,
  searchTerm,
  userOptions,
  setSelectedUsers,
}) => {
  const { setShowFavorites, showFavorites } = useFilterPosts();
  return (
    <div className="d-flex bg-white justify-content-between align-items-center p-2 m-1 rounded gap-3">
      <div className="d-flex flex-row align-items-center m-1 gap-3">
        <SelectToogle postsPerPage={postsPerPage} changePage={changePage} />
        <InputForFilteredByTitle
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
        <SelectForFilteredByName
          userOptions={userOptions}
          setSelectedUsers={setSelectedUsers}
        />
        <FilteringInputByFavoritePosts
          setShowFavorites={setShowFavorites}
          showFavorites={showFavorites}
        />
      </div>
      <Button
        onClick={() => {
          setShowModalForAddNewPost((prev) => !prev);
        }}
      >
        Add new Post
      </Button>
    </div>
  );
};
