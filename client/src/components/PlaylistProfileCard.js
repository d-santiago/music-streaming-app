
const PlaylistProfileCard = (props) => {
	return (	
	<div class="card col-sm-6 p-0" onClick={props.handleOpenPlaylist}>
	    <div class="card-body">
	    	<h5 class="card-title">{props.name}</h5>
	    </div>  
	</div>
	)
}

const PlaylistProfileCardList = (props) => {
	const list = props.profilecardlist.map(profilecard => {
		return <PlaylistProfileCard name={profilecard.name} handleOpenPlaylist={() => props.handleOpenPlaylist(profilecard)} />
	})

	return (
		<>
		{list}
		</>
	)
}

export default PlaylistProfileCardList;