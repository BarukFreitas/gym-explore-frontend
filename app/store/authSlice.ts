import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Interface para os dados que a sua API de login retorna
//    Ela deve incluir o utilizador e o token
interface AuthPayload {
  id: number;
  username: string;
  email: string;
  roles: string[];
  token: string; // O token JWT
}

// 2. Interface para o estado da nossa fatia 'auth'
//    Agora ela inclui um campo para o token
interface UserState {
  id: number | null;
  username: string | null;
  email: string | null;
  roles: string[] | null;
  token: string | null; // O token será guardado aqui
  isLoggedIn: boolean;
}

// 3. Estado inicial atualizado
const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  roles: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 4. A ação 'setCredentials' agora espera receber o payload completo, incluindo o token
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
      state.token = action.payload.token; // Guarda o token no estado
      state.isLoggedIn = true;
    },
    // A ação 'clearCredentials' agora também limpa o token
    clearCredentials: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.roles = null;
      state.token = null; // Limpa o token
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;