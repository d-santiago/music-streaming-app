import Song from './Song';

import {useState, useEffect} from 'react';

const axios = require('axios');

const SongList = (props) => {
	
	const list = props.songlist.map((song) => 
		<Song name={song.songName} playSong={() => props.playSong(song)} />
	)
	
	return (
		<>
		{list}
		</>
	)
	
}

export default SongList;