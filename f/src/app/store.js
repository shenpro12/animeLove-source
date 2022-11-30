import { configureStore } from "@reduxjs/toolkit";
import animeListReducer from "./reducer/animeSlice";
import userReducer from "./reducer/userSlice";

export const store = configureStore({
  reducer: {
    animeList: animeListReducer,
    user: userReducer,
  },
});
