import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const axios = require('axios');

const CreateAlbum = () => {
	function useInput({ type, className, id /*...*/ }) {
	   const [value, setValue] = useState("");
	   const input = <input value={value} id={id} onChange={e => setValue(e.target.value)} 
	   type={type} className={className} name={id} />;
	   return [value, input];
 	}
 	const navigate = useNavigate();
 	const [showAlbumModal, setShowAlbumModal] = useState(false);
 	const [nameValue, setNameValue] = useInput({ type: "text", className: "form-control", id: "name" });
 	const [genreValue, setGenreValue] = useInput({ type: "text", className: "form-control", id: "genre" });
 	const [recordLabelValue, setRecordLabelValue] = useInput({ type: "text", className: "form-control", id: "recordlabel" });

 	const handleSubmit = () => {
		const values = { uid: sessionStorage.uid, albumName: nameValue, genre: genreValue, recordLabel: recordLabelValue }
		axios.put("http://localhost:5000/artist/createAlbum", values)
	    .then((res) => {
	    	console.log(res.data);
	        navigate("/profile");
	    })
	}

 	return (
 		<div className="container">
			<Modal show={showAlbumModal} onHide={() => setShowAlbumModal(false)}>
		        <Modal.Header closeButton>
		          <Modal.Title>Create Album</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		        	<label for="name" class="form-label">Name of album:</label>
		        	{setNameValue}
		        	<br />
		        	<label for="genre" class="form-label">Genre:</label>
		        	{setGenreValue}
		        	<br />
		        	<label for="recordlabel" class="form-label">Name of record label:</label>
		        	{setRecordLabelValue}
		        	<br />
		        	<button type="submit" class="btn btn-primary" onClick={handleSubmit}>Create playlist</button>
		        </Modal.Body>
    		</Modal>

    		<button className="btn btn-primary" onClick={() => setShowAlbumModal(true)}> 
    			Add Album
    		</button>
		</div>

 	)
}

export default CreateAlbum;