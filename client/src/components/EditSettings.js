import { Link } from 'react-router-dom'; 
import EditProfile from './EditProfile';
import EditPersonalInfo from './EditPersonalInfo';
import EditGenres from './EditGenres';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';
import Upload from './Upload';

const EditSettings = () => {
    return (
        <div className="col-md-2 mx-auto mt-5">
            <h2>Settings</h2>
            <div className="my-3">
    		    <Link to="/settings/editprofile" className="btn btn-primary">Edit Profile</Link> 		    	
            </div>
            <div className="my-3">
                <Link to="/settings/editpersonalinfo" className="btn btn-primary">Edit Personal Information</Link> 
            </div>
            <div className="my-3">
                <Link to="/settings/editgenres" className="btn btn-primary">Edit Genres</Link> 
            </div>
            <div className="my-3">
                <Link to="/settings/changeusername" className="btn btn-primary">Change Username</Link>  
            </div>
            <div className="my-3">
                <Link to="/settings/changepassword" className="btn btn-primary">Change Password</Link> 
            </div> 
            <div className="my-3">
                <Link to="/settings/Upload" className="btn btn-primary">Upload</Link> 
            </div>
        </div>
    )
}

export default EditSettings;