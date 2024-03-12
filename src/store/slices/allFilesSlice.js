import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allFiles: [],
}

const allFilesSlice = createSlice({
  name: 'allFiles',
  initialState,
  reducers: {
    setAllFiles(state, action) {
      state.allFiles = action.payload;
    }
  }
})

export const { setAllFiles } = allFilesSlice.actions;
export default allFilesSlice.reducer;
