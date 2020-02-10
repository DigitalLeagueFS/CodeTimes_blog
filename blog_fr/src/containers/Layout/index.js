import React,{useEffect} from 'react';
import {Button} from '../../components/form/Button';
import Room from '../../pages/room/index'
import NewPost from "../../pages/posts/new";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Link
} from "react-router-dom";



export function LayoutWrapper(props){
    let location=useLocation()


    var layout=<div>
        <input />
        <Link to="/NewPost">Создать пост</Link>
    </div>

   if( props.status===401) {
       return (
           <div>
               {console.log(props.status + " status in layout")}
               {layout}
               <button onClick={() => props.handleFormSwitch("signUp")}>Sign Up</button>
               <button onClick={() => props.handleFormSwitch("login")}>Log In</button>
           </div>
       )
   }
    else return(
        <div>
            {    console.log(props.location)}
            {console.log(props.status+" status in layout")}
            {layout}
       <Link to="/Room">Profile</Link>
            {location.pathname!="/" && <Link to="/">Home</Link>}
        </div>)

}

export  default LayoutWrapper;


