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


            data.images=files
            console.log(data)

            let res = await api.posts.create(data);
            console.log(res.data);
            if(res.data.id){
            //    window.location.href = '/';
            }
        })();
    }

    let [files,setFiles]=useState([])

    let date= new Date()



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
                                <input name={`tags[${index}]`}  key={index} ref={register({ required: true })}  />
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
                <input type={"file"} onChange={e=>setFiles(e.target.files)} multiple="multiple" name="images[]" ref={register({ })}/>

                <input name="user_id" hidden value={localStorage.getItem("id")} type={'text'} ref={register({ required: true })} />


                <input type="submit" />
            </form>
        </>
    )
}
