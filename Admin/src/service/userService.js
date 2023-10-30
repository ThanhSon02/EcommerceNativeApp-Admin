import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axios";
import { toast } from "react-toastify";

export const getAllUser = createAsyncThunk(
    "user/getAllUser",
    async ({ accessToken }) => {
        try {
            const res = await axiosInstance.get("/user/getAllUser", {
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

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async ({ userID, accessToken }) => {
        try {
            const res = await axiosInstance.delete("/user/deleteUser", {
                headers: {
                    token: `Beare ${accessToken}`,
                },
                data: {
                    userID,
                },
            });
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ userInfo, accessToken }) => {
        try {
            const res = await axiosInstance.put(
                "/user/update_info/",
                userInfo,
                {
                    headers: {
                        token: `Bearer ${accessToken}`,
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
