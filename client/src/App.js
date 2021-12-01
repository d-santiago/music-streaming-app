import { useState } from 'react';

import './App.css';
import Navbar from './components/Navbar';
import Dashboard from  './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';


function App() {
    return (
      <div>
        <Dashboard />
      </div>
    );
}

export default App;