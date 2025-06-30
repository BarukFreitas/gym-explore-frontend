import { configureStore } from "@reduxjs/toolkit";
import { gymsApi } from "./gymsApi";
import { productsApi } from "./productApi";
import { authApi } from "./authApi";
import { postApi } from "./postApi";
import authReducer from "./authSlice";
import filterReducer from "../[locale]/(logado)/gyms/filterSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [gymsApi.reducerPath]: gymsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    auth: persistedAuthReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(gymsApi.middleware, productsApi.middleware, authApi.middleware, postApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;