import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider = (props)=> {
    const [token, setToken] = useState(null);
    const [userEmail,setUserEmail] = useState(null);
    if(token == null && localStorage.length !== 0){
        setToken(localStorage["user"]);
    }
    const userLoggedIn = !!token;
    const loginHandler =(tokenId, email)=>{
            setToken(tokenId);
            setUserEmail(email);
            localStorage.setItem('user', tokenId);
        };
        const logoutHandler =()=>{
          
        }
        const AuthContext ={
            token: token,
            isLoggedIn: userLoggedIn,
            userEmail: userEmail,
            login: loginHandler,
            logout: logoutHandler,
        };
        return (
            <AuthContext.Provider value={AuthContext}>
                {props.children}
            </AuthContext.Provider>
        )
    };

export default AuthContextProvider;