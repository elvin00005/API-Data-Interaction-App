import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { Layout } from "../components/layout/Layout";
import { Pagination } from "../components/pagination/Pagination";
import { ModalForDelete } from "../components/modalsWindow/modalWindowForDelete/ModalWindowByDelete";
import { ModalWindowAddToFavorites } from "../components/modalsWindow/addToFavoritesWindow/ModalWindowAddToFavorites";
import { ModalWindowByDeleteAllCheckedPosts } from "../components/modalsWindow/modalWindowForDelete/ModalWindowByDeleteAllCheckedPosts";
import { PostsList } from "../components/postComponents/PostsList";
import { useFavoritePosts } from "../utilities/context/favoritiesPostsContext";
import { usePagination } from "../utilities/hooks/usePagination";
import { useDeletePostsFromSelect } from "../utilities/hooks/useDeletePostsFromSelect";
import { usePosts } from "../utilities/context/postsContext";
import { useFilterPosts } from "../utilities/hooks/useFilterPosts";
import { PostsFilterMenu } from "../components/postComponents/PostsFilterMenu";
import { ModalForAddNewEssence } from "../components/modalsWindow/modalForAddNewEssence/ModalForAddNewEssence";

const Posts = () => {
  const { handleAddMultiplyToFavoritiesPosts } = useFavoritePosts();
  const { deletePost } = usePosts();
  const [showModalOfDelete, setShowModalOfDelete] = useState(false);
  const [showModalOfFavorities, setShowModalOfFavorities] = useState(false);
  const [showModalDeletingCheckedPosts, setShowModalDeletingCheckedPosts] =
    useState(false);
  const [showModalForAddNewPost, setShowModalForAddNewPost] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const { deletePosts } = useDeletePostsFromSelect(setSelectedPosts);
  const {
    filteredPosts,
    setSearchTerm,
    searchTerm,
    userOptions,
    setSelectedUsers,
  } = useFilterPosts();
  const {
    postsPerPage,
    changePage,
    setCurrentPage,
    currentPage,
    paginate,
    currentLists,
  } = usePagination({ list: filteredPosts });

  return (
    <Layout>
      <ModalWindowAddToFavorites
        selectedPosts={selectedPosts}
        addToFavorites={handleAddMultiplyToFavoritiesPosts}
        show={showModalOfFavorities}
        onHide={setShowModalOfFavorities}
      />
      <ModalForDelete
        id={selectedPostId}
        show={showModalOfDelete}
        deletePost={deletePost}
        onHide={setShowModalOfDelete}
      />
      <ModalWindowByDeleteAllCheckedPosts
        selectedPosts={selectedPosts}
        onHide={setShowModalDeletingCheckedPosts}
        show={showModalDeletingCheckedPosts}
        deletePosts={deletePosts}
      />
      <ModalForAddNewEssence
        showModalForAddNewPost={showModalForAddNewPost}
        setShowModalForAddNewPost={setShowModalForAddNewPost}
      />
      <PostsFilterMenu
        userOptions={userOptions}
        setSelectedUsers={setSelectedUsers}
        searchTerm={searchTerm}
        setShowModalForAddNewPost={setShowModalForAddNewPost}
        setSearchTerm={setSearchTerm}
        postsPerPage={postsPerPage}
        changePage={changePage}
      />
      <PostsList
        setShowModalOfDelete={setShowModalOfDelete}
        posts={currentLists}
        setSelectedPosts={setSelectedPosts}
        selectedPosts={selectedPosts}
        setSelectedPostId={setSelectedPostId}
      />
      {selectedPosts.length > 0 && (
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
        totalSomething={filteredPosts.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </Layout>
  );
};

export default Posts;
