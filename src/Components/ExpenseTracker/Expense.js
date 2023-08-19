import React, { Fragment } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
const Expense = ()=>{
    return (
        <Fragment>
            <ExpenseForm/>
            <ExpenseList/>
        </Fragment>
    );
};

export default Expense;