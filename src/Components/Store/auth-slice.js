import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={
    token: localStorage.getItem('user'),
    userEmail:localStorage.getItem('userEmail'),
};

const authSlice = createSlice({
    name:"authentication",
    initialState: initialAuthState,
    reducers:{
        login(state, action){
        state.token= action.payload.tokenId;
        state.userEmail= action.payload.email;
        localStorage.setItem("user",action.payload.tokenId);
        localStorage.setItem("userEmail", action.payload.email);
        },
        logout(state){
            state.token = null;
            state.userEmail = null;
            localStorage.removeItem("user");
            localStorage.removeItem("userEmail");
        },
    },
}) ;

export const authActions = authSlice.actions;
export default authSlice.reducer;