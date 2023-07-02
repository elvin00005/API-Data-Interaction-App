import { useMemo, useState } from "react";
import { useFavoriteAlbums } from "../context/favoritiesAlbumsContext";
import { useAlbums } from "../context/albumsContext";

export function useFilterAlbums() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { favoriteAlbums, showFavorites, setShowFavorites } =
    useFavoriteAlbums();
  const { albums } = useAlbums();

  const uniqueUsers = Array.from(
    new Set(albums.map((album) => (album.user ? album.user.id : "Anonymous")))
  ).map((id) => {
    const album = albums.find((album) => album.user && album.user.id === id);
    return album ? album.user : { name: "Anonymous", id: "Anonymous" };
  });

  const userOptions = uniqueUsers.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  const filteredAlbums = useMemo(
    () =>
      albums.filter((album) => {
        const titleMatch = album.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const userMatch =
          selectedUsers.length === 0 ||
          selectedUsers.find((user) => user.value === album.userId);
        const favoriteMatch = showFavorites
          ? favoriteAlbums.includes(album.id)
          : true;
        return titleMatch && userMatch && favoriteMatch;
      }),
    [albums, searchTerm, selectedUsers, favoriteAlbums, showFavorites]
  );

  return {
    userOptions,
    searchTerm,
    selectedUsers,
    setSearchTerm,
    setSelectedUsers,
    setShowFavorites,
    filteredAlbums,
  };
}
