import {useState, useEffect, useContext } from 'react';
import {userDetailsContext} from './../UserDetailsProvider';
//import { Link} from "react-router-dom";
const axios = require('axios');
const Login = (props) => {

	function useInput({ type, className, id /*...*/ }) {
	   const [value, setValue] = useState("");
	   const input = <input value={value} id={id} onChange={e => setValue(e.target.value)} 
	   type={type} className={className} name={id} />;
	   return [value, input];
 	}
 	const [userType, setUserType] = useState("");
	const [usernameValue, setUsernameValue] = useInput({ type: "text", className: "form-control", id: "username" });
 	const [passwordValue, setPasswordValue] = useInput({ type: "password", className: "form-control", id: "password" });

 	const [userDetails, setUserDetails] = useContext(userDetailsContext);

 	const handleLogin = (e) => {
 		e.preventDefault();
 		let values = {
 			username: usernameValue,
 			password: passwordValue
 		};
 		axios.get("http://localhost:5000/user/login", {params: values })
 		.then(response => console.log(response))
 			/*
 			setUserDetails({
 				id: "hello",
		    	username: "jello",
		    	email: response.email,
		    	name: response.name,
		    	password: response.password
 			});
 			console.log("it worked!");
 			setTimeout(() => {console.log(userDetails)}, 5000);
			*/
 	}

	return (
		<div className="col-md-4 mx-auto mt-5">
			<div>
				<h2 class="mt-3">Login</h2>
				<form>
					{ /*
					<p className="mb-1"> Choose user type: </p>
					<div class="form-check form-check-inline">
					  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={() => setUserType("listener")}/>
					  <label class="form-check-label" for="flexRadioDefault1">Listener</label>
					</div>
					<div class="form-check form-check-inline">
					  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => setUserType("artist")}/>
					  <label class="form-check-label" for="flexRadioDefault2">Artist</label>
					</div>
					*/ }
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
	)
}

export default Login;