import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  email: string | null;
  picture: string | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  picture: null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.picture = action.payload.picture;
    },
    clearUser: (state) => {
      state.name = null;
      state.email = null;
      state.picture = null;
    },
  },
});

export const { setUser, clearUser } = loginSlice.actions;
export default loginSlice.reducer;
