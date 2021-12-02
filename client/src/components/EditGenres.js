import {useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
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

	const [isRock, setRock] = useState(true);
	const [isPop, setPop] = useState(false);
	const [isClassic, setClassic] = useState(false);
	const [isHiphop, setHiphop] = useState(false);
	const [isReggae, setReggae] = useState(false);
	const [isGospel, setGospel] = useState(false);
	const [isDance, setDance] = useState(false);
	const [isCountry, setCountry] = useState(false);
	const [isOpera, setOpera] = useState(false);
	const [isBollywood, setBollywood] = useState(false);

	const [infoRock, setInfoRock] = useState("");
	const [infoPop, setInfoPop] = useState("Pop");
	const [infoClassic, setInfoClassic] = useState("Classic");
	const [infoHiphop, setInfoHiphop] = useState("HipHop");
	const [infoReggae, setInfoReggae] = useState("Reggae");
	const [infoGospel, setInfoGospel] = useState("Gospel");
	const [infoDance, setInfoDance] = useState("Dance");
	const [infoCountry, setInfoCountry] = useState("Country");
	const [infoOpera, setInfoOpera] = useState("Opera");
	const [infoBollywood, setInfoBollywood] = useState("Bollywood");

	const infoHooks = [infoRock, infoPop, infoClassic, infoHiphop, infoReggae, infoGospel, infoDance, infoCountry, infoOpera, infoBollywood]


 	const SubmitGenres = (e) => {
		console.log(infoHooks[0])
		 e.preventDefault();
		 for (let i = 0; i < 10; i++) {
			 if (infoHooks[i] !== ""){
				let values = {
					genres: infoHooks[i],
					uid: sessionStorage.getItem("uid")
		
				}; 
				axios.put("/user/updateGenres", values)
				 .then(response => {
					console.log(values.genres);
				 })
				 console.log(infoHooks[i])
			 }
		 }
		/*for (let elem in infoHooks){
			if (elem.length !== 0){
				console.log(elem)
				let values = {
					genres: elem.toString(),
					uid: sessionStorage.getItem("uid")
		
				}; 
				 axios.put("http://localhost:5000/user/updateGenres", values)
				 .then(response => {
					console.log(values.genres);
				 })
			}
		} */

	}
	 
	const rock = () => {
		setInfoRock ("Rock")
		console.log(isRock)
		if (isRock == true){
			setRock(false)
			setInfoRock("")
			console.log(isRock, infoRock);
		}
		else if (isRock == false){
			setRock(true)
			setInfoRock("Rock")
		}
	}
	const pop = (e) => {
		setPop(!isPop)
		if (isPop){
			setInfoPop("Pop")
		}
		else{
			setInfoPop("")
		}
	}
	const classic = (e) => {
		setClassic(!isClassic)
		if (isClassic){
			setInfoClassic("Classic")
		}
		else{
			setInfoClassic("")
		}
		
	}
	const hiphop = (e) => {
		setHiphop(!isHiphop)
		if (isHiphop){
			setInfoPop("Hip Hop")
		}
		else{
			setInfoHiphop("")
		}
		
	}
	const reggae = (e) => {
		setReggae(!isReggae)
		if (isReggae){
			setInfoReggae("Reggae")
		}
		else{
			setInfoReggae("")
		}
		
	}
	const gospel = (e) => {
		setGospel(!isGospel)
		if (isGospel){
			setInfoGospel("Gospel")
		}
		else{
			setInfoGospel("")
		}
		
	}
	const dance = (e) => {
		setDance(!isDance)
		if (isDance){
			setInfoDance("Dance")
		}
		else{
			setInfoDance("")
		}
		
	}
	const country = (e) => {
		setCountry(!isCountry)
		if (isCountry){
			setInfoCountry("Country")
		}
		else{
			setInfoCountry("")
		}
		
	}
	const opera = (e) => {
		setOpera(!isOpera)
		if (isOpera){
			setInfoOpera("Opera")
		}
		else{
			setInfoOpera("")
		}
		
	}
	const bollywood = (e) => {
		setBollywood(!isBollywood)
		if (isBollywood){
			setInfoBollywood("Bollywood")
		}
		else{
			setInfoBollywood("")
		}
		
	}

	return (
		<div className="col-md-4 mx-auto mt-5">
			<div>
				<h2 class="mt-3">Pick Genres</h2>
				<form>
					<div class="form-check form-check-inline">
					  <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" onClick= {rock}/>
					  <label class="form-check-label" for="flexRadioDefault1">Rock</label>
					</div>
					<div class="form-check form-check-inline">
					  <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" onClick = {pop}/>
					  <label class="form-check-label" for="flexRadioDefault2">Pop</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault3" onClick= {classic}/>
					  <label class="form-check-label" for="flexRadioDefault3">Classic</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault4" onClick= {hiphop}/>
					  <label class="form-check-label" for="flexRadioDefault4">Hip Hop</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault5" onClick= {reggae}/>
					  <label class="form-check-label" for="flexRadioDefault5">Reggae</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault6" onClick= {gospel}/>
					  <label class="form-check-label" for="flexRadioDefault6">Gospel</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault7" onClick= {dance}/>
					  <label class="form-check-label" for="flexRadioDefault7">Dance</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault8" onClick= {country}/>
					  <label class="form-check-label" for="flexRadioDefault8">Country</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault9" onClick= {opera}/>
					  <label class="form-check-label" for="flexRadioDefault9">Opera</label>
					</div>
                    <div class="form-check form-check-inline">
					  <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault10" onClick= {bollywood}/>
					  <label class="form-check-label" for="flexRadioDefault10">Bollywood</label>
					</div>
    
				  	<button type="submit" class="btn btn-primary" onClick={SubmitGenres}>Submit Genres</button>
				</form>
			</div>
		</div>
	)
}

export default EditGenres;