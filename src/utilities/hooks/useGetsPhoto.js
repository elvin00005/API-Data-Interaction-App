import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import { ALBUMS_API, PHOTOS_API, USER_API } from "../const/const";
import { useDeleteAlbum } from "./useDeleteAlbum";

export function useGetsPhoto() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { deleteAlbum } = useDeleteAlbum(setAlbums);

  const editUser = (id, data) => {
    setAlbums((prev) => {
      return prev.map((post) => {
        const { userName, ...rest } = data;
        if (post.id === id) {
          return { ...post, ...rest, user: { ...post.user, name: userName } };
        }
        return post;
      });
    });
  };
  const getAlbumsLists = async () => {
    return await Promise.all([
      axios.get(ALBUMS_API),
      axios.get(USER_API),
      axios.get(PHOTOS_API),
    ]);
  };

  useEffect(() => {
    setLoading(true);
    getAlbumsLists()
      .then(([albums, users, photos]) => {
        const userMap = _.keyBy(users.data, "id");
        const photosMap = _.groupBy(photos.data, "albumId");
        const albumsWithPhotos = albums.data.map((album) => {
          return {
            ...album,
            user: userMap[album.userId],
            photos: photosMap[album.id],
          };
        });
        setAlbums(albumsWithPhotos);
      })
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { albums, deleteAlbum, setAlbums, editUser };
}
