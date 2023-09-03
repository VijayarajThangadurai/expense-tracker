import axios from "axios";
import React, {  useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import classes from "./ExpenseForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store/expense-slice";
const ExpenseForm =()=>{
const amountInputRef = useRef();
const descriptionInputRef= useRef();
const dateRef = useRef();
const categoryRef=useRef();
const formRef = useRef();
const auth = useSelector((state)=> state.auth);
const dispatch = useDispatch();
const expense = useSelector((state)=> state.expenseStore);
const [isInputValid, setIsInputValid] = useState(true);
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
    if(
        amountInputRef.current.value === "" ||
        descriptionInputRef.current.value === "" ||
        dateRef.current.value === ""
    ){
        setIsInputValid(true);
        return;
    }
        setIsInputValid(true);
    if(expense.editItems!== null){
        console.log(expense.editItems);
        const email = auth.userEmail.replace(/[\.@]/g, "");
        try{
            const res = await axios.get(`https://expense-tracker-608fc-default-rtdb.firebaseio.com/${email}/expenses.json`);
            const data = res.data;
            const Id= Object.keys(data).find(
                (eleId) => data[eleId].id === expense.editItems.id
            );
            try{
                const resDlt = await axios.delete(
                    `https://expense-tracker-608fc-default-rtdb.firebaseio.com/${email}/expenses/${Id}.json`
                );
            } catch(error){
                alert(error)
            }
        }catch(error){
            alert(error);
        }
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
    const email= auth.userEmail.replace(/[\.@]/g, "");
    console.log(email);
    try{
        const res = await axios.post
        (`https://expense-tracker-608fc-default-rtdb.firebaseio.com/${email}/expenses.json`,expDetail)
    }catch(error){
alert(error)
    }
   dispatch(expenseActions.addItem(expDetail));
    formRef.current.reset();
};
return(
    <section className={classes.expenseCon}>
        <form ref={formRef}>
            {!isInputValid && <p style={{color:'red'}}>*Please fill all input.</p>}
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