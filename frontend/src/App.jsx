import { useState } from 'react'
import {Outlet,useLocation} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from './components/AdminHeader';



const App = () => {
  const location=useLocation();
  const [modified,setModified] = useState(false);
  const isAdminPage = location.pathname.startsWith('/admin')
  return (
    <>
      {isAdminPage ? <AdminHeader/> : <Header setModified={setModified}/>}
      <ToastContainer/>
      {/* <Container className="my-2"> */}
      <Outlet modified={modified}/>
      {/* </Container> */}
     
    </>
  );
}

export default App;