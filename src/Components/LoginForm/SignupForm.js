import { Button , Form, } from "react-bootstrap";
import React, { useRef } from "react";
import classes from "./SignupForm.module.css";
const SignupForm =(props)=>{
const formRef = useRef();
const emailInputRef= useRef();
const passInputRef = useRef();
const confPassInputRef=useRef();

const submitHandler = async(event)=>{
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    const enteredConfPass = confPassInputRef.current.value;
    if(enteredPass !== enteredConfPass){
        alert("Password not matched with COnfirm password.");
    }try{
        const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQd8OqBeYkMSc2IPzMzCxiJVo_6D8hFwY",{
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
            console.log("Succesfully signed up");
            alert("Successfully signed up")
            if(!res.ok){
                throw Error("Authetication Failed");
            }
            formRef.current.reset();
    } catch(error){
     alert(error);
    };
};
return(
    <div className={classes.signup}>
        <h1>Sign Up</h1>
        <Form ref={formRef}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
            type="email"
            placeHolder="Enter email"
            ref={emailInputRef}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password"
            placeHolder="password"
            ref={passInputRef}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
            type="Password"
            placeHolder="Confirm Password"
            ref={confPassInputRef}
            required
            />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitHandler}>Sign Up</Button>
        </Form>
    </div>
);
};

export default SignupForm;