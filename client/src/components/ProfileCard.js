import "./ProfileCard.css";


const Profile = (props) => {
	return (
	<div>
		<div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
	    	<div className="profilecard p-4 col-md-3">
	        	<div className="profileimage d-flex flex-column justify-content-center align-items-center"> <button className="profilebtn btn-secondary"> <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" /></button> <span className="name mt-3">Eleanor Pena</span> <span className="idd">@eleanorpena</span>
		            <div className="d-flex flex-row justify-content-center align-items-center gap-2"> <span className="profileidd1">Oxc4c16a645_b21a</span> <span><i className="fa fa-copy"></i></span> </div>
		            <div className="d-flex flex-row justify-content-center align-items-center mt-3" onClick={props.handleFollowers}> 
		            	<span className="profilenumber">1069 <span className="profilefollow">Followers</span></span> 
		            </div>
		            <div className="d-flex flex-row justify-content-center align-items-center" onClick={props.handleFollowing}> 
		            	<span className="profilenumber">300 <span className="profilefollow">Following</span></span> 
		            </div>
		            <div className=" d-flex mt-2"> <button className="profilebtn1 btn-dark">Edit Profile</button> </div>
		            <div className="profiletext mt-3"> <span>Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.<brv/><br/> Artist/ Creative Director by Day #NFT minting@ with FND night. </span> </div>
		            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span> <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span> </div>
		            <div className=" px-2 rounded mt-4 profiledate "> <span className="profilejoin">Joined May, 2021</span> </div>
	       	 	</div>
	    	</div>
		</div>
	</div>
	)
}

export default Profile;