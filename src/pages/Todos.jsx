import React, { useState } from "react";
import { Layout } from "../components/layout/Layout";
import { ModalForDelete } from "../components/modalsWindow/modalWindowForDelete/ModalWindowByDelete";
import { ModalWindowByDeleteAllCheckedPosts } from "../components/modalsWindow/modalWindowForDelete/ModalWindowByDeleteAllCheckedPosts";
import { Button } from "react-bootstrap";
import { Pagination } from "../components/pagination/Pagination";
import { usePagination } from "../utilities/hooks/usePagination";
import { ModalWindowAddToFavorites } from "../components/modalsWindow/addToFavoritesWindow/ModalWindowAddToFavorites";
import { TodoLists } from "../components/todosComponents/TodoLists";
import { useFavoriteTodos } from "../utilities/context/favoritiesTodosContext";
import { useTodos } from "../utilities/context/todosContext";
import { useDeleteTodosFromSelect } from "../utilities/hooks/useDeleteTodosFromSelect";
import { TodosFilterMenu } from "../components/todosComponents/TodosFilterMenu";
import { useFilterTodos } from "../utilities/hooks/useFilterTodos";
import { ModalForAddNewEssence } from "../components/modalsWindow/modalForAddNewEssence/ModalForAddNewEssence";

const Todos = () => {
  const { handleAddMultiplyToFavoritiesTodos } = useFavoriteTodos();
  const [showModalOfDelete, setShowModalOfDelete] = useState(false);
  const [showModalDeletingCheckedPosts, setShowModalDeletingCheckedPosts] =
    useState(false);
  const [showModalOfFavorities, setShowModalOfFavorities] = useState(false);
  const [showModalForAddNewTodo, setShowModalForAddNewTodo] = useState(false);
  const { deleteTodo } = useTodos();
  const [selectedTodosId, setSelectedTodosId] = useState(null);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const { deleteTodos } = useDeleteTodosFromSelect(setSelectedTodos);
  const {
    searchTerm,
    setSearchTerm,
    setShowFavorites,
    showFavorites,
    filteredTodos,
    toggleSortCompleted,
    sortCompleted,
  } = useFilterTodos();

  const {
    postsPerPage,
    changePage,
    setCurrentPage,
    currentPage,
    paginate,
    currentLists,
  } = usePagination({ list: filteredTodos });

  return (
    <Layout>
      <ModalWindowAddToFavorites
        selectedPosts={selectedTodos}
        addToFavorites={handleAddMultiplyToFavoritiesTodos}
        show={showModalOfFavorities}
        onHide={setShowModalOfFavorities}
      />
      <ModalForDelete
        id={selectedTodosId}
        show={showModalOfDelete}
        deletePost={deleteTodo}
        onHide={setShowModalOfDelete}
      />
      <ModalForAddNewEssence
        showModalForAddNewPost={showModalForAddNewTodo}
        setShowModalForAddNewPost={setShowModalForAddNewTodo}
      />
      <ModalWindowByDeleteAllCheckedPosts
        selectedPosts={selectedTodos}
        onHide={setShowModalDeletingCheckedPosts}
        show={showModalDeletingCheckedPosts}
        deletePosts={deleteTodos}
      />
      <TodosFilterMenu
        toggleSortCompleted={toggleSortCompleted}
        sortCompleted={sortCompleted}
        setShowModalForAddNewTodo={setShowModalForAddNewTodo}
        todosPerPage={postsPerPage}
        changePage={changePage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setShowFavorites={setShowFavorites}
        showFavorites={showFavorites}
      />
      <TodoLists
        setShowModalOfDelete={setShowModalOfDelete}
        todos={currentLists}
        setSelectedTodos={setSelectedTodos}
        selectedTodos={selectedTodos}
        setSelectedTodosId={setSelectedTodosId}
      />
      {selectedTodos.length > 0 && (
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
        totalSomething={filteredTodos.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </Layout>
  );
};

export default Todos;
