import './App.css';
import { LogInPage } from './routes/login';
import { RegisterUser } from './routes/register';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { AdminPage } from './routes/admin';
import { CreateData } from './routes/create';
import { GetData } from './routes/getdata';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import  store  from './store';
function App() {
  return (
    <Provider store={store} >
      <Router>
        <Routes>
        <Route exact path='/' element={ <AdminPage/> }/>
          <Route exact path='/login' element={ <LogInPage/> }/>
          <Route exact path='/register' element={ <RegisterUser/> }/>
          <Route exact path='/createdata' element={ <CreateData/> }/>
          <Route exact path='/getdata' element={ <GetData/> }/>
        </Routes>
      </Router>
      <ToastContainer/>
    </Provider>
  );
}

export default App;
