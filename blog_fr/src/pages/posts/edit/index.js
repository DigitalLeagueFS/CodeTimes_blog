import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import api from "../../../services/api";
import {register} from "../../../serviceWorker";

export default function EditPost(props)
{
    const { register, handleSubmit, watch, errors } = useForm();

    const[post,setPost]=useState({})
    const tag={tag:''}
    const[tagState,setTagState]=useState([])

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
       // console.log(tagState)
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
            let found=false
            let index
            let cat=await api.categories.fetchAll()
            cat.data.map(function(category,i){
                if(category.name===data.category){
                    index=category.id
                    found=true
                }
            })
            if(found)
            {
                data.category_id=index
            }
            else
            {
                let category=await api.categories.create({name:data.category})
                index=category.data.id
                data.category_id=index
            }
            let res=await api.posts.update(data)
            setPost(res.data)

        })();
    }

  async  function DeleteTag(id,index) {
    let tag=await api.tagsPost.destroy({id:id})
      let tags=tagState.filter(function (val,i) {
        return i!==index
      })
      setTagState(tags)

    }



    return(
        <div>
            {
                post && <form onSubmit={handleSubmit(OnSubmit)}>
                    <input name="id" hidden defaultValue={post.id}  ref={register}/>
                    <input name="created_at" hidden defaultValue={post.created_at}  ref={register}/>
                    <input name="updated_at" hidden defaultValue={post.updated_at}  ref={register}/>
                    <label htmlFor="title">Title*</label>
                    <input name="title" defaultValue={post.title} ref={register({required: true})}/>
                    {errors.name && <span>This field is required</span>}
                    <br/>
                    <label htmlFor="content">Content*</label>
                    <input name="content" defaultValue={post.content} ref={register({required: true})}/>
                    {errors.name && <span>This field is required</span>}
                    <br/>

                    <button onClick={addTag}  style={{size:"90px"}}>add</button>
                    {
                        tagState.map((Tag,index)=>{
                            return(<div>
                                    <input name={`tags_posts_attributes[${index}].tag_attributes.name`} defaultValue={Tag.name} key={index} ref={register({ required: true })}  />
                                    {Tag.ex==="Yes" &&<button type="button" onClick={()=>DeleteTag(Tag.TagsPostId,index)}>delete</button>}
                                </div>
                            )
                        })
                    }
                    <br/>
                    <label htmlFor="category">Category*</label>
                    {
                        post.category &&
                        <input name="category" defaultValue={post.category.name} ref={register({required: true})}/>
                    }
                    {errors.name && <span>This field is required</span>}
                    <input type="submit" />
                </form>
            }
        </div>
    )
}
