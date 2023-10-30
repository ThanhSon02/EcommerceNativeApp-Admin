import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        auth: authSlice.reducer,
        users: userSlice.reducer,
    },
});

export default store;
