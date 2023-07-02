import React, { createContext, useContext } from "react";
import { useGetsPhoto } from "../hooks/useGetsPhoto";

const PhotoContext = createContext(null);

export function PhotoProvider({ children }) {
  const methods = useGetsPhoto();

  return (
    <PhotoContext.Provider value={methods}>{children}</PhotoContext.Provider>
  );
}

export const useAlbums = () => useContext(PhotoContext);
