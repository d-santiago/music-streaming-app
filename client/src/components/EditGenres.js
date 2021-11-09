import {useState, useEffect } from 'react';
//import { Link} from "react-router-dom";
const axios = require('axios');
const EditGenres = (props) => {
	var success = null;

	function useInput({ type, className, id /*...*/ }) {
	   const [value, setValue] = useState("");
	   const input = <input value={value} id={id} onChange={e => setValue(e.target.value)} 
	   type={type} className={className} name={id} />;
	   return [value, input];
 	}
 	const [userGenre, setUserGenre] = useState("");

 	const SubmitGenres = (e) => {
 		e.preventDefault();
 		let values = {userGenre}
 		axios.post("http://localhost:5000/login", values)
 		.then(response => alert(response.data))
 	}

	return (
		<div className="col-md-4 mx-auto mt-5">
			<div>
				<h2 class="mt-3">Pick Genres</h2>
				<form>
					<div class="form-check form-check-inline">
					  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={() => setUserGenre("Rock")}/>
					  <label class="form-check-label" for="flexRadioDefault1">Rock</label>
					</div>
					<div class="form-check form-check-inline">
					  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => setUserGenre("Pop")}/>
					  <label class="form-check-label" for="flexRadioDefault2">Pop</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onClick={() => setUserGenre("Classic")}/>
					  <label class="form-check-label" for="flexRadioDefault3">Classic</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" onClick={() => setUserGenre("Hip Hop")}/>
					  <label class="form-check-label" for="flexRadioDefault4">Hip Hop</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" onClick={() => setUserGenre("Reggae")}/>
					  <label class="form-check-label" for="flexRadioDefault5">Reggae</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault6" onClick={() => setUserGenre("Gospel")}/>
					  <label class="form-check-label" for="flexRadioDefault6">Gospel</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault7" onClick={() => setUserGenre("Dance")}/>
					  <label class="form-check-label" for="flexRadioDefault7">Dance</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault8" onClick={() => setUserGenre("Country")}/>
					  <label class="form-check-label" for="flexRadioDefault8">Country</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault9" onClick={() => setUserGenre("Oper")}/>
					  <label class="form-check-label" for="flexRadioDefault9">Opera</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault10" onClick={() => setUserGenre("Bollywood")}/>
					  <label class="form-check-label" for="flexRadioDefault10">Bollywood</label>
					</div>
    
				  	<button type="submit" class="btn btn-primary" onClick={SubmitGenres}>Submit Genres</button>
				</form>
			</div>
		</div>
	)
}

export default EditGenres;