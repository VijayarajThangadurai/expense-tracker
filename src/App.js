import { Route, Routes } from 'react-router';
import './App.css';
import SigninForm from './Components/LoginForm/SigninForm';
import Profile from './Components/Profile/Profile';
//import UpdateProfileForm from './Components/Profile/UpdateProfileForm';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<SigninForm/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App;
