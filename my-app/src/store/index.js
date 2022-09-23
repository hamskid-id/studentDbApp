import { configureStore } from "@reduxjs/toolkit";
import auth_Slice,{loadUser} from "./authSlice";
import students_Slice, { studentsFetch } from "./studentSlice";


const store = configureStore({
    reducer:{
        auth: auth_Slice.reducer,
        students: students_Slice.reducer,
    },
})

store.dispatch(studentsFetch(null));
store.dispatch(loadUser(null));
export default store;