import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="mycard">
      <div className="card authcard input-field ">
        <h2>Create an Account</h2>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
        <button className="btn waves-effect waves-light #4fc3f7 light-blue lighten-2">Signup</button>
         <h5><Link to = "/login"> Already Have an Account ?</Link></h5>
      </div>
    </div>
  )
}

export default Signup