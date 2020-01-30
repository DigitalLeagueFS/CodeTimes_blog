import React, {useEffect, useRef, useState} from 'react'
import { useForm } from 'react-hook-form'
import api from "../../../services/api";

export default function ShowPost(props)
{
    let[post,setPost]=useState([])
    let[like,setLike]=useState(false)

    async function SetLike()
    {
        let res=await api.likes.create({post_id:post.id, user_id:localStorage.getItem("id"), created_at:new Date(), updated_at:new Date()})

    }

    async function GetPost()
    {
        const{id}=props.match.params
        let response=await api.posts.show({id})
        console.log(response.data)
        setPost(response.data)
        console.log(post.data)
        setLike(await CheckLike())

    }

    async function CheckLike()
    {

        let like=await api.likes.show({id:post.id})
        return like.data===null
    }

    useEffect( ()=>{
        GetPost()


    },[] )


    return(
        <div>
            <p>{post.user && post.user.name}</p>
            <h1>{post.title}</h1>
            <p className={"card-text mb-auto"}>{post.content}</p>
            <p>{post.likes_count}</p>
            <button disabled={!like}  onClick={SetLike}>Like</button>
            <p>{post.comments_count}</p>
        </div>
    )
}
