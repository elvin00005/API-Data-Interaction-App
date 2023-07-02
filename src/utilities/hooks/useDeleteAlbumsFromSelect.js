import axios from "axios";
import { toast } from "react-hot-toast";
import { useAlbums } from "../context/albumsContext";
import { useFavoriteAlbums } from "../context/favoritiesAlbumsContext";
import { ALBUMS_API } from "../const/const";

export const useDeleteAlbumsFromSelect = (setSelectedAlbums) => {
  const { setAlbums } = useAlbums();
  const { setFavoriteAlbums } = useFavoriteAlbums();
  const deleteAlbums = async (selectedAlbums) => {
    const albumsToDelete = [...selectedAlbums];

    const deleteRequests = albumsToDelete.map((albumId) =>
      axios.delete(`${ALBUMS_API}/${albumId}`)
    );
    try {
      await Promise.all(deleteRequests);

      setAlbums((prevAlbums) => {
        const filtered = prevAlbums.filter(
          (album) => !albumsToDelete.includes(album.id)
        );
        return filtered;
      });

      setFavoriteAlbums((prevFavoriteAlbums) => {
        const newFavoriteAlbums = prevFavoriteAlbums.filter(
          (albumId) => !albumsToDelete.includes(albumId)
        );
        localStorage.setItem(
          "favoriteAlbums",
          JSON.stringify(newFavoriteAlbums)
        );
        return newFavoriteAlbums;
      });

      setSelectedAlbums((prevSelectedAlbums) =>
        prevSelectedAlbums.filter(
          (albumId) => !albumsToDelete.includes(albumId)
        )
      );
      toast.success("Selected albums removed");
    } catch (error) {
      toast.error("Failed to delete some albums");
    }
  };

  return { deleteAlbums };
};
