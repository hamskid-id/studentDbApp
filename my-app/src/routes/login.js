import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { LogInUser } from '../store/authSlice';

export const LogInPage =()=>{
    const dispatch = useDispatch();
    const auth = useSelector((state)=>state.auth);
    const [user, setUser] = useState({
        email:"",
        password:""
    });
    const handleSubmit =(e)=>{
        e.preventDefault();
        dispatch(LogInUser(user));
        if(auth._id){
           window.location.replace("/");
        }
    }
    return(
        <div className="container">
            <form className="login-wrapper m-auto" onSubmit={handleSubmit}>
                <h3 className='text-center display-5'>Login</h3>
                <p><input className="w-100" type="email" name="email"  placeholder="Enter your email" onChange={(e)=>setUser({...user, email:e.target.value})} required/></p>
                <p><input  className="w-100" type="password" name="password"  placeholder="Enter your password" onChange={(e)=>setUser({...user,password:e.target.value})} required/></p>
                {
                    auth.LoginStatus === "rejected"? <p className="text-danger">{auth.LoginError}</p>:null
                }
                <button className="btn btn-success w-100">
                    {
                        auth.LoginStatus ==='pending'?"submitting....":"Log In"
                    }
                </button>
                <div className="mt-2">
                    <label htmlFor="register">Dont have an account?</label>
                    <Link to="/register" className="btn btn-primary btn btn-sm ">register</Link>
                </div> 
            </form>
        </div>
    )
}