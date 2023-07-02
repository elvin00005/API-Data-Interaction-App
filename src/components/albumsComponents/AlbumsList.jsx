import React from "react";
import { AlbumsCard } from "./AlbumsCard";

export const AlbumsList = ({
  setShowModalOfDelete,
  albums,
  setSelectedAlbums,
  selectedAlbums,
  setSelectedAlbumsId,
}) => {
  return (
    <div>
      {albums.map((album) => (
        <AlbumsCard
          key={album.id}
          album={album}
          selectedAlbums={selectedAlbums}
          setSelectedAlbums={setSelectedAlbums}
          setShowModalOfDelete={setShowModalOfDelete}
          setSelectedAlbumsId={setSelectedAlbumsId}
        />
      ))}
    </div>
  );
};
