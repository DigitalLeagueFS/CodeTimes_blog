import React,{useState,useEffect} from 'react'
import api from "../../services/api"
import {Link} from "react-router-dom";
import EditPost from "../posts/edit";
import {useForm} from "react-hook-form";
import Axios from "axios";
import posts from "../../services/api/posts";

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


               //    let user=await api.users.update({formData})

               fetch(`http://127.0.0.1:3000/api/users/${user.id}`, {
                    method: 'put',
                    headers: {'Authorization':`Bearer ${token}`},
                    body: formData
                })




                // Axios({
                //     method:'put',
                //     url:`http://127.0.0.1:3000/api/users/${user.id}`,
                //     data:userr,
                //     headers:{'Content-Type':'multipart/form-data',  'Authorization':`Bearer ${token}`}
                // })
                //     .then(function (response){
                //         console.log(response)
                //     })

           // console.log(data)
    //       data.avatar=file
     //    let user=await api.users.update(data)
         //   console.log(user.data)
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
            <form onSubmit={handleSubmit(OnSubmit)}>
                {user.avatar &&   <img src={`http://127.0.0.1:3000${user.avatar.url}`} height="50px" />}
                <br/>
                <input name="id" hidden defaultValue={user.id} ref={register({required:true})} />
                <label htmlFor="name">name*</label>
                <input name="name" defaultValue={user.name} ref={register({required:true})} />
                {errors.name && <span>This field is required</span>}
                <br/>
                <label htmlFor="bio">bio</label>
                <textarea name="bio" defaultValue={user.bio} ref={register} />
                <br/>
                <label htmlFor="email">email*</label>
                <input name="email" defaultValue={user.email} ref={register({required:true})} />
                <input type="file" onChange={fileChange} name="avatar" ref={register}/>
                {errors.name && <span>This field is required</span>}
                <br/>
                <input type="submit" value="update"/>
                <br/>
            </form>

            <div className={"d-flex flex-row flex-wrap center-block"}>
                {
                    posts.map(function (post, i) {
                        return (
                            <div className={"card flex-md-row box-shadow h-md-250"}>
                                <div className={"card-body d-flex flex-column align-items-start"}>
                                    <Link to={"ShowPost/"+post.id} >go</Link>
                                    <p>{post.user.name}</p>
                                    <button> <Link to={"EditPost/"+post.id}>edit</Link> </button>
                                    <button type="button" onClick={()=>removePost(post.id,i)}>remove</button>
                                    <h1>{post.title}</h1>
                                    <p className={"card-text mb-auto"}>{post.content}</p>
                                    <p>{post.likes_count}</p>
                                    <p>{post.comments_count}</p>
                                </div>
                            </div>

                        )
                    })

                }
            </div>
        </div>
    );

}

export default Room;