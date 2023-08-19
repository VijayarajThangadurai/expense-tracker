import { Route, Routes } from 'react-router';
import './App.css';
import SigninForm from './Components/LoginForm/SigninForm';
import Profile from './Components/Profile/Profile';
import ExpenseForm from './Components/ExpenseTracker/ExpenseForm';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<SigninForm/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/expense-tracker' element={<ExpenseForm/>}/>
      </Routes>
    </div>
  )
}

export default App;
