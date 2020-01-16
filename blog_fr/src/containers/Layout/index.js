import React,{useEffect} from 'react';
import {Button} from '../../components/form/Button';
import Room from '../../pages/room/index'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export function LayoutWrapper(props){
    var layout=<div>
        <input />
        <Link to="/PostCreate">Создать пост</Link>
    </div>

   if( props.status===401)
    return (
        <div >
            {console.log(props.status+" status in layout")}
            {layout}
            <button  onClick={() => props.handleFormSwitch("signUp")}>Sign Up</button>
            <button onClick={() => props.handleFormSwitch("login")}>Log In</button>
        </div>
    )
    else return(
        <div>
            {console.log(props.status+" status in layout")}
            {layout}
       <Link to="/Room">Profile</Link>
        </div>)
}

export  default LayoutWrapper;


