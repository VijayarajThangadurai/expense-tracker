import { Route, Routes } from 'react-router';
import './App.css';
import SigninForm from './Components/LoginForm/SigninForm';
import Dummy from "./Components/Dummy/Dummy";
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<SigninForm/>}/>
        <Route path='/dummy' element={<Dummy/>}/>
      </Routes>
    </div>
  )
}

export default App;
