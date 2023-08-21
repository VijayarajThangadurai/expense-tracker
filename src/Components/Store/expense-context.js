import React from "react";

const ExpenseContext = React.createContext({
    item:[],
    editItems:{},
    addItem: (item)=>{},
    removeItem:(item)=>{},
    editItem:(item)=>{},
    onLogin:()=>{}
});

export default ExpenseContext;