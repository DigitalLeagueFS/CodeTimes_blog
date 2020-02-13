import React, {useEffect, useRef, useState} from 'react'
import { useForm } from 'react-hook-form'
import api from "../../../services/api";
import likeImg from "../../../images/like.png";
import unlikeImg from "../../../images/unlike.png"
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import commentaryImg from "../../../images/commentary.png";
import {Container, Toast, ToastBody, ToastHeader} from "react-bootstrap";
import {CardStyle, TransButton} from "../../../styles/styles";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {server} from "../../../actions/applicationConsts"
import  {SetLike} from "../../../actions/Functions"



export default function ShowPost(props)
{
    const[post,setPost]=useState({})
    const[like,setLike]=useState(false)
    const[comment,setComment]=useState("")
    const[comments,setComments]=useState([])
    const[isShow,setShow]=useState(null)

    useEffect( ()=>{
        GetPost().then(resp=> {
           CheckLike(resp.data)
            setPost(resp.data)

        })
        GetComments()
        console.log(post)
    },[JSON.stringify(post)] )







    async function GetPost()
    {
        const{id}=props.match.params
        const response=await api.posts.show({id})

        return response

    }

    function CheckLike(data)
    {
        data.like.map(function (like,i)
        {
            if(like.user_id==localStorage.getItem("id")) {
                setLike(true)
            }
        })
    }

            async  function  AddComment() {
                if (comment != "") {
                    const res = await api.comments.create({
                        description: comment,
                        post_id: post.id,
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                   await GetComments()
                }

            }
            
            async function  GetComments() {
                let comments=await api.comments.fetchAll({post_id:post.id});
                console.log(comments.data)
                setComments(comments.data)
            }

    const handleTextareaChange=e=>{
        setComment(e.target.value)
    }




    return(

        <Container style={CardStyle}>
            <Card style={CardStyle}>
                <Card.Header>{post.title} </Card.Header>

                <p>{post.user && post.user.name}</p>
                {post.user && post.user.avatar && <Card.Subtitle className="mb-2 text-muted">
                    <img src={`${server}${post.user.avatar.url}`} height="50px" />
                </Card.Subtitle>}
                <Card.Text>{post.content}</Card.Text>



                {post && <Row>
                    {post.avatars  && post.avatars.map((image,index)=>{
                        return(<Col> <button style={TransButton} onClick={()=>setShow(`${server}${image.url}`)}> <img src={`${server}${image.url}`} max-height="400px" max-width="200px" /> </button>  </Col>)
                    }) }

                    {isShow!=null && <Lightbox mainSrc={isShow} onCloseRequest={()=>setShow(null)}  />}

                </Row>}

            <br/>
            <Row>
                <Col>  <button disabled={like}  onClick={()=>SetLike(post,setLike,GetPost)}>{like && <img src={likeImg} />} {like==false && <img   src={unlikeImg} />} </button></Col>
                <Col>   <p><img src={commentaryImg} />{post.comments_count}</p></Col>

            </Row>

            </Card>
            <textarea cols="100" onChange={handleTextareaChange}></textarea>
            <br/>

            <button onClick={AddComment}>Add comment</button>
            <div>
                {

                   post.comments!=null   && post.comments.map(function (comment,i)
                    {
                        return(

                            <div className={"d-flex justify-content-center"}>
                            <Toast >

                                <ToastBody>{comment.description}</ToastBody>
                            </Toast>
                            </div>

                        )
                    })


                }
            </div>





        </Container>

    )
}
