import ProfileCard from './ProfileCard';
import AlbumCover from './../albumcover.JPG';
const Profile = (props) => {
	return (
	<div className="container">
		<div className="row">
			<div className="col-md-4">
				<ProfileCard />
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
		        <h3> Liked songs </h3>
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
			<div className="col-md-2">
					<br />
		        	<button className="btn btn-primary">My library</button>
		        	<br />
		        	<br />
		        	<button className="btn btn-primary">Settings</button>
		    </div>
		</div>
	</div>
	)
}

export default Profile;