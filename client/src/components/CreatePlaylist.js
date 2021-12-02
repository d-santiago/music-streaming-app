import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const axios = require('axios');

const CreatePlaylist = () => {
	function useInput({ type, className, id /*...*/ }) {
	   const [value, setValue] = useState("");
	   const input = <input value={value} id={id} onChange={e => setValue(e.target.value)} 
	   type={type} className={className} name={id} />;
	   return [value, input];
 	}
 	const navigate = useNavigate();
 	const [nameValue, setNameValue] = useInput({ type: "text", className: "form-control", id: "name" });
	const [showPlaylistModal, setShowPlaylistModal] = useState(false);

	const handleSubmit = () => {
		const values = {uid: sessionStorage.uid, name: nameValue}
		axios.put("/user/createPlaylist", values)
	    .then((res) => {
	    	console.log(res.data);
	        navigate("/profile");
	    })
	}

	return (
		<div className="container">
			<Modal show={showPlaylistModal} onHide={() => setShowPlaylistModal(false)}>
		        <Modal.Header closeButton>
		          <Modal.Title>Create playlist</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		        	<label for="name" class="form-label">Name of playlist:</label>
		        	{setNameValue}
		        	<br />
		        	<button type="submit" class="btn btn-primary" onClick={handleSubmit}>Create playlist</button>
		        </Modal.Body>
    		</Modal>

    		<button className="btn btn-primary" onClick={() => setShowPlaylistModal(true)}> 
    			Add Playlist
    		</button>
		</div>

	)
}

export default CreatePlaylist;