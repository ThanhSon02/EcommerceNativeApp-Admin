import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axios";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
    "auth/login",
    async ({ loginInfo, navigate }) => {
        try {
            const res = await axiosInstance.post("/auth/login", loginInfo);
            toast.success(res.data.message);
            navigate("/dashboard");
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async ({ accessToken }) => {
        try {
            await axiosInstance.post(
                "/auth/logout",
                {},
                {
                    headers: {
                        token: `Beare ${accessToken}`,
                    },
                }
            );
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
);
