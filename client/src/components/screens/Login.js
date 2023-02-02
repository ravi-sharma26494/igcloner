import {React, useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import M from 'materialize-css';
import {UserContext} from '../../App'

const Login = () => {
  const {state, dispatch}  = useContext(UserContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const PostData = () => {
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.error){
          M.toast({html:data.error, classes:"#e57373 red lighten-2"})
        } else{
          localStorage.setItem('jwt',data.token)
          localStorage.setItem('user',JSON.stringify(data.user))
          dispatch({type:"USER", payload:data.user})
          M.toast({html:'Sign in Successful.', classes:'#81c784 green lighten-2'})
          navigate('/');
        }
      }).catch(err=>{
        console.log(err)
      })
  };

  return (
    <div className="mycard">
      <div className="card authcard input-field ">
        <h2>Login to your account </h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> 
        <button
          className="btn waves-effect waves-light #4fc3f7 light-blue lighten-2"
          onClick={() => PostData()}
        >
          Login
        </button>
        <h5><Link to = "/signup"> Dont Have an Account ?</Link></h5>
      </div>
    </div>
  );
};

export default Login;
