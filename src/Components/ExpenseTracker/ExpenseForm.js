import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import ExpenseContext from "../Store/expense-context";
import classes from "./ExpenseForm.module.css";
import AuthContext from "../Store/auth-context";
const ExpenseForm =()=>{
const amountInputRef = useRef();
const descriptionInputRef= useRef();
const dateRef = useRef();
const categoryRef=useRef();
const formRef = useRef();

const expCtx = useContext(ExpenseContext);
const authCtx= useContext(AuthContext);
useEffect(()=>{
    if(expCtx.editItems !== ""){
        amountInputRef.current.value = expCtx.editItems.enteredAmount
        descriptionInputRef.current.value = expCtx.editItems.enteredDescription
        dateRef.current.value= expCtx.editItems.date
        categoryRef.current.value= expCtx.editItems.category
    }
},[expCtx.editItems])

const clickAddHandler = async e =>{
    e.preventDefault();
    if(expCtx.editItems!== ""){
        expCtx.removeItem(expCtx.editItems);
        expCtx.editItems={};
    }
    const expDetail = {
        id: Math.random().toString(),
        enteredAmount: amountInputRef.current.value,
        enteredDescription: descriptionInputRef.current.value,
        date: dateRef.current.value,
        category: categoryRef.current.value,
    };
     formRef.current.reset();
    const email= authCtx.userEmail.replace(/[\.@]/g,"");
    try{
        const res = await axios.post(`https://expense-tracker-608fc-default-rtdb.firebaseio.com/${email}expenses.json`,expDetail)
    }catch(error){
alert(error)
    }
    expCtx.addItem(expDetail);
    formRef.current.reset();
}
return(
    <section className={classes.expenseCon}>
        <form ref={formRef}>
            <section>
                <div className={classes.amt}>
                    <label htmlFor="Amount">Amount</label>
                    <input type="number" ref={amountInputRef}/>
                </div>
                <div>
                <label htmlFor="description">Discription</label>
                    <input type="text" ref={descriptionInputRef}/>
                </div>
                <div>
                <label htmlFor="date">Date</label>
                    <input type="date" ref={dateRef}/>
                </div>
                <div>
                <label htmlFor="category">Category</label>
                    <select  ref={categoryRef}>
                    <option value="food">Food</option>
                    <option value="petrol">Petrol</option>
                    <option value="salary">Salary</option>
                    <option value ="other">Other</option>
                    </select>
                </div>
            </section>
            <Button type="submit" onClick={clickAddHandler}>Add Expense</Button>
        </form>
    </section>
);
};

export default ExpenseForm;