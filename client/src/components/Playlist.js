import './Playlist.css';
import PlaylistCover from './../playlistcover.JPG';
import Song from './Song';

const Playlist = (props) => {
	return (
		<div class="container">

		    <div class="row cant d-flex justify-content-center align-items-center">
		        <div class="col-md-6">
		        	<div class="card border border-dark">
		                <div class="card-horizontal">
		                    <div class="img-square-wrapper">
		                        <img src={PlaylistCover} alt="Playlist cover" />
		                    </div>
		                    <div class="card-body">
		                        <h3 class="card-title">Intertwined</h3>
		                        <h4 class="card-text">Abed Islam</h4>
		                    </div>
		                </div>
		            </div>
		            <div class="p-3 card border border-dark">
		            	<Song />
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

export default Playlist;