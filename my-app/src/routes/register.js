import React,{useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/authSlice";
export const RegisterUser =()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state)=>state.auth);
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    });
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(registerUser(user));
        if(auth.registerStatus === "success"){
            navigate('/login');
        }
    }
    return(
        <div className="container">
            <form className="register-wrapper m-auto" onSubmit={handleSubmit}>
                <h3 className="text-center display-5">Register</h3>
                <p><input className="w-100" type="text" name="name" placeholder="Enter your name" onChange={(e)=>setUser({...user,name:e.target.value})} required/></p>
                <p><input className="w-100" type="email" name="email"  placeholder="Enter your email" onChange={(e)=>setUser({...user,email:e.target.value})} required/></p>
                <p><input  className="w-100" type="password" name="password"  placeholder="Enter your password" onChange={(e)=>setUser({...user,password:e.target.value})}/></p>
                <button className="btn btn-success w-100">
                    {
                        auth.registerStatus ==='pending'?"submitting....":"Register"
                    }
                </button>
                {
                    auth.registerStatus === "rejected"? <p className="text-danger">{auth.registerError}</p>:null
                }
            </form>
        </div>
    )
}