import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import cn from "classnames";
import {
  ButtonToAddToFavorites,
  DeleteButton,
  EditButton,
} from "../../utilities/const/Buttons";
import { FormForUpdateAlbum } from "./FormForUpdateAlbums";
import { useFavoriteAlbums } from "../../utilities/context/favoritiesAlbumsContext";

import styles from "./AlbumCard.module.scss";

export const AlbumsCard = ({
  album,
  selectedAlbums,
  setSelectedAlbums,
  setSelectedAlbumsId,
  setShowModalOfDelete,
}) => {
  const { favoriteAlbums, handleToggleAddFavoriteAlbums } = useFavoriteAlbums();

  const [isEdit, setIsEdit] = useState(false);
  const handleCloseEdit = () => setIsEdit(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const userMainData = {
    title: album?.title,
    userName: album?.user?.name,
  };
  if (isEdit) {
    return (
      <div
        key={album.id}
        className="d-flex flex-column bg-light p-3 m-1 rounded"
      >
        <FormForUpdateAlbum
          id={album?.id}
          editedAlbum={userMainData}
          handleCloseEdit={handleCloseEdit}
        />
      </div>
    );
  }

  return (
    <Card
      className={`${styles.container} ${
        favoriteAlbums.includes(album.id) ? "bg-warning" : "bg-light"
      }`}
    >
      <div>
        <Form.Check
          className={styles.check}
          checked={selectedAlbums.includes(album.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedAlbums([...selectedAlbums, album.id]);
            } else {
              setSelectedAlbums(
                selectedAlbums.filter((albumId) => albumId !== album.id)
              );
            }
          }}
        />
        <h3>
          <Link to={`/photo/${album.id}`}>{album?.title}</Link>
        </h3>
        <h5>{album?.user?.name}</h5>
      </div>
      <div className={cn(styles.bntsDiv, "d-flex justify-content-center")}>
        <EditButton onClick={handleEdit} />
        <ButtonToAddToFavorites
          onClick={() => handleToggleAddFavoriteAlbums(album.id)}
        />
        <DeleteButton
          onClick={() => {
            setSelectedAlbumsId(album.id);
            setShowModalOfDelete(true);
          }}
        />
      </div>
    </Card>
  );
};
