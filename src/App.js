import {Routes,Route} from 'react-router-dom'
import Chat from './pages/Chat.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import SetAvatar from './pages/SetAvatar.jsx';
import Reset from './pages/Reset.jsx';
import ConfirmReset from './pages/ConfirmReset.jsx';

function App() {
  const {user} =  useContext(AuthContext)
  return (
    <div className="App text-textbg">
      <Routes>
        <Route path='/chat' element = {user ? <Chat /> : <Login />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/register' element = {<Register />} />
        <Route path='/setAvi' element = {<SetAvatar />} />
        <Route path='/password-reset' element = {<Reset />} />
        <Route path='/confirm-reset/:id' element = {<ConfirmReset />} />
  
      </Routes>
    </div>
  );
}

export default App;
