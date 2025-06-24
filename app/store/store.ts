import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "../components/card/CardGymSlice"
import loginSlice from "../components/button/loginSlice";
import { productsApi } from "./productApi";

export const store = configureStore({
  reducer: {
    card: cardSlice,
    auth: loginSlice,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(productsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
