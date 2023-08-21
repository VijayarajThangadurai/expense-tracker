import React, { useContext } from "react";
import ExpenseContext from "../Store/expense-context";
import classes from "./ExpenseList.module.css";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
const ExpenseList =(props)=>{
    const expCtx=useContext(ExpenseContext);

    const editClickHandler =(item)=>{
        const filter = expCtx.items.filter((ele)=>ele !== item)
        expCtx.editItem(item.filter);
    }
    const dltClickHandler = item =>{
        expCtx.removeItem(item);
    };
    return (
        <section className={classes.listCon}>
            <h1>Expenses</h1>
            <ul>
               { expCtx.items.map((i, index)=>(
                    <li className={classes.listItem} key={index}>
                     <div className={classes.date}>{i.date}</div>
                     <h3 className={classes.category}>{i.category.toUpperCase()}</h3>
                     <div className={classes.des}>{i.enteredDescription}</div>
                     <div className={classes.Amt}>{i.enteredAmount}</div>
                     <div className={classes.btn}>
                        <button className={classes.edit} onClick={()=>editClickHandler(i)}>
                            <AiFillEdit/>
                        </button>
                        <button className={classes.dlt} onClick={()=>dltClickHandler(i)}>
                            <AiFillDelete/>
                        </button>
                     </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ExpenseList;