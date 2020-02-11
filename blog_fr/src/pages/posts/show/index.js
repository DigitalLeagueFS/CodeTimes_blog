import React, {useEffect, useRef, useState} from 'react'
import { useForm } from 'react-hook-form'
import api from "../../../services/api";
import likeImg from "../../../images/like.png";
import unlikeImg from "../../../images/unlike.png"


export default function ShowPost(props)
{
    const[post,setPost]=useState({})
    const[like,setLike]=useState(false)
    const[comment,setComment]=useState("")
    const[comments,setComments]=useState([])

    useEffect( ()=>{
        GetPost().then(resp=> {
           CheckLike(resp.data)
            setPost(resp.data)

        })
        GetComments()
        console.log(post)
    },[JSON.stringify(post)] )





    async function SetLike()
    {
        let res=await api.likes.create({post_id:post.id, user_id:localStorage.getItem("id"), created_at:new Date(), updated_at:new Date()})
        setPost((await GetPost()).data)

    }

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
                    GetComments()
                }

            }
            
            async function  GetComments() {
                let comments=await api.comments.fetchAll({post_id:post.id});
                setComments(comments.data)
            }

    const handleTextareaChange=e=>{
        setComment(e.target.value)
    }




    return(

        <div>

            {post.user && post.user.avatar &&   <img src={`http://127.0.0.1:3000${post.user.avatar.url}`} height="50px" width="100px" />}
            <br/>
            <p>{post.user && post.user.name}</p>
            <h1>{post.title}</h1>
            <p className={"card-text mb-auto"}>{post.content}</p>
            <p>{post.likes_count}</p>

            <button disabled={like}  onClick={SetLike}>{like && <img src={likeImg} />} {like==false && <img   src={unlikeImg} />} </button>
            <p>{post.comments_count}</p>
            {post && post.avatars && post.avatars.map((image,index)=>{
                return(<img src={`http://127.0.0.1:3000${image.url}`} height="100px" width="200px" />)
            }) }
            <br/>
            <textarea onChange={handleTextareaChange}></textarea>
            <br/>

            <button onClick={AddComment}>Add comment</button>
            <div>
                {
                    comments.map(function (comment,i)
                    {
                        return(
                        <div>
                            <p>{comment.description}</p>
                            <p>{comment.user.name}</p>
                        </div>
                        )
                    })
                }
            </div>
        </div>

    )
}
