import {useState, useEffect } from 'react';
import {userDetailsContext} from './../UserDetailsProvider';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
//import { Link} from "react-router-dom";
const axios = require('axios');
const ChangeUsername = (props) => {
	var success = null;

	function useInput({ type, className, id /*...*/ }) {
	   const [value, setValue] = useState("");
	   const input = <input value={value} id={id} onChange={e => setValue(e.target.value)} 
	   type={type} className={className} name={id} />;
	   return [value, input];
	 }
	const navigate = useNavigate();
    const [newUserName, setNewUserName] = useInput({ type: "text", className: "form-control", id: "username" });

 	const UpdateUserName = (e) => {
		e.preventDefault();
	
        let values = {
			newUsername: newUserName,
			uid: sessionStorage.getItem("uid")
		};
 		axios.put("/user/updateUsername", values)
 		.then(response => {
			 console.log(response.data);
			 sessionStorage.setItem("username", newUserName)
			 navigate("/profile");
		 })
 	}

	return (
		<div className="col-md-4 mx-auto mt-5">
			<div>
				<h2 class="mt-3">Change Username: </h2>
				<form>
					<div>
						<label for="username" class="form-label">Old Username: {sessionStorage.getItem("username")}</label>
					</div>
				  	<div class="mb-3">
					  	<input type="username" onChange={setNewUserName}/>
						{newUserName}
				
				  	</div>
				  	<button type="submit" class="btn btn-primary" onClick={UpdateUserName}>Update Username</button>
				</form>
			</div>
		</div>
	)
}

export default ChangeUsername;