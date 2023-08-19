import React, { useState } from "react";
import ExpenseContext from "./expense-context";

const ExpenseProvider = props =>{
    const [itemsArr, setItemsArr]= useState([]);
    const authCtx = useContext(AuthContext);

  const restoreItems = async () => {
    const email = localStorage['userEmail'].replace(/[\.@]/g, "");
    console.log(email)
    try {
      const res = await axios.get(`https://expense-tracker-608fc-default-rtdb.firebaseio.com/${email}expenses.json`)
      const data = res.data;

      const realData = Object.values(data).reverse();
      // console.log(realData)
      setItemsArr(realData);
    } catch(error){
      alert(error)
    }
  };
  useEffect(() => {
    restoreItems();
  },[]);
  useEffect(() => {
    restoreItems();
  },[authCtx.userEmail]);
      const addItemHandler =(item)=>{
        setItemsArr([item, ...itemsArr]);
    };
    // console.log(itemsArr);
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