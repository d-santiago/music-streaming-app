import AlbumCover from './../albumcover.JPG';
import SongList from './SongList';
import { useEffect, useState, useRef } from 'react';
import MusicPlayer from './MusicPlayer';
const axios = require('axios');

const Library = () => {
	const [songCount, setSongCount] = useState("");
	const [libraryData, setLibraryData] = useState("");
	const [songList, setSongList] = useState([]);
	const [musicDetails, setMusicDetails] = useState({});

	useEffect(() => {
			if (libraryData) {
				libraryData.forEach((song) => {
					axios.post("http://localhost:5000/user/getSong", {sid: song})
					.then(res => {
						setSongList(prevArray => [...prevArray, res.data])
					})
				});
			}		
	}, [libraryData])

	useEffect(() => {
		const values = { uid: sessionStorage.uid }
		axios.post('http://localhost:5000/user/librarySongCount', values)
		.then(res => {
			console.log(res.data);
			setSongCount(res.data.count);
		})

		const values2 = { uid: sessionStorage.uid, username: sessionStorage.username };
		axios.post('http://localhost:5000/user/getUser', values2)
		.then(res => {
			console.log(res.data.library);
			setLibraryData(res.data.library);
		})
	}, [])

	const audioRef = useRef();

	const setMusicPlayer = (song) => {
		setMusicDetails({coverURL: song.coverURL, songName: song.songName, songURL: song.songURL});
		if (audioRef.current) {
	        audioRef.current.pause();
	        audioRef.current.load();
	        audioRef.current.play();
    	}	
	}
	
	return (
		<>
		
		<div className="container">
			<div className="row">
				<h1 className="display-1"> <img src={AlbumCover} height={80} />My library </h1>
				<MusicPlayer songname={musicDetails.songName} coverURL={musicDetails.coverURL} 
				songURL={musicDetails.songURL} audioRef={audioRef} /> 
				<h4> Afnan Haq, {songCount} songs </h4>
				<div class="p-3 card">
						<SongList songlist={songList} playSong={(song) => setMusicPlayer(song)} />
		        </div>  
			</div>
		</div>
		</>
	)
}

export default Library;