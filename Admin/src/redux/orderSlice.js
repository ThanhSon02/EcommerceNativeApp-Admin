import { createSlice } from "@reduxjs/toolkit";
import { getAllOrder } from "../../service/orderService";

const initialState = {
    orderList: [],
    isLoading: false,
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                const tempArray = action.payload.allOrder;
                tempArray.forEach((item, index) => {
                    item["key"] = index;
                });
                state.orderList = tempArray;
                state.isLoading = false;
            });
    },
});

export default orderSlice;
