import React, { useEffect, useRef, useState } from "react";
import { Button , Form} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classes from "./LoginForm.Module.css";
import ForgotPassForm from "./ForgotPassForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/auth-slice";
import { themeActions } from "../../Store/theme-slice";
import axios from "axios";

const LoginForm = (props) => {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const navigate = useNavigate();
  // const authCtx = useContext(AuthContext);
const [forgotVisible, setForgotVisible]= useState(false);
const [loading, setLoading] = useState(false);

const  dispatch = useDispatch();
const auth= useSelector((state)=>state.auth);
const [isVerifyEmail, setIsVerifyEmail] = useState(false);
const logoutTimerRef = useRef();



const startLogoutTimer = () => {
  clearTimeout(logoutTimerRef.current);
  logoutTimerRef.current = setTimeout(() => {
    handleLogout();
  }, 5*60000); 
};

const handleLogout = () => {
  clearTimeout(logoutTimerRef.current); 
  dispatch(authActions.logout());
  navigate("/");
};
// const submitLoginHandle = async (event) => {
//     event.preventDefault();
//    setLoading(true);
//     const enteredEmail = emailInputRef.current.value;
//     const enteredPass = passInputRef.current.value;

    
//     try {
//       const res = await fetch(
//         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQd8OqBeYkMSc2IPzMzCxiJVo_6D8hFwY",
//         {
//           method: "POST",
//           body: JSON.stringify({
//             email: enteredEmail,
//             password: enteredPass,
//             returnSecureToken: true,
//           }),
//           headers: {
//             "content-type": "application/json",
//           },
//         }
//       );
//      const data = await res.json();
//      console.log(data);
//      if(res.ok){
//       try{
//         const response = await fetch(
//         "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCQd8OqBeYkMSc2IPzMzCxiJVo_6D8hFwY"
//       , {
//         method: "POST",
//         body:JSON.stringify({
//           idToken: data.idToken,
//         }),
//         headers:{
//           "content-type":"application/json",
//         },
//       }
//       );
//       const userData = await response.json();
//       console.log(userData.users[0]);
//       if(!userData.user[0].emailVerified){
//         setIsVerifyEmail(true);
//         return;
//       } else{
//         setIsVerifyEmail(false);
//         navigate("profile/expense-tracker", {replace: true});
//         startLogoutTimer();
//         dispatch(
//           authActions.login({tokenId: data.idToken,email:data.email})
//         );
//         const email = enteredEmail.replace(/[\.@]/g, "");
//         const modeRes = await axios.get (
//           `https://expense-tracker-608fc-default-rtdb.firebaseio.com/${email}/userDetail.json`
//         );
//       if(modeRes.data){
//         dispatch(themeActions.toggelTheme());
//         dispatch(authActions.setIsPremium());
//         localStorage.setItem("isPremium", true);
//       }
//     }
//   }catch(error){
//     alert(error);
//   }
//      } else {
//         throw Error("Authentication Failed");
//       }
//     } catch (error) {
//       alert(error);
//     }
//     setLoading(false)
//   };

const submitLoginHandle = async (event) => {
  event.preventDefault();
  setLoading(true);
  const enteredEmail = emailInputRef.current.value;
  const enteredPass = passInputRef.current.value;

  try {
    // Step 1: Sign in with email and password
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
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      // Step 2: Check if email is verified
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[YOUR_API_KEY]",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: data.idToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userData = await response.json();

      if (userData.users && userData.users.length > 0 && !userData.users[0].emailVerified) {
        setIsVerifyEmail(true);
        return;
      } else {
        setIsVerifyEmail(false);
        navigate("profile/expense-tracker", { replace: true });
        startLogoutTimer();
        dispatch(
          authActions.login({ tokenId: data.idToken, email: data.email })
        );

        const emailWithoutSpecialChars = enteredEmail.replace(/[\.@]/g, "");
        const modeRes = await axios.get(
          `https://expense-tracker-608fc-default-rtdb.firebaseio.com/${emailWithoutSpecialChars}/userDetail.json`
        );

        if (modeRes.data) {
          dispatch(themeActions.toggleTheme());
          dispatch(authActions.setIsPremium());
          localStorage.setItem("isPremium", true);
        }
      }
    } else {
      throw new Error("Authentication Failed");
    }
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};


  const linkClickHandler=()=>{
    setForgotVisible(true);
  };

  useEffect(() => {
    if (auth.token) {
      startLogoutTimer();
    }
  }, [auth.token]);

  return (
    <>
    {forgotVisible? (
      <ForgotPassForm onReset={()=>setForgotVisible(false)}/>
    ):(
    <div className={classes.login}>
      <h1>Log In</h1>
      {isVerifyEmail && <p style={{color:'red'}}>Please verify email before login.</p>}
      <Form className="
      
      
      ">
        <Form.Group className="mb-3 " controlId="formBasicEmail">
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
         {!loading ? "Log in" : "Loading"}
        </Button>
      </Form>
    </div>
    )}
    </>
  );
};

export default LoginForm;