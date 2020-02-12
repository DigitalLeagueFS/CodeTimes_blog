import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import api from "../../../services/api";
import {register} from "../../../serviceWorker";
import Form from "react-bootstrap/Form";
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {CardStyle} from "../../../styles/styles";

export default function EditPost(props)
{
    const { register, handleSubmit, watch, errors } = useForm();

    const[post,setPost]=useState({})
    const tag={tag:''}
    const[tagState,setTagState]=useState([])


    let [files,setFiles]=useState([])

    const[tags,setTags]=useState([])

    const addTag=()=>{
        setTagState([...tagState,{tag}])
    }

    useEffect(()=>
    {
        GetPost()

    },[])




    useEffect(
        ()=>{
            if(Object.keys(post).length!=0)
            GetTags()





        },[JSON.stringify(post)]
    )

    useEffect(()=>{
     setTagState([])
        tags.map(
            (async (TagsPost,i)=> {


                let t= TagsPost.tag_id
                t=await api.tags.show({id:t})
                t.data.ex="Yes"
                t.data.TagsPostId=TagsPost.id
                setTagState(prevState => [...prevState,t.data])
            })
        )
    },[tags])

    useEffect(()=>
    {
       console.log(tagState)
    },[tagState])

    async function GetTags()
    {
        let tagsPosts=await api.tagsPost.fetchAll({post_id:post.id})
        setTags(tagsPosts.data)


    }

    async function GetPost()
    {
        const{id}=props.match.params
        const response=await api.posts.show({id})
        setPost(response.data)

    }

    const OnSubmit=data=>{
        (async function EditPost()
        {
            console.log(post)
           let found=false
            let index
            let cat=await api.categories.fetchAll();
            cat.data.map(function(category,i){
                if(category.name===data.category) {
                    index = category.id
                    found=true
                }
            })
            if(found===true)
                data.category_id=index
            else {
                let category=await api.categories.create({name:data.category})
                index=category.id
                data.category_id=index
            }

            let formData=new FormData()
            formData.append('post[category_id]',data.category_id)
            formData.append('post[title]',data.title)
            formData.append('post[user_id]',data.user_id)
            formData.append('post[content]',data.content)
            formData.append('post[date_of_publication]',data.date_of_publication)
            files.map((file,index)=>{
                formData.append(`post[avatars[]`,file)
            })
            if(data.tags_posts_attributes)
                data.tags_posts_attributes.map((tag,index)=>{
                  if(tagState[index].ex!=="Yes" )  formData.append('post[tags_posts_attributes][][tag_attributes][name]',tag.tag_attributes.name)
                })

            let token=localStorage.getItem("token")

            fetch(`http://127.0.0.1:3000/api/posts/${post.id}`, {
                method: 'put',
                headers: {'Authorization':`Bearer ${token}`,     'Access-Control-Allow-Origin':'*'},
                body: formData
            })

        })();
    }

  async  function DeleteTag(id,index) {
        if(id!=null) {
            let tag = await api.tagsPost.destroy({id: id})
        }
      let tags=tagState.filter(function (val,i) {
        return i!==index
      })
      setTagState(tags)

    }

    async function deleteImage(index)
    {


        let data=new FormData()
        data.append("post[post_id]",post.id)
        data.append("post[avatar_id]",index)
        let token=localStorage.getItem("token")
        fetch(`http://127.0.0.1:3000/api/posts/deleteImage`, {
            method: 'POST',
            headers: {'Authorization':`Bearer ${token}`},
            body: data
        })
        let newPost=Object.assign({}, post)
         newPost.avatars= newPost.avatars.filter(function(val,i){
             return i!=index
         })



        setPost(newPost)
    }



    return(
        <div>
            {
                post && <Form style={CardStyle} onSubmit={handleSubmit(OnSubmit)}>
                    {post.user &&   <input name="user_id" hidden value={post.user.id} type={'text'} ref={register({ required: true })} />}
                    <input name="id" hidden defaultValue={post.id}  ref={register}/>
                    <input name="created_at" hidden defaultValue={post.created_at}  ref={register}/>
                    <input name="updated_at" hidden defaultValue={post.updated_at}  ref={register}/>
                    <FormGroup as={Row} className="d-flex justify-content-center   ">
                        <FormLabel column sm={2}>title</FormLabel>
                        <Col xs lg={2}>
                            <FormControl name="title" defaultValue={post.title} ref={register({required: true})} />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row} className="d-flex justify-content-center   ">
                        <FormLabel column sm={2}>content</FormLabel>
                        <Col xs lg={2}>
                            <FormControl as={"textarea"}  name="content" defaultValue={post.content} ref={register({required: true})} />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row} className="d-flex justify-content-center   ">
                        <FormLabel column sm={2}>addTag </FormLabel>
                        <Col xs lg={2}>
                            <Button variant="outline-secondary" onClick={addTag}  style={{size:"90px"}}>add</Button>
                        </Col>
                    </FormGroup>

                    {
                        tagState.map((Tag,index)=>{
                            return(<FormGroup as={Row} className="d-flex justify-content-center   ">
                                    <Col xs lg={2}>
                                        <input name={`tags_posts_attributes[${index}].tag_attributes.name`} defaultValue={Tag.name} key={index} ref={register({ required: true })}  />
                                    </Col>

                                    {Tag.ex==="Yes" && <Col xs lg={2}> <Button type="button" variant="outline-danger" onClick={()=>DeleteTag(Tag.TagsPostId,index)}>delete</Button> </Col>}
                                    {Tag.ex !=="Yes" &&  <Col xs lg={2}> <Button type="button" variant="outline-danger" onClick={()=>DeleteTag(null,index)}>delete</Button> </Col> }
                                </FormGroup>
                            )
                        })
                    }

                    {
                        post.category &&  <FormGroup className="d-flex justify-content-center   " as={Row}>
                            <FormLabel column sm={2}>Category</FormLabel>
                            <Col xs lg={2}>
                                <FormControl name="category" defaultValue={post.category.name} ref={register({required: true})} />
                            </Col>
                        </FormGroup>
                    }

                    {post && post.avatars && post.avatars.map((image,index)=>{
                        return(<Row className="d-flex justify-content-center   ">
                            <img src={`http://127.0.0.1:3000${image.url}`} height="100px" width="200px" />
                            <Button type="button" variant="outline-danger" onClick={()=>deleteImage(index)}>delete</Button>

                        </Row>)
                    }) }


                    <FormGroup as={Row} className="d-flex justify-content-center   ">
                        <FormLabel column sm={2}>Add images</FormLabel>
                        <Col xs lg={2}>
                            <FormControl type={"file"}  onChange={e=>setFiles(Array.from(e.target.files))} multiple="multiple" name="avatars[]" ref={register({ })} />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row} className="d-flex justify-content-center   ">
                        <Button type="submit">Edit post</Button>
                    </FormGroup>




                </Form>
            }

        </div>
    )
}
