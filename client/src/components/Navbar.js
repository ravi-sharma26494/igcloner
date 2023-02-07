import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import M from 'materialize-css';


const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate("")  
  const renderList = async () => {
    if (state) {
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li>
          <button
          className="btn waves-effect waves-light #4fc3f7 light-blue lighten-2"
          onClick={() => {
            localStorage.clear()
            navigate('/login');
            M.toast({html:"Logout Successfull..", classes:'#81c784 green lighten-2'})
            dispatch({type:'CLEAR'})
            
          }}
        >
          Logout
        </button>
        </li>
      ];
    } else {
      return [
        <li><Link to="/login">Login</Link></li>,
         <li><Link to="/signup">Signup</Link></li>
      ]
    }
  };
  return (
    <div>
      <nav>
        <div className="nav-wrapper white ">
          <Link to={state ? '/': "/login"} className="brand-logo left">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
