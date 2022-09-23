import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import  axios  from 'axios';
import jwtDecode from 'jwt-decode' 
import { url } from './api';


export const registerUser = createAsyncThunk(
    'auth/registerUser', 
    async (values, {rejectWithValue}) =>{
    try{
       const token = await axios.post(`${url}/register`,{
            name: values.name,
            email:values.email,
            password:values.password
        });
        localStorage.setItem('token', token.data)
        return token.data

    } catch(err){
        console.log(err.response.data)
        return rejectWithValue(err.response.data)
    }
    }
)
export const LogInUser = createAsyncThunk(
    'auth/LogInUser', 
    async (values, {rejectWithValue}) =>{
    try{
       const token = await axios.post(`${url}/login`,{
            email:values.email,
            password:values.password
        });

        localStorage.setItem('token', token.data)
        return token.data
    } catch(err){
        console.log(err.response.data)
        return rejectWithValue(err.response.data)

    }

    }
)

const auth_Slice = createSlice({
    name:"auth",
    initialState: {
       token : localStorage.getItem("token"),
        name:'',
        email:'',
        _id:'',
        registerStatus:'',
        registerError:'',
       LoginStatus:'',
       LoginError:'',
       userLoaded:false,
    },
    reducers:{
        loadUser(state,action){
            const token = state.token
            if(token){
                const user = jwtDecode(token)
                return {
                    ...state,
                    token,
                    name:user.name,
                    email:user.email,
                    _id:user._id,
                    userLoaded:true
                }
            }
        },

        LogOutUser(state, action){
            localStorage.removeItem("token")
            return {
                    ...state,
                    token : "",
                    name:'',
                    email:'',
                    _id:'',
                    registerStatus:'',
                    registerError:'',
                    LoginStatus:'',
                    LoginError:'',
                    userLoaded:false
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state, action)=>{
            return {...state,registerStatus:'pending'}

        });
        builder.addCase(registerUser.fulfilled,(state, action)=>{
            if(action.payload){

                const user = jwtDecode(action.payload)
                return{
                    ...state,
                    token:action.payload,
                    name:user.name,
                    email:user.email,
                    _id:user._id,
                    registerStatus:'success'
                }
            }else return state

        })
        builder.addCase(registerUser.rejected,(state, action)=>{
            return{
                ...state,
                registerStatus:'rejected',
                registerError:action.payload

            }
        })

        builder.addCase(LogInUser.pending,(state, action)=>{
            return {...state,LoginStatus:'pending'}

        });
        builder.addCase(LogInUser.fulfilled,(state, action)=>{

            if(action.payload){
                const user = jwtDecode(action.payload)
                return{
                    ...state,
                    token:action.payload,
                    email:user.email,
                    _id:user._id,
                    LoginStatus:'success'
                }
            }else return state

        })
        builder.addCase(LogInUser.rejected,(state, action)=>{
            return{
                ...state,
               LoginStatus:'rejected',
               LoginError:action.payload

            }
        })
    }
})

export const {loadUser, LogOutUser} = auth_Slice.actions
export default auth_Slice;