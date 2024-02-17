import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc,collection} from "firebase/firestore";
import{auth, db} from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from 'react-router-dom'
export interface CreateFormData{
    title:string
    description:string
}

export const CreateForm= ()=>{
    const schema=yup.object().shape({
        title: yup.string().required("You must write a title"),
        description: yup.string().required("You must write a description")
        
    });
    const {register,handleSubmit,formState:{errors}}=useForm<CreateFormData>({
        resolver:yupResolver(schema),
    });
    const navigate=useNavigate();
    const postsRef=collection(db,"posts")//db named posts
    const [user]=useAuthState(auth);
    const onCreatePost=async (data:CreateFormData)=>{
    
       await addDoc(postsRef,{
        ...data,
        username:user?.displayName,
        id:user?.uid
       })
       navigate('/');
    }
    return <form style={{}} onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Title" {...register("title")}/>
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <input placeholder="Description" {...register("description")}/>
        <p style={{color:"red"}}>{errors.description?.message}</p>
        <input type="submit"/>
    </form>
}


