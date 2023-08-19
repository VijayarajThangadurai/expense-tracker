import React, { useState } from "react";
import ExpenseContext from "./expense-context";

const ExpenseProvider = props =>{
    const [itemsArr, setItemsArr]= useState([]);
    const addItemHandler =(item)=>{
        setItemsArr([item, ...itemsArr]);
    };
    console.log(itemsArr);
    const removeItemHandler= (item)=>{

    }
    const expenseContext ={
        items:itemsArr,
        addItem: addItemHandler,
        removeItem:removeItemHandler
    };
    return(
        <ExpenseContext.Provider value={expenseContext}>
            {props.children}
        </ExpenseContext.Provider>
    )
};

export default ExpenseProvider;