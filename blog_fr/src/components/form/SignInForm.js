import React,{useState} from "react";
import Form from "react-bootstrap/Form";
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {CardStyle} from "../../styles/styles";
import api from "../../services/api"
import axios from 'axios'

function SignInForm(props) {
    const[email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const [csrf,setCsrf]=useState(null)

    const handleEmailChange=(evt)=>{
        setEmail(evt.target.value)
    }

    const handlePasswordChange=(evt)=>{
        setPassword(evt.target.value)
    }

    const handleSubmit= async(evt) => {
        evt.preventDefault()
      // let c= await api.users.create({email:email,password:password})

        await axios.post(
            "http://localhost:3000/getToken"
        ).then(res=>setCsrf(res.data.csrf))

     //   let token = document.getElementsByName('csrf-token')[0].getAttribute('content')

        axios.defaults.headers.common['X-Csrf-Token'] = csrf
        axios.defaults.headers.common['Accept'] = 'application/json'
        axios.defaults.headers.common ['Access-Control-Allow-Origin']='*'

       await axios.post('http://localhost:3000/users', {
            user: {
                email: email,
                password: password
            }
        })
            .then(response => {
               console.log(response)
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
                    <FormControl type={"password"} onChange={handlePasswordChange} placeholder="password" value={password}  />
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