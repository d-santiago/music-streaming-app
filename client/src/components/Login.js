import {useState, useEffect, useContext } from 'react';
import {userDetailsContext} from './../UserDetailsProvider';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";



//import { Link} from "react-router-dom";
const axios = require('axios');
const Login = (props) => {

	function useInput({ type, className, id /*...*/ }) {
	   const [value, setValue] = useState("");
	   const input = <input value={value} id={id} onChange={e => setValue(e.target.value)} 
	   type={type} className={className} name={id} />;
	   return [value, input];
 	}
 	const navigate = useNavigate();
 	const [userType, setUserType] = useState("");
	const [usernameValue, setUsernameValue] = useInput({ type: "text", className: "form-control", id: "username" });
 	const [passwordValue, setPasswordValue] = useInput({ type: "password", className: "form-control", id: "password" });

 	const [userDetails, setUserDetails] = useContext(userDetailsContext);
 	/* hash the password, http code of 200 and send back token, make error system using 410
 	"invalid username or password" */
 	const handleLogin = (e) => {
 		e.preventDefault();
 		let values = {
 			username: usernameValue,
 			password: passwordValue
 		};
 		axios.post("http://localhost:5000/user/login", values)
 		.then(response => {
 			console.log(response.data);
 			sessionStorage.setItem("uid", response.data._id);
 			sessionStorage.setItem("username", response.data.username);
 			navigate("/profile");
 			window.location.reload();
 		})
 	}

	return (
		<div>
		<div className="col-md-4 mx-auto mt-5">
			<div>
				<h2 class="mt-3">Login</h2>
				<form>
					<div class="mb-3">
				    	<label for="username" class="form-label">Username</label>
				    	{setUsernameValue}
				  	</div>
				  	<div class="mb-3">
				    	<label for="password" class="form-label">Password</label>
				    	{setPasswordValue}
				  	</div>
				  	<button type="submit" class="btn btn-primary" onClick={handleLogin}>Login</button>
				</form>
			</div>
		</div>
		</div>
	)
}

export default Login;