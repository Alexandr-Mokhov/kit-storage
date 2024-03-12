import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
}

const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    }
  }
})

export const { setLoggedIn } = loggedInSlice.actions;
export default loggedInSlice.reducer;
