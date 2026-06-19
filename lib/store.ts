import { configureStore } from '@reduxjs/toolkit';
import pricingReducer from './features/pricing/pricingSlice';
import { authApi } from './services/authApi';

export const store = configureStore({
  reducer: {
    pricing: pricingReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
