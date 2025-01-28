import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null, 
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      console.log(action.payload)
      state.user = action.payload.user;
      state.token=action.payload.token;
    },
    clearSession: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
