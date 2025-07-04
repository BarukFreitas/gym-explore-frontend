import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Interface para os dados que a sua API de login retorna
//    Certifique-se de que a sua API retorna os pontos no login
interface AuthPayload {
  id: number;
  username: string;
  email: string;
  roles: string[];
  token: string;
  points: number; // Campo de pontos adicionado
}

// 2. Interface para o estado da nossa fatia 'auth'
//    Agora ela inclui um campo para os pontos
interface UserState {
  id: number | null;
  username: string | null;
  email: string | null;
  roles: string[] | null;
  token: string | null;
  points: number | null; // Campo de pontos adicionado
  isLoggedIn: boolean;
}

// 3. Estado inicial atualizado
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
    // 4. A ação 'setCredentials' agora espera receber o payload completo, incluindo os pontos
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
      state.token = action.payload.token;
      state.points = action.payload.points; // Guarda os pontos no estado
      state.isLoggedIn = true;
    },
    // A ação 'clearCredentials' agora também limpa os pontos
    clearCredentials: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.roles = null;
      state.token = null;
      state.points = null; // Limpa os pontos
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;