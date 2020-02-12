import React,{useState} from "react";
import Form from "react-bootstrap/Form";
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {CardStyle} from "../../styles/styles";

function SignInForm(props) {
    const[email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleEmailChange=(evt)=>{
        setEmail(evt.target.value)
    }

    const handlePasswordChange=(evt)=>{
        setPassword(evt.target.value)
    }

    const handleSubmit= (evt) => {
        evt.preventDefault()

            fetch(`http://localhost:3000/auth_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(resp => resp.json())
            .then(data => {
                localStorage.setItem("id",data.user.id)
                localStorage.setItem("token", data.auth_token)
                props.handleLogin(data.user)
            })

    }



    return(
        <Form onSubmit={handleSubmit} style={CardStyle}>
            <FormGroup as={Row}   className="d-flex justify-content-center   ">
                <FormLabel column sm={2}>
                    Email
                </FormLabel>
                <Col xs lg={2} sm={10}>
                    <FormControl onChange={handleEmailChange} type="text" placeholder="email" value={email} />
                </Col>
            </FormGroup>

            <FormGroup as={Row}  className="d-flex justify-content-center   ">
                <FormLabel column sm={2}>
                    Password
                </FormLabel>
                <Col xs lg={2} sm={10}>
                    <FormControl onChange={handlePasswordChange} placeholder="password" value={password}  />
                </Col>
            </FormGroup>

            <FormGroup as={Row}  className="d-flex justify-content-center   ">
                <Col xs lg={2} sm={10}>
                    <Button type="submit">Sign In</Button>
                </Col>
            </FormGroup>
        </Form>


    )
}

export default SignInForm