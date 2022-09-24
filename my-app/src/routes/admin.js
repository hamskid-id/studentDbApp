import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LogOutUser } from "../store/authSlice";

export const AdminPage =()=>{

    const dispatch = useDispatch();
    const auth = useSelector((state)=>state.auth);
    const handleLogOut=()=>{
        dispatch(LogOutUser(null));
    }

    return(
        <div className="container-fluid">
            <nav className="w-100 bg bg-success rounded">
                <div className="d-flex navlink-wrapper">
                    {
                       auth._id?
                       <div className="d-flex flex-row w-100 justify-content-between nav-inner1">
                            <div> <p className=" welc-user nav-inner1-fs-5 text-white">Welcome {auth.name}</p></div>
                            <div>
                                <button className="btn btn-danger btn-sm logOut-btn" onClick={handleLogOut}>Log Out</button>
                            </div>
                       </div>
                       :
                        <div>
                            <Link to="/login" className="btn btn-primary btn-sm" >Log In</Link>
                            <Link to="/register" className="btn btn-warning btn-sm mx-2">Sign Up</Link>
                        </div>
                    }
                    
                </div>
            </nav>
            <div className="row">
                <div className=" col-md-7 col-sm-12 ">
                            <h1 className="text-center display-3 fw-bold mt-5">Manage Your Student Data Base  With Ease</h1>
                            <p className="text-center sub-text m-auto nav-inner1-fs-5">lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
                            <div className="m-auto data-wrapper my-3 text-center">
                            <Link to="/createData" className="btn btn-success btn-lg data-btn me-1 mb-2">Start creating for free</Link>
                            <Link to="/getData" className="btn btn-success btn-lg data-btn mb-2">Get your data</Link>
                            </div>
                </div>
                <div className=" col-md-5 col-sm-12">
                    <img className="w-100 side-img" src="https://static.vecteezy.com/system/resources/thumbnails/002/223/428/small_2x/banner-design-of-folder-storage-technology-for-cloud-databases-and-social-media-activities-illustration-concept-be-used-for-landing-page-template-ui-web-mobile-app-poster-banner-website-free-vector.jpg" alt="object not found"/>
                </div>
                
            </div>
        </div>
    )
}