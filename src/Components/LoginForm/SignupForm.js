import { Button , Form, } from "react-bootstrap";
import React, { useRef, useState } from "react";
import classes from "./SignupForm.module.css";
const SignupForm =(props)=>{
const formRef = useRef();
const emailInputRef= useRef();
const passInputRef = useRef();
const confPassInputRef=useRef();
const [isLoading, setIsLoading]= useState(false);
const [verifyMail, setVerifymail]= useState(false);
const submitHandler = async(event)=>{
    event.preventDefault();
    setIsLoading(true);
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
            // console.log("Succesfully signed up");
            // alert("Successfully signed up")
            const data = await res.json();
            if(res.ok){
                try{
                    const response = await fetch(
                        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCQd8OqBeYkMSc2IPzMzCxiJVo_6D8hFwY",{
                            method: "POST",
                            body: JSON.stringify({
                                requestType: "VERIFY_EMAIL",
                                idToken: data.idToken,
                            }),
                            headers:{
                                "content-type": "application/json",
                            },
                        }
                    );
                if(response.ok){
                    setIsLoading(false);
                    alert("Verification email sent.");
                    setVerifymail(true);
                    setTimeout(()=>{
                        setVerifymail(false)
                    },10000)
                }else{
                    throw new Error ("Sign up failed.Try again.");
                }
            }catch(error){
                alert(error)
            }
        }else{
                throw Error("Authetication Failed");
            }
           }catch(error){
     alert(error);
     setIsLoading(false);
    };
    formRef.current.reset();
};
return(
    <div className={classes.signup}>
        <h1>Sign Up</h1>
        <Form ref={formRef}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password"
            placeholder="password"
            ref={passInputRef}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
            type="Password"
            placeholder="Confirm Password"
            ref={confPassInputRef}
            required
            />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitHandler}>{!isLoading ? 'Sign Up' : 'Sending request...'}</Button>
        {verifyMail && (
            <p style={{margin: "1rem", color: "green"}}> Please verify email. Verification mail already sent.</p>
        )}
        </Form>
    </div>
);
};

export default SignupForm;