import { Route, Routes, useNavigate } from 'react-router';
import './App.css';
import Profile from './Components/Profile/Profile';
import  Expense from "./Components/ExpenseTracker/Expense";
import RootLayout from "./Components/Layout/Root";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './Store/auth-slice';
import { themeActions } from './Store/theme-slice';
import SignupLogin from './Components/LoginForm/SignupLogin';
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (

    <div className={`App ${(isLoggedIn && isDarkMode)?'darkTheme':'lightTheme'}`}>
      <Routes>
        <Route path='/' element={<SignupLogin/>}/>
        { isLoggedIn && <Route path='/profile' element={<Profile/>}/>}
       { isLoggedIn && <Route path='/profile/expense-tracker' element={<RootLayout/>}>
        <Route index element={<Expense/>}/>
        </Route>}
      </Routes>
    </div>
  )
}

export default App;
