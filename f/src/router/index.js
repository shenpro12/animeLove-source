import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import ErrorPage from "../features/errorPage/ErrorPage";
import HomePage from "../features/homePage/HomePage";
import DetailPage from "../features/detailPage/DetailPage";
import DetailItem from "../features/detailPage/DetailItem";
import Video from "../features/video/Video";
import Category from "../features/category/Category";
import Top from "../features/top/Top";
import Layout from "../features/layout/Layout";
import Library from "../features/library/Library";
import Loginpage from "../features/login/LoginPage";
import Profile from "../features/profile/Profile";
import FilmInventory from "../features/filmInventory/FilmInventory";
import Watched from "../features/watched/Watched";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/anime/:name",
            element: <DetailPage />,
            children: [
              { path: "/anime/:name", element: <DetailItem /> },
              { path: "/anime/:name/:episode", element: <Video /> },
            ],
            errorElement: <ErrorPage />,
          },
          { path: "/anime/watched", element: <Watched /> },
          { path: "/category/:type", element: <Category /> },
          { path: "/voted", element: <Top /> },
          { path: "/login", element: <Loginpage /> },
          { path: "/profile", element: <Profile /> },
          { path: "/inventory", element: <FilmInventory /> },
          { path: "/", element: <HomePage /> },
        ],
      },
      {
        path: "/library",
        element: <Library />,
      },
    ],
  },
]);

export default router;
