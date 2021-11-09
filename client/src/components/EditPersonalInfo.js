//Email and DOB
import {useState, useEffect } from 'react';
const axios = require('axios');
const EditPersonalInfo = (props) => {
	var success = null;

	function useInput({ type, className, id /*...*/ }) {
	   const [value, setValue] = useState("");
	   const input = <input value={value} id={id} onChange={e => setValue(e.target.value)} 
	   type={type} className={className} name={id} />;
	   return [value, input];
 	}
    const [emailValue, setEmailValue] = useInput({ type: "text", className: "form-control", id: "username" });
    const [dobValue, setDobValue] = useInput({ type: "date", className: "form-control", id: "dob" });

 	const UpdateInfo = (e) => {
 		e.preventDefault();
 		let values = {emailValue, dobValue}
 		axios.post("http://localhost:5000/login", values)
 		.then(response => alert(response.data))
 	}

	return (
		<div className="col-md-4 mx-auto mt-5">
			<div>
				<h2 class="mt-3">Edit Personal Info</h2>
				<form>
					<div class="mb-3">
				    	<label for="username" class="form-label">Email</label>
				    	{setEmailValue}
				  	</div>
                    <div class="mb-3">
				    	<label for="dob" class="form-label">Date of birth</label>
				    	{setDobValue}
                   
				  	</div>
				  	<button type="submit" class="btn btn-primary" onClick={UpdateInfo}>Update Information</button>
				</form>
			</div>
		</div>
	)
}

export default EditPersonalInfo;