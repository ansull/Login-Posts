import {getDocs,collection} from "firebase/firestore"
import { auth, db } from "../../config/firebase";
import {useEffect, useState } from "react";
import { Post } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";

export interface Posts{
    id:string;
    
    title:string;
    description:string;
    username:string;
}
export const Main=()=>{
const postsRef=collection(db,"posts")//db named posts
const [postsList,setPostLists]= useState<Posts[] | null>(null)
const [user]=useAuthState(auth)
const getPosts=async ()=>{
    if(user){
    const data=await getDocs(postsRef);
    setPostLists(data.docs.map((doc)=>({...doc.data(), id:doc.id}))as Posts[]) 
    }
    
}
useEffect(()=>{
    getPosts();
},[])
    return <div>{postsList?.map((post)=><Post post={post}/>)}</div>;
}