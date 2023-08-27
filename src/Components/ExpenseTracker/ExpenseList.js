import React, { useContext, useEffect } from "react";
import classes from "./ExpenseList.module.css";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../Store/expense-slice";
import { Button } from "react-bootstrap";
import axios from "axios";
import {FaCrown} from "react-icons/fa";
import { authActions } from "../Store/auth-slice";
import { themeActions } from "../Store/theme-slice";
const ExpenseList =(props)=>{
    // const expCtx=useContext(ExpenseContext);
const dispatch= useDispatch();
const auth = useSelector((state)=> state.auth);
const expense = useSelector((state)=>state.expenseStore);
    const editClickHandler =(item)=>{
        const filter = expense.items.filter((ele)=>ele !== item)
        // expCtx.editItem(item.filter);
        dispatch(expenseActions.editItems({item:item, filtered: filter}));
    };
    const dltClickHandler = async (item)=>{
        // expCtx.removeItem(item);
        dispatch(expenseActions.removeItem(item));
        const email = auth.userEmail.replace(/[\.@]/g,"");
        try{
            const res = await axios.get(
`https://expense-tracker-608fc-default-rtdb.firebaseio.com/${email}/expenses.json`
            );
            const data = res.data;
            const Id = Object.keys(data).find((eleId)=>data[eleId].id=== item.id);
            try{
                const res = await axios.delete(
                    `https://expense-tracker-608fc-default-rtdb.firebaseio.com/${email}/expenses/${Id}.json`
                );
            } catch (error){
                alert(error);
            }
        }catch(error){
            alert (error)
        }
    };

    const restoreItems = async ()=>{
        const email = auth.userEmail.replace(/[\.@]/g,"");
        try{
            const res = await axios.get(
                `https://expense-tracker-608fc-default-rtdb.firebaseio.com/${email}/expenses.json`
            );
            const data = res.data;
            if(data){
                const realData = Object.values(data).reverse();
                console.log(realData);
                dispatch(expenseActions.setItems(realData));
            }
        }catch(error){
            alert(error)
        }
    };
    useEffect(()=>{
        if(auth.userEmail !== null){
            restoreItems();
        }
    },[auth.userEmail]);

    let total = 0;
    expense.items.forEach((element)=>{
        total+= Number(element.enteredAmount);
    });

    const clickAccountPremiumHandler = async ()=>{
        dispatch(themeActions.toggelTheme());
        const email = auth.userEmail.replace(/[\.@]/g,"");
        try{
            const res = await axios.post(`https://expense-tracker-608fc-default-rtdb.firebaseio.com/${email}/userDetail.json`, {isPremium: true});
        }catch (error){
            alert(error)
        }
        dispatch(authActions.setIsPremium());
        localStorage.setItem('isPremium', true);
    };
    const clickDownloadHandler=()=>{
        const generateCSV =( itemsArr)=>{
            const csvRows =[];
            const headers =['Date','Description','Category','Amount'];
            csvRows.push(headers.join(','));

            itemsArr.forEach((i)=>{
                const row =[
                    i.date,
                    i.enteredDescription,
                    i.category,
                    i.enteredAmount
                ];
                csvRows.push(row.join(","));
            });
            return csvRows.join("\n");
        };
        const csvContent = generateCSV(expense.items);
        const blob= new Blob([csvContent],{type:"text/csv"});
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "expenses.csv";
        downloadLink.click();
    };
    return (
        <section className={classes.listCon}>
        <div className={classes.container}>
        <h1>Expenses</h1>
        <div className={classes.totalAmt}>
            <h3>Total Expense</h3>
            {total>=10000 && 
            (!auth.isPremium ? (
            <Button variant="danger" onClick={clickAccountPremiumHandler}>
                Activate Premium
                </Button>
            ):(
                <Button variant="warning" onClick={clickDownloadHandler}>
                    <FaCrown/>Download
                </Button>
            ))}
            <span>{total}</span>
        </div>
        {total>=10000 && <p style={{color:'red'}}>* Please Activate Premium Total Expense is More Than 10000</p>}
        </div>
            <ul>
               { expense.items.map((i, index)=>(
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