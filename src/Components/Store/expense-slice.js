import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UseSelector } from "react-redux/es/hooks/useSelector";

const initialState ={
    items:[],
    editItems:null,
};

const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers:{
        addItem(state, action){
            state.items =[action.payload, ...state.items];
        },
        removeItem(state, action){
            const itemId = action.payload.id;
            state.items = state.items.filter((item)=> item.id !== itemId);
        },
        editItems(state,action){
            state.editItems = action.payload.item;
            state.items = action.payload;
        },
        setItems(state, action){
            state.items = action.payload;
        },
      setEditItemsNull(state){
        state.items =[];
      }
    },
});
console.log(initialState.items);

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;