import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../axios/axios";

export const getAllOrder = createAsyncThunk(
    "order/getAll",
    async ({ accessToken }) => {
        try {
            const res = await axiosInstance.get("/order/get-all-order", {
                headers: {
                    token: `Beare ${accessToken}`,
                },
            });
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
);
