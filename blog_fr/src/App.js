import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home/index';

import{
  BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (

      <Router>
        <Home/>
        <div>
          <ul>
          </ul>
        </div>

    <div className="App">
    <Route path="/">
    </Route>
    </div>
      </Router>

  );
}

export default App;
