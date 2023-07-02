import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";

export const ModalOfSelectPhoto = ({
  showPhotoModal,
  handleClosePopup,
  selectedPhoto,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (showPhotoModal) {
      const image = new Image();
      image.src = selectedPhoto;
      image.onload = () => {
        setIsLoading(false);
      };
    }
  }, [showPhotoModal, selectedPhoto]);

  if (!showPhotoModal) {
    return null;
  }

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal")) {
      handleClosePopup();
    }
  };

  return (
    <div>
      <div
        className="modal show"
        style={{
          display: "block",
          position: "fixed",
          zIndex: 1050,
        }}
        onClick={handleBackdropClick}
      >
        <Modal.Dialog>
          <Modal.Header closeButton onClick={handleClosePopup} />
          <Modal.Body>
            {isLoading ? (
              <Spinner animation="border" />
            ) : (
              <img
                src={selectedPhoto}
                alt="Full-size Image"
                style={{ width: "465px" }}
              />
            )}
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </div>
  );
};
