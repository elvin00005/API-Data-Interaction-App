import { Modal } from "react-bootstrap/";
import { useLocation } from "react-router-dom";
import { PostAddForm } from "../../postComponents/PostAddForm";
import { TodoAddForm } from "../../todosComponents/TodoAddForm";

export const ModalForAddNewEssence = ({
  setShowModalForAddNewPost,
  showModalForAddNewPost,
}) => {
  const location = useLocation();
  if (!showModalForAddNewPost) {
    return null;
  }
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
      ></div>
      <div
        className="modal show"
        style={{ display: "block", position: "fixed", zIndex: 1050 }}
      >
        <Modal.Dialog>
          <Modal.Header
            closeButton
            onClick={() => setShowModalForAddNewPost(false)}
          ></Modal.Header>
          <Modal.Body>
            {location.pathname === "/posts" ? (
              <PostAddForm
                setShowModalForAddNewPost={setShowModalForAddNewPost}
              />
            ) : (
              <TodoAddForm
                setShowModalForAddNewTodo={setShowModalForAddNewPost}
              />
            )}
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </div>
  );
};
