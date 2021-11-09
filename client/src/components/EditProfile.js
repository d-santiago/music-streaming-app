//current name and bio

import {useState, useEffect } from 'react';
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
    const [userName, setUserName] = useInput({ type: "text", className: "form-control", id: "username" });
    const [userBio, setUserBio] = useInput({ type: "text", className: "form-control", id: "bio" });

 	const UpdateProfile = (e) => {
 		e.preventDefault();
        //let values = {userType, emailValue, passwordValue}
        let values = {userName, userBio}
 		axios.post("http://localhost:5000/login", values)
 		.then(response => alert(response.data))
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
				  	<button type="submit" class="btn btn-primary" onClick={UpdateProfile}>Update Profile Settings</button>
				</form>
			</div>
		</div>
	)
}

export default EditProfile;