import { Route, Routes } from 'react-router';
import './App.css';
import SigninForm from './Components/LoginForm/SigninForm';
import Profile from './Components/Profile/Profile';
import ExpenseForm from './Components/ExpenseTracker/ExpenseForm';
import  Expense from "./Components/ExpenseTracker/Expense";
import ExpenseProvider from "./Components/Store/ExpenseContext";
import RootLayout from "./Components/Layout/Root";
function App() {
  return (
    <ExpenseProvider>
    <div className='App'>
      <Routes>
        <Route path='/' element={<SigninForm/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/expense-tracker' element={<RootLayout/>}/>
        <Route index element={<Expense/>}/>
      </Routes>
    </div>
    </ExpenseProvider>
  )
}

export default App;
