import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home/index';
import LayoutWrapper from './containers/Layout'
import SignInForm from "./components/form/SignInForm";
import LoginForm from "./components/form/LoginForm";
import Button from "./components/form/Button";
import Room from "./pages/room/index"

import{
  BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  const [user,setUser]=useState({})
  const [form,setForm]=useState("")
  const [status,setStatus]=useState(0)

  useEffect(()=>{
    const token=localStorage.getItem("token")
      fetch(`http://localhost:3000/auth`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
          .then(resp => setStatus(resp.status))
  },  [status])

  const handleLogin=(user)=>{
    setStatus(204)
    setUser(user)
  }

  const handleFormSwitch=(input)=>{
    setForm(input)
  }

  const handleAuthClick=()=>{
    const token=localStorage.getItem("token")
    fetch(`http://localhost:3000/user_is_authed`,{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
        .then(resp => resp.json())
        .then(data => console.log(data))
  }




  const renderForm=()=>{



    if(status===401) {
      switch (form) {
        case "login":
          return <LoginForm handleLogin={handleLogin}/>
          break;
        default:
          return <SignInForm handleLogin={handleLogin}/>

      }
    }
  }



  return (
      <Router>
        <div className="App">

        <LayoutWrapper status={status} handleFormSwitch={handleFormSwitch}/>
        {
          renderForm()
        }
        <button onClick={handleAuthClick} >Access Authorized Route</button>


      <Switch>
        <Route exact path="/" component={ (()=>(<Home status={status} />)) } />
        <Route path="/components/SignInForm" />
        <Route path="/Room" component={(()=>(<Room />))} />
      </Switch>
    </div>
      </Router>

  );
}

export default App;
