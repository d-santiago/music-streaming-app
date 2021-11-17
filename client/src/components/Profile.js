import ProfileCard from './ProfileCard';
import AlbumCover from './../albumcover.JPG';

import {useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';

const axios = require('axios');

const Profile = (props) => {
	const [showFollowersModal, setShowFollowersModal] = useState(false);
	const [showFollowingModal, setShowFollowingModal] = useState(false);

	const [profileData, setProfileData] = useState({});

	useEffect(() => {
		const values = { uid: sessionStorage.uid, username: sessionStorage.username };
		axios.post('http://localhost:5000/user/getUser', values)
		.then(res => {
			console.log(res.data);
			setProfileData(res.data);
		})
	}, []);

	return (
	<div className="container">

		{/* SHOWING ALL FOLLOWING */}
		<Modal show={showFollowingModal} onHide={() => setShowFollowingModal(false)}>
	        <Modal.Header closeButton>
	          <Modal.Title>Following</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>{profileData.following}</Modal.Body>
	        <Modal.Footer>
	          <button variant="secondary" className="btn btn-primary" onClick={() => setShowFollowingModal(false)}>
	            Close
	          </button>
	        </Modal.Footer>
       </Modal>

		{/* SHOWING ALL FOLLOWERS */}
       <Modal show={showFollowersModal} onHide={() => setShowFollowersModal(false)}>
	        <Modal.Header closeButton>
	          <Modal.Title>Followers</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>{profileData.followers}</Modal.Body>
	        <Modal.Footer>
	          <button variant="secondary" className="btn btn-primary" onClick={() => setShowFollowersModal(false)}>
	            Close
	          </button>
	        </Modal.Footer>
       </Modal>



		<div className="row">
			<div className="col-md-12 text-right">
			        	<button className="btn btn-primary btn-lg m-4">My library</button>
			        	<button className="btn btn-primary btn-lg">Settings</button>
			</div>
		</div>
		<div className="row">
			<div className="col-md-4">
				<ProfileCard name={profileData.name}
				username={profileData.username}
				artistName={profileData.artistName}

				handleFollowers={() => setShowFollowersModal(true)} 
				handleFollowing={() => setShowFollowingModal(true)} 

				/>
				<h3> Playlists </h3>
				<div class="row">
				  <div class="card col-sm-6 p-0">
				    <img src={AlbumCover} class="card-img-top" alt="..." />
				    <div class="card-body">
				      <h5 class="card-title">Card title</h5>
				    </div>  
				  </div>
				  <div class="card col-sm-6 p-0">
				    <img src={AlbumCover} class="card-img-top" alt="..." />
				    <div class="card-body">
				      <h5 class="card-title">Card title</h5>
				    </div>
				  </div>
				  <div class="card col-sm-6 p-0">
				    <img src={AlbumCover} class="card-img-top" alt="..." />
				    <div class="card-body">
				      <h5 class="card-title">Card title</h5>
				    </div>
				  </div>
				  <div class="card col-sm-6 p-0">
				    <img src={AlbumCover} class="card-img-top" alt="..." />
				    <div class="card-body">
				      <h5 class="card-title">Card title</h5>
				    </div>
				  </div>
				</div>
			</div>
			<div className="col-md-6">
				<h1> <u> Profile </u> </h1>
				<br />
				<h3> Songs by Abed </h3>
				<div class="p-3 card">
		                <div class="d-flex justify-content-between align-items-center p-3 music">
		                    <div class="d-flex flex-row align-items-center"> <i class="fas fa-play p-2 text-primary"></i> <small class="ml-2">Shannon jin pride - The Usual [Beat, Jess Scott]</small> </div> <i class="fa fa-check text-primary"></i>
		                </div>
		                <div class="d-flex justify-content-between align-items-center p-3 music">
		                    <div class="d-flex flex-row align-items-center"> <i class="fas fa-play p-2 text-primary"></i> <small class="ml-2">R Kelly - Thoia Toing</small> </div> <i class="fa fa-plus text-muted"></i>
		                </div>
		                <div class="d-flex justify-content-between align-items-center p-3 music">
		                    <div class="d-flex flex-row align-items-center"> <i class="fas fa-play p-2 text-primary"></i> <small class="ml-2">Under - Yeah [Feat Lil John & Lutaring] </small> </div> <i class="fa fa-check text-primary"></i>
		                </div>
		                <div class="d-flex justify-content-between align-items-center p-3 music">
		                    <div class="d-flex flex-row align-items-center"> <i class="fas fa-play p-2 text-primary"></i> <small class="ml-2">Dua Lipa - Thingong Huango [Beat, Jess Scott]</small> </div> <i class="fa fa-plus text-muted"></i>
		                </div>
		                <div class="d-flex justify-content-between align-items-center p-3 music">
		                    <div class="d-flex flex-row align-items-center"> <i class="fas fa-play p-2 text-primary"></i> <small class="ml-2">Things are better - The Usual [Beat, Jess Scott]</small> </div> <i class="fa fa-check text-primary"></i>
		                </div> 
		        </div>
		        <br />
		        <h3> Recently added songs to library </h3>
				<div class="p-3 card">
		                <div class="d-flex justify-content-between align-items-center p-3 music">
		                    <div class="d-flex flex-row align-items-center"> <i class="fas fa-play p-2 text-primary"></i> <small class="ml-2">Shannon jin pride - The Usual [Beat, Jess Scott]</small> </div> <i class="fa fa-check text-primary"></i>
		                </div>
		                <div class="d-flex justify-content-between align-items-center p-3 music">
		                    <div class="d-flex flex-row align-items-center"> <i class="fas fa-play p-2 text-primary"></i> <small class="ml-2">R Kelly - Thoia Toing</small> </div> <i class="fa fa-plus text-muted"></i>
		                </div>
		                <div class="d-flex justify-content-between align-items-center p-3 music">
		                    <div class="d-flex flex-row align-items-center"> <i class="fas fa-play p-2 text-primary"></i> <small class="ml-2">Under - Yeah [Feat Lil John & Lutaring] </small> </div> <i class="fa fa-check text-primary"></i>
		                </div>
		                <div class="d-flex justify-content-between align-items-center p-3 music">
		                    <div class="d-flex flex-row align-items-center"> <i class="fas fa-play p-2 text-primary"></i> <small class="ml-2">Dua Lipa - Thingong Huango [Beat, Jess Scott]</small> </div> <i class="fa fa-plus text-muted"></i>
		                </div>
		                <div class="d-flex justify-content-between align-items-center p-3 music">
		                    <div class="d-flex flex-row align-items-center"> <i class="fas fa-play p-2 text-primary"></i> <small class="ml-2">Things are better - The Usual [Beat, Jess Scott]</small> </div> <i class="fa fa-check text-primary"></i>
		                </div> 
		        </div>   
			</div>
			
		</div>
	</div>
	)
}

export default Profile;