import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosIntance from "../axios/axios";
import { toast } from "react-toastify";

export const getAllProduct = createAsyncThunk(
    "/product/getAllProduct",
    async () => {
        try {
            const res = await axiosIntance.get("/product/getAllProduct");
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    "/product/create",
    async ({ productInfo, accessToken }) => {
        try {
            const res = await axiosIntance.post(
                "/product/create",
                productInfo,
                {
                    headers: {
                        token: `Beare ${accessToken}`,
                    },
                }
            );
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "/product/update",
    async ({ productUpdate, accessToken }) => {
        try {
            const res = await axiosIntance.put(
                "/product/update",
                productUpdate,
                {
                    headers: {
                        token: `Beare ${accessToken}`,
                    },
                }
            );
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "/product/delete",
    async ({ product_id, accessToken }) => {
        try {
            const res = await axiosIntance.delete("/product/delete", {
                headers: {
                    token: `Beare ${accessToken}`,
                },
                data: { product_id },
            });
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
);
