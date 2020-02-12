import React, {useEffect, useState} from 'react';

import Room from '../../pages/room/index'
import NewPost from "../../pages/posts/new";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Link
} from "react-router-dom";
import {Nav, NavItem} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";



export function LayoutWrapper(props){

    const[status,setStatus]=useState(0)

    useEffect(()=>{
       setStatus(props.status)
    })

    function exit()
    {
        localStorage.removeItem("token")
        setStatus( 401)
        window.location.reload()

    }

    let location=useLocation()


    var layout=<div>
        <input />

    </div>

    return(
        <div>
        { (status === 401) &&  <div className="d-flex justify-content-center   ">

            <Navbar bg="light" expand={"lg"}>
                <Nav>
                    <NavItem>{layout}</NavItem>
                </Nav>
                <Nav className="mr-auto">
                <NavItem>
            <Button variant="light" onClick={() => props.handleFormSwitch("signUp")}>Sign Up</Button>
                </NavItem>
                <NavItem>
            <Button variant="light" onClick={() => props.handleFormSwitch("login")}>Log In</Button>
                </NavItem>
                </Nav>
            </Navbar>
        </div>
        }
    {status===204 && <div className="d-flex justify-content-center   ">
        <Navbar bg="light" expand="lg">
        {layout}

        <Nav className={"mr-auto "} >

            <Nav.Item>
                <Nav.Link  href="/Room">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/NewPost">New post </Nav.Link>
            </Nav.Item>
            {location.pathname!="/" &&   <Nav.Item>
                <Nav.Link href="/">Home </Nav.Link>
            </Nav.Item>}
            <Nav.Item>
                <Nav.Link onClick={exit}>exit </Nav.Link>
            </Nav.Item>

        </Nav>
        </Navbar>



    </div>}
        </div>
    )



}

export  default LayoutWrapper;


