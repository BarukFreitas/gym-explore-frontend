import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthPayload {
  id: number;
  username: string;
  email: string;
  roles: string[];
  token: string;
  points: number;
}


interface UserState {
  id: number | null;
  username: string | null;
  email: string | null;
  roles: string[] | null;
  token: string | null;
  points: number | null;
  isLoggedIn: boolean;
}


const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  roles: null,
  token: null,
  points: null, // Campo de pontos adicionado
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
      state.token = action.payload.token;
      state.points = action.payload.points;
      state.isLoggedIn = true;
    },

    clearCredentials: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.roles = null;
      state.token = null;
      state.points = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;