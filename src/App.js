import { Route, Routes } from 'react-router';
import './App.css';
import SigninForm from './Components/LoginForm/SigninForm';
import Profile from './Components/Profile/Profile';
import  Expense from "./Components/ExpenseTracker/Expense";
import RootLayout from "./Components/Layout/Root";
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.auth.token !== null);
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const dispatch = useDispatch();
  return (

    <div className={`App ${(isLoggedIn && isDarkMode)?'darkTheme':'lightTheme'}`}>
      <Routes>
        <Route path='/' element={<SigninForm/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/expense-tracker' element={<RootLayout/>}/>
        <Route index element={<Expense/>}/>
      </Routes>
    </div>
  )
}

export default App;
