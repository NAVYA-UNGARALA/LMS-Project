import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { courseProgressApi } from "@/features/api/courseProgress";
import { purchaseApi } from "@/features/api/purchaseApi";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
const rootReducer = combineReducers({
    [authApi.reducerPath] : authApi.reducer,
    [courseApi.reducerPath] : courseApi.reducer,
    [purchaseApi.reducerPath] : purchaseApi.reducer,
    [courseProgressApi.reducerPath] : courseProgressApi.reducer,
    auth:authReducer,
});



export default rootReducer;