// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile'; 
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route exact path ="/" element ={<Home />} />
    <Route path ="/login" element ={<Login />} />
    <Route path ="/profile" element ={<Profile />} />
    <Route path ="/signup" element ={<Signup />} />
    <Route path ="/create" element ={<CreatePost />} />
    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
