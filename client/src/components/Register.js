import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const axios = require('axios');
const Register = () => {

	function useInput({ type, className, id /*...*/ }) {
	   const [value, setValue] = useState("");
	   const input = <input value={value} id={id} onChange={e => setValue(e.target.value)} 
	   type={type} className={className} name={id} />;
	   return [value, input];
 	}
 	const navigate = useNavigate();
 	const handleRegister = (e) => {
	 		e.preventDefault();
	 		let values = {
	 			userType, 
	 			email: emailValue, 
	 			username: usernameValue, 
	 			password: passwordValue, 
	 			name: nameValue, 
	 			dob: dobValue
	 		};
 		axios.post("http://localhost:5000/user/register", values)
 		.then(response => alert("User registered. Please login to continue."));
 		navigate("/");
 	}
 	
 	const [userType, setUserType] = useState("");
 	const [emailValue, setEmailValue] = useInput({ type: "email", className: "form-control", id: "email" });
 	const [usernameValue, setUsernameValue] = useInput({ type: "text", className: "form-control", id: "username" });
 	const [passwordValue, setPasswordValue] = useInput({ type: "password", className: "form-control", id: "password" });
 	const [nameValue, setNameValue] = useInput({ type: "text", className: "form-control", id: "name" });
 	const [dobValue, setDobValue] = useInput({ type: "date", className: "form-control", id: "dob" });

	return (
		<div className="col-md-4 mx-auto mt-5">
			<h2 class="mt-3">Register</h2>
			<form className="mb-5">
			  	<div>
					<div class="mb-3">
				    	<label for="email" class="form-label">Email</label>
				    	{setEmailValue}
				  	</div>
				  	<div class="mb-3">
				    	<label for="username" class="form-label">Username</label>
				    	{setUsernameValue}
				  	</div>
				  	<div class="mb-3">
				    	<label for="password" class="form-label">Password</label>
				    	{setPasswordValue}
				  	</div>
				  	<div class="mb-3">
				    	<label for="name" class="form-label">Name</label>
				    	{setNameValue}
				  	</div>
				  	<div class="mb-3">
				    	<label for="dob" class="form-label">Date of birth</label>
				    	{setDobValue}
				  	</div>

				</div>
			  	<hr />
			  	<button type="submit" class="btn btn-primary" onClick={handleRegister}>Register</button>
			</form>
		</div>
	)
}

export default Register;