import { useState } from 'react';

import './App.css';
import Navbar from './components/Navbar';
import Dashboard from  './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  const [page, setPage] = useState("Dashboard");
  const [loggedIn, setLoggedIn] = useState(false);
    return (
      <div>
        <Navbar setPage={setPage} />
        {page == "Dashboard" ? <Dashboard /> : (page == "Login" ? <Login /> : <Register /> ) }
      </div>
    );
}

export default App;