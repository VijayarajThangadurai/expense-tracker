import React, { useContext, useRef, useState } from "react";
import { Button , Form} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classes from "./LoginForm.Module.css";
import AuthContext from "../Store/auth-context";
import ForgotPassForm from "./ForgotPassForm";

const LoginForm = (props) => {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
const [forgotVisible, setForgotVisible]= useState(false);
  const submitLoginHandle = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQd8OqBeYkMSc2IPzMzCxiJVo_6D8hFwY",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
     const data = await res.json();
     if(res.ok){
      navigate("/profile/expense-tracker", { replace: true });
      authCtx.login(data.idToken, data.email);
      console.log(data.email);
     } else {
        throw Error("Authentication Failed");
      }
    } catch (error) {
      alert(error);
    }
  };

  const linkClickHandler=()=>{
    setForgotVisible(true);
  };

  return (
    <>
    {forgotVisible? (
      <ForgotPassForm onReset={()=>setForgotVisible(false)}/>
    ):(
    <div className={classes.login}>
      <h1>Log In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passInputRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
<Link onClick={linkClickHandler}>Forgot Password?</Link>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitLoginHandle}>
          Log in
        </Button>
      </Form>
    </div>
    )}
    </>
  );
};

export default LoginForm;