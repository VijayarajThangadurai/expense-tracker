import React from "react";
import { Outlet } from "react-router";
import Profile from "../Profile/Profile";
const RootLayout =(props)=>{
 return(
    <>
    <Profile/>
    <Outlet/>
    </>
 )
}

export default RootLayout;