import { useState } from "react";
import { Link } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";
import { studentsActions, studentsCreate, studentsFetch } from "../store/studentSlice";
export const CreateData =()=>{

    const dispatch = useDispatch();
    const auth = useSelector((state)=>state.auth);
    const [fullname, setFullName]= useState("");
    const [mobile, setMobile]= useState("");
    const [city, setCity]= useState("");
    const [email, setEmail]= useState("");
    const [creator, setCreator]= useState("");
   
    const  handleSubmit =(e)=>{
        e.preventDefault();
        if(auth._id){
            setCreator(auth.name);
            dispatch(studentsCreate({
                fullname,
                mobile,
                city,
                email,
                creator
            }));
            setFullName('');
            setMobile();
            setCity("");
            setEmail("");
            setCreator("");
            dispatch(studentsFetch(null));
        }else{
            dispatch(studentsActions.createError());
        }
       
    }
    return(
        <div className="container create-container bg bg-primary">
            <form onSubmit={handleSubmit}>
                <div className='border create-wrapper display-4 bg bg-white rounded  p-2'>
                    <nav className="d-flex flex-row justify-content-between">
                        <div>
                            <p className="display-5">Insert Student</p>
                        </div>
                        <div>
                            <Link to="/" className="btn btn-success btn-sm">Back to home</Link>
                        </div>
                        
                       
                    </nav>
                   
                    <div className="d-flex flex-column">
                        <label className="mb-2" htmlFor="fullname">Full Name</label>
                        <input type="text" name="fullname" placeholder="Full Name" className="" onChange={(e)=>setFullName(e.target.value)} required/>
                        <label  className="mb-2" htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Email"  onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <div className="row">
                            <div className="col col-md-6">
                                <div className="d-flex flex-column">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input type="text" name="mobile" placeholder="Mobile"  onChange={(e)=>setMobile(e.target.value)} required/>
                                </div>
                            </div>
                            <div  className="col col-md-6">
                                <div className="d-flex flex-column">
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" placeholder="City"  onChange={(e)=>setCity(e.target.value)} required/>
                                </div>
                            </div>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-sm me-1">
                        {
                            auth.status ==='pending'?"submitting....":"submit"
                        }
                        </button>
                        <Link to="/getData" className="btn btn-secondary btn-sm ms-1">View All</Link>
                    </div>
                </div>
                
            </form>
        </div>
    )
}