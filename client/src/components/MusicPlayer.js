
const MusicPlayer = (props) => {
	return (
		<div className="row px-0 my-4 border border-dark" style={{display: 'flex', alignItems: 'center'}}>
			<img src={props.coverURL} className="col-md-1" />
			<div className="col-md-3 pl-4 ml-4"> 
			<h3> <strong> {props.songname} </strong></h3><h4> {props.artistname} </h4> 
			</div>
			<audio controls className="col-md-6" ref={props.audioRef} autoplay>
				<source src={props.songURL} type="audio/mp3" />
			</audio>
		</div>
	)
}

export default MusicPlayer;