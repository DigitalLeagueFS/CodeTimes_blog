import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import api from "../../../services/api";


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
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">Title *</label>
                <input name="title" ref={register({ required: true })} />
                {errors.name && <span>This field is required</span>}
                <br/>
                <button onClick={addTag}  style={{size:"90px"}}>add</button>
                {
                    tagState.map((Tag,index)=>{
                        return(<div>
                                <input name={`tags_posts_attributes[${index}].tag_attributes.name`}  key={index} ref={register({ required: true })}  />
                                <button type="button" onClick={()=>DeleteTag(index)}>delete</button>

                            </div>
                        )
                    })
                }
                <label htmlFor="category">Category *</label>
                <input name="category" ref={register({ required: true })} />
                {errors.name && <span>This field is required</span>}
                <br/>


                <label htmlFor="content">Content *</label>
                <textarea name="content" ref={register({ required: true })} />
                {errors.name && <span>This field is required</span>}
                <br/>
                <input name="date_of_publication" hidden value={date} type={'text'} ref={register({ required: true })} />
                {errors.date && <span>This field is required</span>}
                <br/>

                <p>Добавить файлы</p>
                <input type={"file"} onChange={e=>setFiles(Array.from(e.target.files))} multiple="multiple" name="avatars[]" ref={register({ })}/>

                <input name="user_id" hidden value={localStorage.getItem("id")} type={'text'} ref={register({ required: true })} />


                <input type="submit" />
            </form>
        </>
    )
}
