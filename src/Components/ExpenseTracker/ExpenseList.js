import React, { useContext } from "react";
import ExpenseContext from "../Store/expense-context";
const ExpenseList =(props)=>{
    const expCtx=useContext(ExpenseContext);
    return (
        <section className={classes.listCon}>
            <h1>Expenses</h1>
            <ul>
                {expCtx.items.map((i, index)=>(
                    <li className={classes.listItem} key={index}>
                     <div className={classes.date}>{i.date}</div>
                     <h3 className={classes.category}>{i.category.toUpperCase()}</h3>
                     <div className={classes.des}>{i.enteredDescription}</div>
                     <div className={classes.Amt}>{i.enteredAmount}</div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ExpenseList;