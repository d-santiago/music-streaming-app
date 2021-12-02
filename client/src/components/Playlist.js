import './Playlist.css';
import SongList from './SongList';

const Playlist = (props) => {
	return (
		<div class="container">

		    <div class="row cant d-flex justify-content-center align-items-center">
		        <div class="col-md-12">
		        	<div class="card">
		                <div class="card-horizontal">
		                    <div class="card-body">
		                        <h3 class="card-title">{props.name}</h3>
		                        <h4 class="card-text">{props.artist}</h4>
		                    </div>
		                </div>
		            </div>
		            <div class="p-3 card">
		            	<SongList songlist={props.songList} playSong={(song) => props.setMusicPlayer(song)}  />
		            </div>
		        </div>
		    </div>
		</div>
	)
}

export default Playlist;