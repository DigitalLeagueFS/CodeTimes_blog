import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import api from "../../../services/api";
import Form, {FormRow} from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Container} from "react-bootstrap";


export default function NewPost() {
    const { register, handleSubmit, watch, errors } = useForm();
    const[number, setNumber]=useState(0)
    const tag={tag:''};
    const[tagState,setTagState]=useState([]);

    const addTag=()=>{
        setNumber(number + 1)
        setTagState([...tagState, {...tag}]);
        console.log(number)

    };





    const onSubmit = data => {
        (async function createPost() {

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

            console.log(data)
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
                formData.append('post[tags_posts_attributes][][tag_attributes][name]',tag.tag_attributes.name)
            })
            //formData.append('post[tags_posts_attributes]',data.tags_posts_attributes)
            console.log(formData)

            let token=localStorage.getItem("token")

            fetch(`http://127.0.0.1:3000/api/posts/`, {
                method: 'POST',
                headers: {'Authorization':`Bearer ${token}`},
                body: formData
            })

            data.images=files
            console.log(data)

        //    let res = await api.posts.create(data);
            //console.log(res.data);

        })();
    }

    let [files,setFiles]=useState([])

    let date= new Date()

    function DeleteTag(index)
    {
        let newTags=tagState.filter(function(val,i)
        {
            return i!=index
        })
        setTagState(newTags)
    }




    return (
        <>
            <h1>New Post</h1>
            <Container  >
            <Form  onSubmit={handleSubmit(onSubmit)} >
                <Form.Group as={Row} className="d-flex justify-content-center   ">
                    <Form.Label column sm={2}>Title *</Form.Label>
                    <Col xs lg={2} sm={10}>
                    <Form.Control name="title" ref={register({required:true})} />
                    </Col>
                    { errors.title && <Col xs lg={2} sm={10}>
                        <span>This field is required</span>
                    </Col> }
                </Form.Group>

                <Form.Group as={Row}  className="d-flex justify-content-center" >
                    <Form.Label column sm={2}>Tags</Form.Label>
                    <Col xs lg={2} sm={10}>
                    <Button variant="outline-secondary" onClick={addTag} type="button" >add</Button>
                    </Col>

                </Form.Group>

                {
                    tagState.map((Tag,index)=>{
                        return(<Form.Group as={Row}  className="d-flex justify-content-center" >
                                <Col xs lg={2} sm={10}>
                                    <Form.Control name={`tags_posts_attributes[${index}].tag_attributes.name`}  key={index} ref={register({ required: true })}  />
                                </Col>
                                <Col xs lg={2} sm={10}>
                                    <Button variant="outline-danger" type="button" onClick={()=>DeleteTag(index)}>delete</Button>
                                </Col>

                            </Form.Group>
                        )
                    })
                }

                <Form.Group as={Row}  className="d-flex justify-content-center" >
                    <Form.Label column sm={2}>category *</Form.Label>
                    <Col xs lg={2} sm={10}>
                        <Form.Control name="category" ref={register({required:true})} />
                    </Col>
                    {errors.category && <Col xs lg={2} sm={10}> This field is required </Col> }
                </Form.Group>

                <Form.Group as={Row}  className="d-flex justify-content-center" >
                    <Form.Label column sm={2}>content</Form.Label>
                    <Col xs lg={2} sm={10}>
                        <Form.Control as={"textarea"} name="content" ref={register({required:true})} />
                    </Col>
                    {errors.content && <Col xs lg={2} sm={10}>
                        this field is required
                    </Col>}
                </Form.Group>

                <Form.Group as={Row}  className="d-flex justify-content-center"  >
                    <Form.Label column sm={2}>Images</Form.Label>
                    <Col xs lg={2} sm={10}>
                    <Form.Control type="file" onChange={e=>setFiles(Array.from(e.target.files))} multiple="multiple" name="avatars[]" ref={register({ })}  />
                    </Col>
                </Form.Group>

                <input name="date_of_publication" hidden value={date} type={'text'} ref={register({ required: true })} />

                <input name="user_id" hidden value={localStorage.getItem("id")} type={'text'} ref={register({ required: true })} />
                <Form.Group as={Row}  className="d-flex justify-content-center"  >
                <Col> <Button type="submit"  >send </Button> </Col>
                </Form.Group>


            </Form>
            </Container>

        </>
    )
}
