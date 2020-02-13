import React,{useState} from 'react'
import Form from "react-bootstrap/Form";
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {CardStyle} from "../../styles/styles";
import {server} from "../../actions/applicationConsts";

function LoginForm(props) {
    const [email, setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleEmailChange=(evt)=>{
        setEmail(evt.target.value)
    }

    const handlePasswordChange= (evt)=>{
        setPassword(evt.target.value)
    }

    const handleSubmit=(evt)=>{
        evt.preventDefault()
       fetch(`${server}/auth_user`,
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept":"application/json"
                },
                body:JSON.stringify({
                    email,
                    password
                })
            })
            .then(resp=>resp.json())
            .then(data=>{
                localStorage.setItem("id",data.user.id)
                localStorage.setItem("token",data.auth_token)
                localStorage.setItem("name",data.user.name)
                props.handleLogin(data.user)
            })

    }



    return(
            <Form onSubmit={handleSubmit} style={CardStyle}>
                <FormGroup as={Row}  className="d-flex justify-content-center   ">
                    <FormLabel column sm={2}>Username</FormLabel>
                    <Col  xs lg="2" sm={10}>
                        <FormControl value={email} onChange={handleEmailChange} placeholder="email" />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}  className="d-flex justify-content-center   ">
                    <FormLabel column sm={2}>Password</FormLabel>
                    <Col  xs lg="2" sm={10}>
                        <FormControl type={"password"} value={password} onChange={handlePasswordChange} placeholder="password"  />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}  className="d-flex justify-content-center   " >
                    <Col  xs lg="2" sm={10}>
                        <Button type="submit">Log in</Button>
                    </Col>
                </FormGroup>
            </Form>

    )


}

export  default LoginForm