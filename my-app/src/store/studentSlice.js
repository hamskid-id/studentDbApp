import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import {url} from './api';
import jwtDecode from 'jwt-decode' 

export const studentsFetch = createAsyncThunk(
    "students/studentsFetch",
    async()=>{
       const response = await axios.get(" https://aqueous-earth-86397.herokuapp.com/api/students");
       return response?.data;
    }
)

export const studentsCreate= createAsyncThunk(
    "products/studentsCreate",
    async(values)=>{
        try{
            const token =  localStorage.getItem("token");
            const user = jwtDecode(token);
            const response = await axios.post(
                `${url}/students`,{
                    fullname: values.fullname,
                    email:values.email,
                    mobile:values.mobile,
                    city:values.city,
                    creator:user.name
                }
            )
            toast.success("students successfuly created");
            return response?.data;

        }catch(error){
            console.log(error)
                toast.error("sorry coudnt create a student",{
                   position:"top-left",
                })
        }
    }
)

const students_Slice = createSlice({
    name:'students',
    initialState: {
        items:[],
        fetchedStudent:[],
        status:null,
        fetchStatus:null
    },
    reducers:{
        deleteStudent(state,action){
            const studentId = action.payload._id;
            axios.delete(` https://aqueous-earth-86397.herokuapp.com/api/students/${studentId}`);
                
        },
        createError(state,action){
            toast.error("Please Log In to create",{
                position:"top-left",
             })
        }
    },
    extraReducers:{

        
        [studentsCreate.pending]:(state,action)=>{
            state.status = 'pending'
        },
        [studentsCreate.fulfilled]:(state,action)=>{
            state.items.push(action.payload) 
            state.status = 'success'
            
        },
        [studentsCreate.rejected]:(state,action)=>{
            state.status = 'rejected'
           
        },

        [studentsFetch.pending]:(state,action)=>{
            state.fetchStatus = 'pending'
        },
        [studentsFetch.fulfilled]:(state,action)=>{
            state.fetchStatus = 'success'
           state.fetchedStudent = action.payload;
           
        },
        [studentsFetch.rejected]:(state,action)=>{
            state.fetchStatus = 'rejected'
           
        },
    }
  
})



export const studentsActions = students_Slice.actions;
export default students_Slice;