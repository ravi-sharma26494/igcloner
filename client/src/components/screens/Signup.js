import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from 'materialize-css';
import { BACKENDURL } from "../../utils/utils";

const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = async () => {
    const fetchedData = await fetch(`${BACKENDURL}/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });
    const response = await fetchedData.json();
    if(response.error){
      return M.toast({html:response.error, classes:"#e57373 red lighten-2"});
    } else{
      M.toast({html:response.message, classes:'#81c784 green lighten-2'})
      navigate('/login');
    }
    // if(response)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if(data.error){
    //       M.toast({html:data.error, classes:"#e57373 red lighten-2"})
    //     } else{
    //       M.toast({html:data.message, classes:'#81c784 green lighten-2'})
    //       navigate('/login')
    //     }
    //   }).catch(err=>{
    //     console.log(err)
    //   })
  };
  return (
    <div className="mycard">
      <div className="card authcard input-field ">
        <h2>Create an Account</h2>

        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

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
          Signup
        </button>
        <h5>
          <Link to="/login"> Already Have an Account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
