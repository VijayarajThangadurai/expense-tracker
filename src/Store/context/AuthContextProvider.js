import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";
import ExpenseContext from "./expense-context";
const AuthContextProvider = (props)=> {
    const initialToken = localStorage.getItem('user');
    const initialUserEmail=localStorage.getItem('userEmail');
    const [token, setToken] = useState(initialToken);
    const [userEmail,setUserEmail] = useState(initialUserEmail);
   const expCtx = useContext(ExpenseContext);
    // if(token === "" && localStorage.length !== 0){
    //     setToken(localStorage["user"]);
    //     setUserEmail(localStorage['userEmail'])
    // }

    const userLoggedIn = !!token;
    const loginHandler =(tokenId, email)=>{
            setToken(tokenId);
            setUserEmail(email);
            expCtx.login();
            localStorage.setItem('user', tokenId);
            localStorage.setItem('userEmail', email);
        };
        const logoutHandler =()=>{
          setToken("");
          setUserEmail("");
          expCtx.items =[];
          localStorage.removeItem('user');
          localStorage.removeItem('userEmail');
        };

        setTimeout(()=>{
            logoutHandler();
        }, 5*60000);
        const authContext ={
            token: token,
            isLoggedIn: userLoggedIn,
            userEmail: userEmail,
            login: loginHandler,
            logout: logoutHandler,
        };
        return (
            <AuthContext.Provider value={authContext}>
                {props.children}
            </AuthContext.Provider>
        )
    };

export default AuthContextProvider;