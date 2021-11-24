import AlbumCover from './../albumcover.JPG';

const PlaylistProfileCard = () => {
	return (	
	<div class="card col-sm-6 p-0">
	    <img src={AlbumCover} class="card-img-top" alt="..." />
	    <div class="card-body">
	    	<h5 class="card-title">Card title</h5>
	    </div>  
	</div>
	)
}

export default PlaylistProfileCard;