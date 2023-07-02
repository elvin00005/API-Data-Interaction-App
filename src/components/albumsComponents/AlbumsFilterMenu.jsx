import React from "react";
import { InputForFilteredByTitle } from "../filterComponents/InputForFilteredByTitle";
import { SelectForFilteredByName } from "../filterComponents/SelectForFilteredByName";
import { FilteringInputByFavoritePosts } from "../filterComponents/FilteringInputByFavoritePosts";
import { SelectToogle } from "../filterComponents/SelectToogle";
import { useFilterAlbums } from "../../utilities/hooks/useFilterAlbums";

export const AlbumsFilterMenu = ({
  postsPerPage,
  changePage,
  setSearchTerm,
  searchTerm,
  userOptions,
  setSelectedUsers,
}) => {
  const { setShowFavorites, showFavorites } = useFilterAlbums();
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
    </div>
  );
};
