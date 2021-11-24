//current name and bio

import {useState, useEffect } from 'react';
import {userDetailsContext} from './../UserDetailsProvider';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
//import { Link} from "react-router-dom";
const axios = require('axios');
const EditProfile = (props) => {
	var success = null;

	function useInput({ type, className, id /*...*/ }) {
	   const [value, setValue] = useState("");
	   const input = <input value={value} id={id} onChange={e => setValue(e.target.value)} 
	   type={type} className={className} name={id} />;
	   return [value, input];
 	}
 	//const [userType, setUserType] = useState("");
	//const [emailValue, setEmailValue] = useInput({ type: "text", className: "form-control", id: "username" });
 	//const [passwordValue, setPasswordValue] = useInput({ type: "password", className: "form-control", id: "password" });
	const navigate = useNavigate();
	const [userName, setUserName] = useInput({ type: "text", className: "form-control", id: "username" });
	const [userBio, setUserBio] = useInput({ type: "text", className: "form-control", id: "bio" });


 	const updateProfile = (e) => {
		e.preventDefault();
        let values = {
			name: userName,
			bio: userBio,
			uid: sessionStorage.getItem("uid")

		};
 		axios.put("http://localhost:5000/user/updateProfile", values)
		.then(response => {
			console.log(response.data);
			navigate("/profile");
		})
 	}

	return (
		<div className="col-md-4 mx-auto mt-5">
			<div>
				<h2 class="mt-3">Edit Profile</h2>
				<form>
					<div class="mb-3">
				    	<label for="username" class="form-label">Name</label>
				    	{setUserName}
				  	</div>
				  	<div class="mb-3">
				    	<label for="bio" class="form-label">Bio</label>
				    	{setUserBio}
				  	</div>
				  	<button type="submit" class="btn btn-primary" onClick={updateProfile}>Update Profile Settings</button>
				</form>
			</div>
		</div>
	)
}

export default EditProfile;