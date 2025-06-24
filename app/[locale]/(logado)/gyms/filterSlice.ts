import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: { type: "all" },
  reducers: {
    setFilterType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
  },
});

export const { setFilterType } = filterSlice.actions;
export default filterSlice.reducer;