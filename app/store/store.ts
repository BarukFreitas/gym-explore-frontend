import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productApi";
import { authApi } from "./authApi";
import filterReducer from "../[locale]/(logado)/gyms/filterSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;