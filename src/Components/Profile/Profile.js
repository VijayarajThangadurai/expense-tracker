import React, { Fragment, useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../Store/auth-context";
import classes from "./Profile.module.css";
import UpdateProfileForm from "./UpdateProfileForm";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/auth-slice";
import { expenseActions } from "../Store/expense-slice";

const Profile = (props) => {
  // const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const auth = useSelector((state)=>state.auth);
  const [userData, setUserData]= useState(null);
  const navigate = useNavigate();
  const location= useLocation();
  const isLocation = location.pathname ==="/profile";
  const updateVisibleHandler = async() => {
    try{
        const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCQd8OqBeYkMSc2IPzMzCxiJVo_6D8hFwY",{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idToken: auth.token,
                }),
            }
        );
        const data = await res.json();
        setUserData(data.users[0]);
    } catch(error){
        alert(error);
    }
};
useEffect(()=>{
  updateVisibleHandler()
},[]);

const clickLogoutHandler =()=>{
  // authCtx.logout();
  dispatch(authActions.logout());
  dispatch(expenseActions.setItemsEmpty());
  navigate('/',{replace: true});
};
const clickExpenseHandler=()=>{
navigate("/profile/expense-tracker",{replace:true});
}
;return (
  <Fragment>
  <section className={classes.proCon}>
    <div className={classes.header}>
      <div className={classes.headerDetail}>
      <h6>Welcome to Expense tracker</h6>
      <Button 
      variant="success"
      onClick={clickExpenseHandler}
      className={classes.expenseBtn}
      >
        Expense Tracker
      </Button>
      </div>
      <span className={classes.incomplete}>
        {!isLocation
          ? ("Your Profile is incomplete. ")
          :( <React.Fragment>Your profile <strong>x%</strong> completed.</React.Fragment>)}
        <button onClick={()=>navigate('/profile',{replace:true})}>Complete now</button>
      </span>
      <div>

      </div>
<div>
  <Button varient="danger" onClick={clickLogoutHandler}>Log Out</Button>
</div>
</div>
    </section>
    {isLocation && <UpdateProfileForm  user ={userData} update={updateVisibleHandler} />}

  </Fragment>
);
};

export default Profile;