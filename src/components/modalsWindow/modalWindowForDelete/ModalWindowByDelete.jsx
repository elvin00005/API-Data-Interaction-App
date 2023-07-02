import { Button, Modal } from "react-bootstrap/";

export const ModalForDelete = ({ show, onHide, deletePost, id }) => {
  if (!show) {
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
            onClick={() => onHide(false)}
          ></Modal.Header>
          <Modal.Body>
            <p className="text-center m-0">
              Are you sure you want to delete the post?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                onHide(false);
              }}
            >
              NO
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                deletePost(id);
                onHide(false);
              }}
            >
              YES
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};
