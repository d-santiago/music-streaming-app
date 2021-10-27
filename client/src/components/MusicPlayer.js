import Music from './../example_music.mp3';
import AlbumCover from './../albumcover.JPG';
import './MusicPlayer.css';

const MusicPlayer = (props) => {
	return (
		<div className="row px-0 border border-dark" style={{display: 'flex', alignItems: 'center'}}>
			<img src={AlbumCover} className="col-md-1" />
			<div className="col-md-3 pl-4 ml-4"> 
			<h3> <strong> Cookies And Cream </strong></h3><h4>Abed Islam </h4> 
			</div>
			<audio controls className="col-md-6">
			<source src={Music} type="audio/mp3" />
			</audio>
		</div>
	)
}

export default MusicPlayer;