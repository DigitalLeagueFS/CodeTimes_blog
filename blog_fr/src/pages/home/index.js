import React,{useState,useEffect} from 'react'
import {LayoutWrapper} from "../../containers/Layout";
import api from "../../services/api";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowPost from "../posts/show";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useHistory } from 'react-router-dom';
import Button from "react-bootstrap/Button";

import likeImg from "../../images/like.png";
import unlikeImg from "../../images/unlike.png"
import commentaryImg from "../../images/commentary.png"

 function Home(props) {
     let [posts, setPosts]=useState([])
         useEffect(() => {
             console.log(props.status)
             if(props.status===204) {
                 getAll();
             }
         }, [props.status]);


     async function getAll() {
             let res = await api.posts.fetchAll();
             setPosts(res.data);
             return res;
         }


    return (
        <Container>
            <Row>
                <Col><Card>kek</Card></Col>
            </Row>
            {
                posts.map(function (post, i) {
                    return (
                        <Card>
                            <Card.Header>   <Link to={"ShowPost/"+post.id} >   <Button variant="light">{post.title}  </Button></Link></Card.Header>

                            <p>{post.user.name}</p>
                            {post.user && post.user.avatar && <Card.Subtitle className="mb-2 text-muted">
                                <img src={`http://127.0.0.1:3000${post.user.avatar.url}`} height="50px" />
                            </Card.Subtitle>}
                            <Card.Text>{post.content}</Card.Text>
                            <p><img src={unlikeImg} /> {post.likes_count}</p>
                            <p><img src={commentaryImg} />{post.comments_count}</p>
                        </Card>

                    )
                })
            }
        </Container>
    );
}

export default Home;