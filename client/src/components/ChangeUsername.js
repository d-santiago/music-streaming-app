import {useState, useEffect } from 'react';
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
    const [oldUserName, setOldUserName] = useInput({ type: "text", className: "form-control", id: "username" });
    const [newUserName, setNewUserName] = useInput({ type: "text", className: "form-control", id: "username" });


 	const UpdateUserName = (e) => {
 		e.preventDefault();
        let values = {oldUserName, newUserName}
 		axios.post("http://localhost:5000/login", values)
 		.then(response => alert(response.data))
 	}

	return (
		<div className="col-md-4 mx-auto mt-5">
			<div>
				<h2 class="mt-3">Change Username: </h2>
				<form>
					<div class="mb-3">
				    	<label for="username" class="form-label">Old Username</label>
				    	{setOldUserName}
				  	</div>
				  	<div class="mb-3">
				    	<label for="username" class="form-label">New Username</label>
				    	{setNewUserName}
				  	</div>
				  	<button type="submit" class="btn btn-primary" onClick={UpdateUserName}>Update Username</button>
				</form>
			</div>
		</div>
	)
}

export default ChangeUsername;