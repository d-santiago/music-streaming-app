import './Dashboard.css';
import Profile from './Profile';
import MusicPlayer from './MusicPlayer';
import Playlist from './Playlist';


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
        <Profile />
        <MusicPlayer />
        <Playlist />
        </div>
	)
}

export default Dashboard;