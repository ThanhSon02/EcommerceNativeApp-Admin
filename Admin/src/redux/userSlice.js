import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getAllUser } from "../service/userService";

const initialState = {
    userList: [],
    isLoading: false,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.fulfilled, (state, action) => {
                const tempArray = action.payload.allUser;
                tempArray.forEach((item, index) => {
                    item["key"] = index;
                });
                state.userList = tempArray;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const emailOfUserDeleted = action.payload.email;
                const newUserList = state.userList.filter(
                    (item) => item.email !== emailOfUserDeleted
                );
                state.userList = newUserList;
            });
    },
});

export default userSlice;
