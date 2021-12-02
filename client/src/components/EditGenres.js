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
	const [isPop, setPop] = useState(true);
	const [isClassic, setClassic] = useState(true);
	const [isHiphop, setHiphop] = useState(true);
	const [isReggae, setReggae] = useState(true);
	const [isGospel, setGospel] = useState(true);
	const [isDance, setDance] = useState(true);
	const [isCountry, setCountry] = useState(true);
	const [isOpera, setOpera] = useState(true);
	const [isBollywood, setBollywood] = useState(true);

	const [infoRock, setInfoRock] = useState("Rock");
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
		console.log("hahaSubmittedhaha")
		 e.preventDefault();
		 for (let i = 0; i < 10; i++) {
			 if (infoHooks[i] == true){
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
		setInfoPop ("Pop")
		console.log(isPop)
		if (isPop == true){
			setPop(false)
			setInfoPop("")
			console.log(isPop, infoPop);
		}
		else if (isPop == false){
			setPop(true)
			setInfoPop("Pop")
		}
	}
	const classic = (e) => {
		setInfoClassic ("Classic")
		console.log(isClassic)
		if (isClassic == true){
			setClassic(false)
			setInfoClassic("")
			console.log(isClassic, infoClassic);
		}
		else if (isClassic == false){
			setClassic(true)
			setInfoClassic("Classic")
		}
	}
	const hiphop = (e) => {
		setInfoHiphop ("HipHop")
		console.log(isHiphop)
		if (isHiphop == true){
			setHiphop(false)
			setInfoHiphop("")
			console.log(isHiphop, infoHiphop);
		}
		else if (isHiphop == false){
			setHiphop(true)
			setInfoHiphop("HipHop")
		}
	}
	const reggae = (e) => {
		setInfoReggae ("Reggae")
		console.log(isReggae)
		if (isReggae == true){
			setReggae(false)
			setInfoReggae("")
			console.log(isReggae, infoReggae);
		}
		else if (isReggae == false){
			setReggae(true)
			setInfoReggae("Reggae")
		}
	}
	const gospel = (e) => {
		setInfoGospel ("Gospel")
		console.log(isGospel)
		if (isGospel == true){
			setGospel(false)
			setInfoGospel("")
			console.log(isGospel, infoGospel);
		}
		else if (isGospel == false){
			setGospel(true)
			setInfoGospel("Gospel")
		}
	}
	const dance = (e) => {
		setInfoDance ("Dance")
		console.log(isDance)
		if (isDance == true){
			setDance(false)
			setInfoDance("")
			console.log(isDance, infoDance);
		}
		else if (isDance == false){
			setDance(true)
			setInfoDance("Dance")
		}
	}
	const country = (e) => {
		setInfoCountry("Country")
		console.log(isCountry)
		if (isCountry == true){
			setCountry(false)
			setInfoCountry("")
			console.log(isCountry, infoCountry);
		}
		else if (isCountry == false){
			setCountry(true)
			setInfoCountry("Country")
		}
	}
	const opera = (e) => {
		setInfoOpera ("Opera")
		console.log(isOpera)
		if (isOpera == true){
			setOpera(false)
			setInfoOpera("")
			console.log(isOpera, infoOpera);
		}
		else if (isOpera == false){
			setOpera(true)
			setInfoOpera("Opera")
		}
	}
	const bollywood = (e) => {
		setInfoBollywood ("Bollywood")
		console.log(isBollywood)
		if (isBollywood == true){
			setBollywood(false)
			setInfoBollywood("")
			console.log(isBollywood, infoBollywood);
		}
		else if (isBollywood == false){
			setBollywood(true)
			setInfoBollywood("Bollywood")
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
    
				  	<button type="submit" class="btn btn-primary" onClick={SubmitGenres=>this.reset()}>Submit Genres</button> 
				</form>
			</div>
		</div>
	)
}

export default EditGenres;