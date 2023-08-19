import React, { useEffect, useState } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider = (props)=> {
    const [token, setToken] = useState("");
    const [userEmail,setUserEmail] = useState("");
    const onRefresh=()=>{
    if(token === "" && localStorage.length !== 0){
        setToken(localStorage["user"]);
        setUserEmail(localStorage['userEmail'])
    }
    }

    useEffect(()=>{
        onRefresh();
    },[]);
    const userLoggedIn = !!token;
    const loginHandler =(tokenId, email)=>{
            setToken(tokenId);
            setUserEmail(email);
            localStorage.setItem('user', tokenId);
            localStorage.setItem('userEmail', email);
        };
        const logoutHandler =()=>{
          setToken("");
          setUserEmail("");
          localStorage.removeItem('user');
          localStorage.removeItem('userEmail');
        }
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