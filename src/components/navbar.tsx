import { Link } from "react-router-dom";
import {auth} from '../config/firebase';
import {useAuthState} from'react-firebase-hooks/auth';
import {signOut} from 'firebase/auth'
export const Navbar=()=>{
    const [user]=useAuthState(auth);
    const signUserOut=(()=>{
        signOut(auth);
    })
    return <div className="nav">
        <div className="userr">
            <Link to={'/'}>Home </Link>
        {!user ?<Link to={'/login'}>Login </Link>
        :
        <Link to={'/create-post'}>Create Post </Link>}
        </div>
        
        <div className="bar">
            <p >{user?.displayName}</p>
            <img style={{height:"30px",marginRight:"4px"}} src={user?.photoURL || ""} />
            {user ?<button onClick={signUserOut}>Log Out</button>:<></>}
        </div>
    </div>
}