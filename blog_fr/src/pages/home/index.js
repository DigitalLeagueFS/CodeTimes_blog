import React,{useState,useEffect} from 'react'
import {LayoutWrapper} from "../../containers/Layout";
import api from "../../services/api";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

 function Home() {
     let [posts, setPosts]=useState([])
     async function getAll() {
        let res = await api.posts.fetchAll();
        setPosts(res.data);
        return res;
    }

    useEffect(()=> {
        getAll();
    },[]);


    return (
        <div>
            <LayoutWrapper/>
            <div className={"d-flex flex-row flex-wrap center-block"}>
            {
                posts.map(function (post, i) {
                    return (
                        <div className={"card flex-md-row box-shadow h-md-250"}>
                            <div className={"card-body d-flex flex-column align-items-start"}>
                            <p>{post.user.name}</p>
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

export default Home;