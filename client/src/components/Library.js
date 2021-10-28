import AlbumCover from './../albumcover.JPG';

const Library = () => {
	return (
		<div className="container">
			<div className="row">
				
				<h1 className="display-1"> <img src={AlbumCover} height={80} />My library </h1>
				<h4> Afnan Haq, 645 songs </h4>
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
	)
}

export default Library;