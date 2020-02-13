import api from "../services/api";



 export async function getAll(setPosts) {
    let res = await api.posts.fetchAll();
    console.log(res.data)
    setPosts(res.data);
    return res;
}

export async function GetTags(post,setTags)
{
    let tagsPosts=await api.tagsPost.fetchAll({post_id:post.id})
    setTags(tagsPosts.data)


}


export async function SetLike(post,setPost,GetPost)
{
    let res=await api.likes.create({post_id:post.id, user_id:localStorage.getItem("id"), created_at:new Date(), updated_at:new Date()})
    setPost((await GetPost()).data)

}



