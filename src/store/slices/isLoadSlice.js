import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoad: false,
}

const isLoadSlice = createSlice({
  name: 'isLoad',
  initialState,
  reducers: {
    setIsLoad(state, action) {
      state.isLoad = action.payload;
    }
  }
})

export const { setIsLoad } = isLoadSlice.actions;
export default isLoadSlice.reducer;