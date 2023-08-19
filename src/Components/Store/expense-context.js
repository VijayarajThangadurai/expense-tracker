import React from "react";

const ExpenseContext = React.createContext({
    item:[],
    addItem: (item)=>{},
    removeItem:(item)=>{}
});

export default ExpenseContext;