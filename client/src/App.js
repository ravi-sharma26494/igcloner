import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile'; 
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducers/userReducer';

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate();
  //  const {userstate, dispatchUserState}=useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      // dispatchUserState({type:'USER', payload:user})
      navigate('/')
    } else{
      navigate('/login')
    }
  
  },[])
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <Navbar />
        <Routes>
          <Route exact path ="/" element ={<Home />} />
          <Route path ="/login" element ={<Login />} />
          <Route path ="/profile" element ={<Profile />} />
          <Route path ="/signup" element ={<Signup />} />
          <Route path ="/create" element ={<CreatePost />} />
        </Routes>
    </UserContext.Provider>
  );
}

export default App;
