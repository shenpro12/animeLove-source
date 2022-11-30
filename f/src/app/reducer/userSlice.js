import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  profile: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.login = true;
      state.profile = action.payload;
    },
    logout: (state) => {
      state.login = false;
      state.profile = {};
    },
    updateInventory: (state, action) => {
      state.profile.filmInventory = action.payload;
    },
  },
});
export const { login, logout, updateInventory } = userSlice.actions;
export const isLogin = (state) => state.user.login;
export const getProfile = (state) => state.user.profile;
export const getFilmInventory = (state) => state.user.profile.filmInventory;

export default userSlice.reducer;
