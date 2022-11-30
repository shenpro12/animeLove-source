import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animeList: [],
};

export const animeListSlice = createSlice({
  name: "animeList",
  initialState,
  reducers: {
    add: (state, action) => {
      state.animeList = action.payload;
    },
  },
});
export const { add } = animeListSlice.actions;
export const selectAnimeList = (state) => state.animeList;

export default animeListSlice.reducer;
