import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { Layout } from "../components/layout/Layout";
import { usePagination } from "../utilities/hooks/usePagination";
import { AlbumsList } from "../components/albumsComponents/AlbumsList";
import { Pagination } from "../components/pagination/Pagination";

import { ModalWindowByDeleteAllCheckedPosts } from "../components/modalsWindow/modalWindowForDelete/ModalWindowByDeleteAllCheckedPosts";
import { ModalForDelete } from "../components/modalsWindow/modalWindowForDelete/ModalWindowByDelete";
import { ModalWindowAddToFavorites } from "../components/modalsWindow/addToFavoritesWindow/ModalWindowAddToFavorites";
import { useDeleteAlbumsFromSelect } from "../utilities/hooks/useDeleteAlbumsFromSelect";
import { useAlbums } from "../utilities/context/albumsContext";
import { useFavoriteAlbums } from "../utilities/context/favoritiesAlbumsContext";
import { useFilterAlbums } from "../utilities/hooks/useFilterAlbums";
import { AlbumsFilterMenu } from "../components/albumsComponents/AlbumsFilterMenu";

const Albums = () => {
  const { handleAddMultiplyToFavoritiesAlbums } = useFavoriteAlbums();
  const [showModalOfFavorities, setShowModalOfFavorities] = useState(false);
  const [showModalDeletingCheckedPosts, setShowModalDeletingCheckedPosts] =
    useState(false);
  const [showModalOfDelete, setShowModalOfDelete] = useState(false);
  const [selectedAlbumsId, setSelectedAlbumsId] = useState(null);
  const [selectedAlbums, setSelectedAlbums] = useState([]);
  const { deleteAlbum } = useAlbums();
  const { deleteAlbums } = useDeleteAlbumsFromSelect(setSelectedAlbums);
  const {
    searchTerm,
    setSearchTerm,
    setSelectedUsers,
    setShowFavorites,
    showFavorites,
    userOptions,
    filteredAlbums,
  } = useFilterAlbums();
  const {
    postsPerPage,
    changePage,
    setCurrentPage,
    currentPage,
    paginate,
    currentLists,
  } = usePagination({ list: filteredAlbums });

  return (
    <Layout>
      <ModalWindowAddToFavorites
        selectedPosts={selectedAlbums}
        addToFavorites={handleAddMultiplyToFavoritiesAlbums}
        show={showModalOfFavorities}
        onHide={setShowModalOfFavorities}
      />
      <ModalForDelete
        id={selectedAlbumsId}
        show={showModalOfDelete}
        deletePost={deleteAlbum}
        onHide={setShowModalOfDelete}
      />
      <ModalWindowByDeleteAllCheckedPosts
        selectedPosts={selectedAlbums}
        onHide={setShowModalDeletingCheckedPosts}
        show={showModalDeletingCheckedPosts}
        deletePosts={deleteAlbums}
        setSelectedPosts={setSelectedAlbums}
      />

      <AlbumsFilterMenu
        postsPerPage={postsPerPage}
        changePage={changePage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        userOptions={userOptions}
        setSelectedUsers={setSelectedUsers}
        setShowFavorites={setShowFavorites}
        showFavorites={showFavorites}
      />
      <AlbumsList
        setShowModalOfDelete={setShowModalOfDelete}
        albums={currentLists}
        setSelectedAlbums={setSelectedAlbums}
        selectedAlbums={selectedAlbums}
        setSelectedAlbumsId={setSelectedAlbumsId}
      />
      {selectedAlbums.length > 0 && (
        <div className="d-flex justify-content-center gap-5">
          <Button onClick={() => setShowModalDeletingCheckedPosts(true)}>
            Delete
          </Button>
          <Button onClick={() => setShowModalOfFavorities(true)}>
            Add to favorites
          </Button>
        </div>
      )}
      <Pagination
        somethingPerPage={postsPerPage}
        totalSomething={filteredAlbums.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </Layout>
  );
};

export default Albums;
