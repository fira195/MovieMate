import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: localStorage.getItem("username") || "",
    bio: localStorage.getItem('bio') || ''
  },
  reducers: {
    login(state, action) {
      const {  username, bio } = action.payload;
      localStorage.setItem("username", username);
      localStorage.setItem('bio', bio)

      state.username = username;
      state.bio = bio;
    },
    logout(state) {
      localStorage.removeItem("accessToken");   
      localStorage.removeItem("username");
      localStorage.removeItem("bio");
      state.bio = "";
      state.username = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
