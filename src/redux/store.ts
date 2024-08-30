import {configureStore} from '@reduxjs/toolkit'
import { productAPI } from "./api/productApi";
import { userAPI } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderAPI } from "./api/orderApi";
import { dashboardApi } from './api/dashboardApi';

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware, productAPI.middleware, orderAPI.middleware, dashboardApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
// (mid) => [...mid(), userAPI.middleware, productAPI.middleware, orderAPI.middleware, dashboardApi.middleware],