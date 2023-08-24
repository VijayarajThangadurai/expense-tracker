import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import ExpenseContext from "../Store/expense-context";
import classes from "./ExpenseForm.module.css";
import AuthContext from "../Store/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../Store/expense-slice";
const ExpenseForm =()=>{
const amountInputRef = useRef();
const descriptionInputRef= useRef();
const dateRef = useRef();
const categoryRef=useRef();
const formRef = useRef();
const auth = useSelector((state)=> state.auth);
const dispatch = useDispatch();
const expense = useSelector((state)=> state.expenseStore);
console.log(expense.editItems);
useEffect(()=>{
    if(expense.editItems !== null){
        amountInputRef.current.value = expense.editItems.enteredAmount
        descriptionInputRef.current.value = expense.editItems.enteredDescription
        dateRef.current.value= expense.editItems.date
        categoryRef.current.value= expense.editItems.category
    }
},[expense.editItems])

const clickAddHandler = async (e) =>{
    e.preventDefault();
    if(expense.editItems!== ""){
       dispatch(expenseActions.removeItem(expense.editItems));
       dispatch(expenseActions.setEditItemsNull());
    }
    const expDetail = {
        id: Math.random().toString(),
        enteredAmount: amountInputRef.current.value,
        enteredDescription: descriptionInputRef.current.value,
        date: dateRef.current.value,
        category: categoryRef.current.value,
    };
     formRef.current.reset();
    const email= auth.userEmail.replace(/[\.@]/g,"");
    try{
        const res = await axios.post(`https://expense-tracker-608fc-default-rtdb.firebaseio.com/${email}expenses.json`,expDetail)
    }catch(error){
alert(error)
    }
   dispatch(expenseActions.addItem(expDetail));
    formRef.current.reset();
};
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