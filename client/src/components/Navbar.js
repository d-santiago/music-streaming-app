import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
	const notLoggedIn = (
		<>
	        <li class="nav-item">
	          <Link class="nav-link" to="/register"><h2>Register</h2></Link>
	        </li>
	        <li class="nav-item">
	          <Link to="/login" className="nav-link"><h2>Login</h2></Link>
	        </li>
	    </>
	)
	const navigate = useNavigate();
	const handleLogout = () => {
		sessionStorage.clear();
		navigate("/");
		window.location.reload();
		alert("Successfully logged out!");
	}

	const loggedIn = (
		<>
	        <li class="nav-item">
	          <a class="nav-link" aria-current="page" onClick={handleLogout}><h2>Logout</h2></a>
	        </li>
		</>
	)
	
	
	
	return (
		<nav class="navbar navbar-light navbar-expand-lg bg-primary py-3">
		  	<div class="container-fluid">
		    	{sessionStorage.uid ? 
		    		<Link to="/profile" style={{textDecoration: 'none', color: 'black'}}> <h1>ASHA Music </h1> </Link> :
		    		<Link to="/" style={{textDecoration: 'none', color: 'black'}}> <h1>ASHA Music </h1> </Link>
		    	}
		  	</div>
		  	<div class="collapse navbar-collapse" id="navbarNav">
		      	<ul class="navbar-nav ml-auto mx-0">
		      	{props.isLoggedIn != null ? loggedIn : notLoggedIn}
		      		
		        </ul>
	    	</div>
		</nav>
	)
}

export default Navbar;