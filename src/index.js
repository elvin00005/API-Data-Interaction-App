import React from "react";
import ReactDOM from "react-dom";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Todos from "./pages/Todos";
import Albums from "./pages/Albums";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";
import { FavoriteProviderPosts } from "./utilities/context/favoritiesPostsContext";
import { PostsProvider } from "./utilities/context/postsContext";
import { PhotoProvider } from "./utilities/context/albumsContext";
import AlbumPhotos from "./pages/AlbumPhotos";
import { FavoriteProviderALbums } from "./utilities/context/favoritiesAlbumsContext";
import { TodosProvider } from "./utilities/context/todosContext";
import { FavoriteProviderTodos } from "./utilities/context/favoritiesTodosContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/posts",
    element: (
      <PostsProvider>
        <FavoriteProviderPosts>
          <Posts />
        </FavoriteProviderPosts>
      </PostsProvider>
    ),
  },
  {
    path: "/todos",

    element: (
      <TodosProvider>
        <FavoriteProviderTodos>
          <Todos />
        </FavoriteProviderTodos>
      </TodosProvider>
    ),
  },
  {
    path: "/albums",
    element: (
      <PhotoProvider>
        <FavoriteProviderALbums>
          <Albums />
        </FavoriteProviderALbums>
      </PhotoProvider>
    ),
  },
  {
    path: "/photo/:albumId",
    element: (
      <PhotoProvider>
        <FavoriteProviderALbums>
          <AlbumPhotos />
        </FavoriteProviderALbums>
      </PhotoProvider>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </React.StrictMode>
);
