import './Dashboard.css';
import ProfileCard from './ProfileCard';
import MusicPlayer from './MusicPlayer';
import Playlist from './Playlist';
import Profile from './Profile';
import Library from './Library';
import { NavLink } from 'react-router-dom'; //sheika & line 28
import EditSettings from './EditSettings'; //Sheika
import EditProfile from './EditProfile';
import EditPersonalInfo from './EditPersonalInfo';
import EditGenres from './EditGenres';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';

const Dashboard = () => {
	return (
        <div>
		<header class="masthead text-center text-white">
            <div class="masthead-content">
                <div class="container">
                    <h1 class="masthead-heading mb-0">The future of music</h1>
                    <h2 class="masthead-subheading mb-0">belongs to you and me</h2>
                    <a class="btn btn-primary btn-xl rounded-pill mt-5" href="#!">Learn More</a>
                </div>
            </div>
            <div class="bg-circle-1 bg-circle"></div>
            <div class="bg-circle-2 bg-circle"></div>
            <div class="bg-circle-3 bg-circle"></div>
            <div class="bg-circle-4 bg-circle"></div>
            
        </header>
        <NavLink to="/EditSettings">Edit Settings</NavLink> 
        <EditProfile />
        <EditPersonalInfo />
        <EditGenres />
        <ChangeUsername />
        <ChangePassword />
        <ProfileCard />
        <MusicPlayer />
        <Playlist />
        <Profile />
        <Library />
        </div>
	)
}

export default Dashboard;