import ProfileCard from './ProfileCard';
import {useState, useEffect, useRef } from 'react';

import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import CreatePlaylist from './CreatePlaylist';
import CreateAlbum from './CreateAlbum';
import PlaylistProfileCard from './PlaylistProfileCard';
import Navbar from './Navbar';
import SongList from './SongList';
import MusicPlayer from './MusicPlayer';
import Playlist from './Playlist';

const axios = require('axios');

const Profile = (props) => {
	const [showFollowersModal, setShowFollowersModal] = useState(false);
	const [showFollowingModal, setShowFollowingModal] = useState(false);
	const [songList, setSongList] = useState([]);

	const [profileData, setProfileData] = useState({});
	const [recentlyAddedSongs, setRecentlyAddedSongs] = useState("");
	const [songsByArtist, setSongsByArtist] = useState([]);
	const [musicDetails, setMusicDetails] = useState({});

	const [playlistSongs, setPlaylistSongs] = useState([]);
	const [playlistName, setPlaylistName] = useState("");

	const audioRef = useRef();

	useEffect(() => {
			if (recentlyAddedSongs) {
				recentlyAddedSongs.recentlyAdded.forEach((song) => {
					axios.post("http://localhost:5000/user/getSong", {sid: song})
					.then(res => {
						setSongList(prevArray => [...prevArray, res.data])
					})
				});
			}		
	}, [recentlyAddedSongs])
	
	useEffect(() => {
		const values = { uid: sessionStorage.uid, username: sessionStorage.username };
		axios.post('http://localhost:5000/user/getUser', values)
		.then(res => {
			console.log(res.data);
			setProfileData(res.data);
		})

		axios.post('http://localhost:5000/user/recentlyAddedToLibrary', {uid: sessionStorage.uid})
		.then(res => {
			setRecentlyAddedSongs({recentlyAdded: res.data.recentlyAdded});
		})

		axios.post('http://localhost:5000/artist/getSongs', {uid: sessionStorage.uid})
		.then(res => {
			console.log("songs by abed", res.data);
			setSongsByArtist(res.data);
		})

	}, []);

	
	const setMusicPlayer = (song) => {
		setMusicDetails({coverURL: song.coverURL, songName: song.songName, songURL: song.songURL});
		if (audioRef.current) {
	        audioRef.current.pause();
	        audioRef.current.load();
	        audioRef.current.play();
    	}	
	}

	const handleOpenPlaylist = (profilecard) => {
		setPlaylistSongs([]);
		setPlaylistName(profilecard.name);
		profilecard.songs.forEach((song) => {
			axios.post("http://localhost:5000/user/getSong", {sid: song})
			.then(res => {
				setPlaylistSongs(prevArray => [...prevArray, res.data])
			})
		});
	}
	

	return (
	<>
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
			        	<Link to="/library"><button className="btn btn-primary btn-lg m-4">My library</button></Link>
			        	<Link to="/settings"><button className="btn btn-primary btn-lg">Settings</button></Link>
			</div>
		</div>
		<CreatePlaylist />
		<br />
		<CreateAlbum />
		{musicDetails.songURL ? <MusicPlayer songname={musicDetails.songName} coverURL={musicDetails.coverURL} 
		songURL={musicDetails.songURL} audioRef={audioRef} /> : null }
		<div className="row">
			<div className="col-md-6">
				<ProfileCard name={profileData.name}
				username={profileData.username}
				artistName={profileData.artistName}

				handleFollowers={() => setShowFollowersModal(true)} 
				handleFollowing={() => setShowFollowingModal(true)} 

				/>
				<h3> Playlists </h3>
				<div class="row">
				  <PlaylistProfileCard profilecardlist={profileData.playlists ? profileData.playlists : []} 
				  handleOpenPlaylist={(profilecard) => handleOpenPlaylist(profilecard)} />
				</div>
				{playlistName ?
				<Playlist name={playlistName} songList={playlistSongs} artist={profileData.name}
				setMusicPlayer={(song) => setMusicPlayer(song)} /> : null }
			</div>
			<div className="col-md-6">
				<h1> <u> Profile </u> </h1>
				<br />
				<h3> Songs by {profileData.name} </h3>
				<div class="p-3 card">
						<SongList songlist={songsByArtist} playSong={(song) => setMusicPlayer(song)}  />
		        </div>
		        <br />
		        <h3> Recently added songs to library </h3>
				<div class="p-3 card">
						<SongList songlist={songList} playSong={(song) => setMusicPlayer(song)}  />
		        </div>   
			</div>
			
		</div>
	</div>
	</>
	)
}

export default Profile;