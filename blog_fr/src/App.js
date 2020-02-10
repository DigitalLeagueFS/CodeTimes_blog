import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home/index';
import LayoutWrapper from './containers/Layout'
import SignInForm from "./components/form/SignInForm";
import LoginForm from "./components/form/LoginForm";
import Button from "./components/form/Button";
import Room from "./pages/room/index"
import NewPost from "./pages/posts/new";
import ShowPost from "./pages/posts/show"
import EditPost from "./pages/posts/edit";

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

        <LayoutWrapper  status={status} handleFormSwitch={handleFormSwitch}/>
        {
          renderForm()
        }



      <Switch>
        <Route exact path="/" component={ (()=>(<Home status={status} />)) } />
        <Route path="/components/SignInForm" />
        <Route path="/NewPost" component={(()=>(<NewPost />))}  />
        <Route path="/Room" component={(()=>(<Room />))} />
        <Route path="/ShowPost/:id" component={ShowPost} />
        <Route path="/EditPost/:id" component={EditPost} />

      </Switch>
    </div>
      </Router>

  );
}

export default App;
