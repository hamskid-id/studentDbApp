import { useState } from "react";
import { useSelector,useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { studentsActions, studentsFetch } from "../store/studentSlice";
export const GetData =()=>{

    const dispatch = useDispatch();
    const [student,setStudent] = useState([]);
    const students = useSelector((state)=>state.students.fetchedStudent);
    const auth = useSelector((state)=>state.auth);

    
    const handleDelete=(e)=>{
      dispatch(studentsActions.deleteStudent({
            _id:e._id
        }))
      dispatch(studentsFetch(null));
   }

  
   const handleSubmit=(e)=>{
        e.preventDefault();
        const studentQuery = students.filter(student=>student.fullname.toLowerCase().includes(e.target.search.value.toLowerCase()));
        setStudent(studentQuery);
   }
    return(
        <div className="viewAll-container bg bg-primary">
            <div className="viewAll-wrapper bg bg-white rounded">
                <nav>
                    <div className="rod-flex flex-column">
                        <div className=" d-flex flex-row">
                            <div>
                                <Link to="/createData" className="btn btn-secondary btn-sm">Create New</Link>
                            </div>
                            
                                <p className="display-5">Student List</p>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <input className="rounded" name="search" type="text" placeholder="Enter your student name as a query"/>
                                <button className="btn btn-success btn-md ms-0">search</button>
                            </form>
                        </div>
                        
                    </div>
                </nav>
                {
                    students.length>0?
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">S/N</th>
                                    <th scope="col">fullName</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {
                                            
                                            student.length<1? students.map((student, index)=>{
                                                const {_id,fullname,email,mobile,city,creator} = student;
                                                if(auth.name === creator){
                                                    return(
                                                
                                                        <tr key={index}>
                                                            <th scope="row">{index}</th>
                                                            <td>{fullname}</td>
                                                            <td>{email}</td>
                                                            <td>{mobile}</td>
                                                            <td>{city}</td>
                                                            <td onClick={()=>handleDelete({_id})}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                                </svg>
                                                            </td>
                                                        </tr>
                                                )

                                                }
                                                
                                            }):
                                            student.map((student, index)=>{
                                                const {_id,fullname,email,mobile,city,creator} = student;
                                                if(auth.name === creator){
                                                    return(
                                                
                                                        <tr key={index}>
                                                            <th scope="row">{index}</th>
                                                            <td>{fullname}</td>
                                                            <td>{email}</td>
                                                            <td>{mobile}</td>
                                                            <td>{city}</td>
                                                            <td onClick={()=>handleDelete({_id})}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                                </svg>
                                                            </td>
                                                        </tr>
                                                     )
                                                }
                                                
                                            })
                                           
                                        }
                                </tbody>
                            </table>

                        </div>:<p className="text-center">You currently have no data to manage. Login to start creating your own dababase</p>
                }
                
                
                
            </div>
           
        </div>
    )
}