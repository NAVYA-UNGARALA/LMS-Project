import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { courseProgressApi } from "@/features/api/courseProgress";
import { purchaseApi } from "@/features/api/purchaseApi";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
export const appStore = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer, 
        [purchaseApi.reducerPath]: purchaseApi.reducer,
        [courseProgressApi.reducerPath]: courseProgressApi.reducer,
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware,courseApi.middleware,purchaseApi.middleware,courseProgressApi.middleware),
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();