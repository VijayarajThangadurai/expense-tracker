import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider = (props)=> {
    const [token, setToken] = useState("");
    const [userEmail,setUserEmail] = useState("");
    if(token === "" && localStorage.length !== 0){
        setToken(localStorage["user"]);
    }
    const userLoggedIn = !!token;
    const loginHandler =(tokenId, email)=>{
            setToken(tokenId);
            setUserEmail(email);
            localStorage.setItem('user', tokenId);
        };
        const logoutHandler =()=>{
          setToken("");
          setUserEmail("");
          localStorage.removeItem('user');
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