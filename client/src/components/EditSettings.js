import { Link } from 'react-router-dom'; 
import EditProfile from './EditProfile';
import EditPersonalInfo from './EditPersonalInfo';
import EditGenres from './EditGenres';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';

const EditSettings = () => {
    return (
        <div>
        <header>
        <div>
		    <Link to="/EditProfile" className="btn btn-primary">Edit Profile</Link> 		    	
        </div>
        <div>
            <Link to="/EditPersonalInfo" className="btn btn-primary">Edit Personal Information</Link> 
        </div>
        <div>
            <Link to="/EditGenres" className="btn btn-primary">Edit Genres</Link> 
        </div>
        <div>
            <Link to="/ChangeUsername" className="btn btn-primary">Change Username</Link>  
        </div>
        <div>
            <Link to="/ChangePassword" className="btn btn-primary">Change Password</Link> 
        </div> 
        </header>
        </div>
    )
}

export default EditSettings;