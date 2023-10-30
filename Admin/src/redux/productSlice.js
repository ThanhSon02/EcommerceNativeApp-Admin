import { createSlice } from "@reduxjs/toolkit";
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    updateProduct,
} from "../service/productService";

const initialState = {
    allProduct: [],
    isLoading: false,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (build) => {
        build
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                const tempArray = [
                    ...state.allProduct,
                    action.payload.createdBook,
                ];
                tempArray.forEach((item, index) => {
                    item["key"] = index;
                });
                state.allProduct = tempArray;
                state.isLoading = false;
            })
            .addCase(getAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.allProduct = action.payload.allProduct;
                state.isLoading = false;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const productDeletedID = action.payload.productDeleted;
                const newProductList = state.allProduct.filter(
                    (prod) => prod._id !== productDeletedID
                );
                state.allProduct = newProductList;
                state.isLoading = false;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.allProduct.some((prod, index) => {
                    if (prod._id === action.payload.productUpdated._id) {
                        state.allProduct[index] = {
                            ...action.payload.productUpdated,
                            key: index,
                        };
                        return true;
                    }
                    return false;
                });
                state.isLoading = false;
            });
    },
});

export default productSlice;
