import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: null,
  error: null,
  loading: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    logInSuccess: (state, action) => {
      state.authUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    logInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { logInStart, logInSuccess, logInFailure } = userSlice.actions;
export default userSlice.reducer;
