import React, { useState } from "react";

import { Layout } from "../components/layout/Layout";
import { useAlbums } from "../utilities/context/albumsContext";
import { useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { ModalOfSelectPhoto } from "../components/albumsComponents/ModalOfSelectPhoto";

const AlbumPhotos = () => {
  const { albumId } = useParams();
  const { albums } = useAlbums();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const photos = albums.filter((album) => {
    if (album.id === +albumId) {
      return album;
    }
  });

  const handlePhotoClick = (photoUrl) => {
    setSelectedPhoto(photoUrl);
  };
  const handleClosePopup = () => {
    setSelectedPhoto(null);
    setShowPhotoModal(false);
  };
  return (
    <Layout>
      <ModalOfSelectPhoto
        selectedPhoto={selectedPhoto}
        showPhotoModal={showPhotoModal}
        handleClosePopup={handleClosePopup}
      />
      <h2 className="text-center">Album Photos</h2>
      <div className="d-flex flex-wrap gap-3 justify-content-between bg-light p-2 ">
        {photos[0]?.photos.map((photo) => (
          <Card key={photo.id} style={{ width: "11rem" }}>
            <Card.Img
              variant="top"
              alt={photo.title}
              src={photo.thumbnailUrl}
              onClick={() => {
                handlePhotoClick(photo.url);
                setShowPhotoModal(true);
              }}
            />{" "}
            <Card.Body>
              <Card.Title>{photo.title}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush"></ListGroup>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default AlbumPhotos;
