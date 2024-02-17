import { addDoc,getDocs, collection ,query, where,deleteDoc, doc} from "firebase/firestore";
import{Posts} from "./main"
import { auth, db } from "../../config/firebase";


import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props{
    post:Posts;
}
interface Like{
    userId:string;
}
export const Post=(props:Props)=>{
    const {post}=props
    const [like,setLikes]=useState<Like[]|null>(null);
    const likesRef=collection(db,"likes")//db named posts
    const likesDoc=query(likesRef,where("postId","==",post.id))
   
    const [user]=useAuthState(auth)
    const getLikes=async()=>{
        try{
            const data=await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=>({userId:doc.data().userId})))
        }
        catch(err){
            console.log(err);
        }
        
    }
    const hasUserLiked=like?.find((like)=>
        like.userId===user?.uid
    )

    
    useEffect(()=>{
        getLikes();
    },[])
    
    const addLike=async ()=>{
        try{
            await addDoc(likesRef,{
                userId:user?.uid,
                postId:post.id,
               });
               if(user)
               {setLikes((prev)=>prev?[...prev,{userId:user.uid}]:[{userId:user.uid}])}
        }
        catch(err){
            console.log(err);
        }
       
       
    }
    const removeLike=async ()=>{
        const deleteQuery=query(likesRef,where("postId","==",post.id),where("userId","==",user?.uid));
        const docID=await getDocs(deleteQuery);
        const deleteLike=doc(db,"likes",docID.docs[0].id);
        await deleteDoc(deleteLike);
        if(user)
       {setLikes((prev)=>prev && prev.filter((like)=>like.userId!=user.uid))}
        
     }
    return <div>
        <div className="title">
            <h1>@{post.title}</h1>
        </div>
        <div className="body">
            <p>{post.description}</p>
        </div>
        <div className="footer">
            <p>{post.username}</p>
            <p>{post.id}</p>
            {hasUserLiked?<button onClick={removeLike}>&#10084;&#65039;</button> : <button onClick={addLike}>&#x2661;</button>}
            {like?<p>Likes: {like.length}</p>:<></>}
        </div>
        <br></br>
    </div>
}