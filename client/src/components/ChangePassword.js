import {useState, useEffect } from 'react';
import {userDetailsContext} from './../UserDetailsProvider';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
//import { Link} from "react-router-dom";
const axios = require('axios');
const ChangePassword = (props) => {
	var success = null;

	function useInput({ type, className, id /*...*/ }) {
	   const [value, setValue] = useState("");
	   const input = <input value={value} id={id} onChange={e => setValue(e.target.value)} 
	   type={type} className={className} name={id} />;
	   return [value, input];
	 }
	const navigate = useNavigate();
    const [newPassword, setNewPassword] = useInput({ type: "text", className: "form-control", id: "password" });


 	const UpdatePassword = (e) => {
 		e.preventDefault();
        let values = {
			password: newPassword,
			uid: sessionStorage.getItem("uid")
		}
 		axios.put("http://localhost:5000/user/updatePassword", values)
 		.then(response => {
			 console.log(response.data)
			 navigate("/profile")
		 })
 	}

	return (
		<div className="col-md-4 mx-auto mt-5">
			<div>
				<h2 class="mt-3">Change Password: </h2>
				<form>
				  	<div class="mb-3">
				    	<label for="password" class="form-label">New Password</label>
				    	{setNewPassword}
				  	</div>
				  	<button type="submit" class="btn btn-primary" onClick={UpdatePassword}>Update Password</button>
				</form>
			</div>
		</div>
	)
}

export default ChangePassword