import axios from "axios";
import { toast } from "react-hot-toast";
import { ALBUMS_API } from "../const/const";

export const useDeleteAlbum = (setAlbums) => {
  const deleteAlbum = async (id) => {
    try {
      await axios.delete(`${ALBUMS_API}/${id}`);
      setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== id));

      let favorites = JSON.parse(localStorage.getItem("favoriteAlbums"));

      if (favorites) {
        favorites = favorites.filter((albumId) => albumId !== id);
        localStorage.setItem("favoriteAlbums", JSON.stringify(favorites));
      }

      toast.success("album deleted");
    } catch (error) {
      toast.error("album not deleted");
    }
  };
  return { deleteAlbum };
};
