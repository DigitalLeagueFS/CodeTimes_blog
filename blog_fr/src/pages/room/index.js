import React,{useState,useEffect} from 'react'
import api from "../../services/api"
import {Link} from "react-router-dom";
import EditPost from "../posts/edit";
import {useForm} from "react-hook-form";
import Axios from "axios";
import posts from "../../services/api/posts";
import Form from "react-bootstrap/Form";
import {Button, Container, DropdownButton, DropdownItem, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import likeImg from "../../images/like.png";
import unlikeImg from "../../images/unlike.png"
import commentaryImg from "../../images/commentary.png"
import Card from "react-bootstrap/Card";
import {CardStyle} from "../../styles/styles";

function Room(){
    const { register, handleSubmit, watch, errors } = useForm();
    let [posts, setPosts]=useState([])
    let [user,setUser]=useState([])
    let[file,setFile]=useState(null)

    async function getAll() {
        let userData=await api.users.fetchAll({only_my:true});
        setUser(userData.data)
        let res = await api.posts.fetchAll({only_my:true});
        setPosts(res.data);
        return res;
    }


    useEffect(()=> {
        getAll();
    },[]);

    const OnSubmit=data=>{
        (
            async function UpdateUser() {
                let object={}
                let formData = new FormData();
                formData.append('user[id]',data.id)
                formData.append('user[name]', data.name)
                formData.append('user[bio]', data.bio)
                formData.append('user[avatar]', file)
                formData.append('user[email]',data.email)

                let token=localStorage.getItem("token")
                formData.forEach((value, key) => {object[key] = value});
                let userr={user:{...object}}



               fetch(`http://127.0.0.1:3000/api/users/${user.id}`, {
                    method: 'put',
                    headers: {'Authorization':`Bearer ${token}`},
                    body: formData
                })


            }
        )();
    }

    function fileChange(event)
    {
        setFile(event.target.files[0])
    }

    async function removePost(id,index) {
        await api.posts.destroy({id:id})
        let newPosts=posts.filter(function(val,i){
            return i!=index
        })
        setPosts(newPosts)
    }


    return (
        <div>
            <Form style={CardStyle}  onSubmit={handleSubmit(OnSubmit)}>

                {user.avatar &&  <Form.Group as={Row} className={"d-flex justify-content-center"}>
                    <img src={`http://127.0.0.1:3000${user.avatar.url}`} height="50px" />
                </Form.Group> }

                <Form.Group  as={Row} className="d-flex justify-content-center   ">
                    <Form.Label column sm={2}>Name</Form.Label>
                   <Col sm={10} xs lg="2"> <Form.Control   name="name"  defaultValue={user.name} type="text" placeholder="name"  ref={register({required:true})} />
                </Col>
                    { errors.name && <Col xs lg={2} sm={10}>
                        <span>This field is required</span>
                    </Col> }
                </Form.Group>



                <Form.Group as={Row} className="d-flex justify-content-center   ">
                    <Form.Label column sm={2}>Bio</Form.Label>
                 <Col xs lg="2" sm={10}>
                     <Form.Control as="textarea" name="bio" defaultValue={user.bio}  ref={register} />
                 </Col>
                    { errors.bio && <Col xs lg={2} sm={10}>
                        <span>This field is required</span>
                    </Col> }
                </Form.Group>

                <Form.Group as={Row} className="d-flex justify-content-center   ">
                <Form.Label column sm={2}>Email</Form.Label>
              <Col xs lg="2" sm={10}>  <Form.Control name="email" defaultValue={user.email} type="text" ref={register({required: true})}/>
              </Col>
                    { errors.title && <Col xs lg={2} sm={10}>
                        <span>This field is required</span>
                    </Col> }

                </Form.Group>

                <Form.Group as={Row} className="d-flex justify-content-center   ">
                <Form.Label column sm={2}>Avatar</Form.Label>
                    <Col xs lg="2" sm={10}>
                <Form.Control name="avatar" type="file" onChange={fileChange} ref={register} />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="d-flex justify-content-center" >
                <Button variant="primary" type="submit">update</Button>
                </Form.Group>
            </Form>



            <Container>
                {
                    posts.map(function (post, i) {
                        return (
                            <Card style={CardStyle}>
                                <Card.Header> <Row>  <Col> <Link to={"ShowPost/"+post.id} >   <Button variant="light">{post.title}  </Button></Link> </Col>


                                 <Col>  <DropdownButton variant={"success"} id={"Options"} title={"Options"}>
                                        <DropdownItem> <Button  variant="light" type={"button"}>  <Link to={"EditPost/"+post.id}>edit</Link> </Button>   </DropdownItem>
                                        <DropdownItem> <Button  variant="light" type="button" onClick={()=>removePost(post.id,i)}>remove</Button></DropdownItem>
                                    </DropdownButton>
                                 </Col>
                                </Row>
                                </Card.Header>
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

        </div>
    );

}

export default Room;