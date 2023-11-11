import { useState } from 'react'
import {Outlet,useLocation} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from './components/AdminHeader';
import Footer from '../src/components/Footer';



const App = () => {
  const location=useLocation();
  const [modified,setModified] = useState(false);
  const isAdminPage = location.pathname.startsWith('/admin')
  const isLoginPage = location.pathname.startsWith('/login')
  const isRegisterPage = location.pathname.startsWith('/register')
 console.log("😤😤",(!isAdminPage&&!isLoginPage&&!isRegisterPage))
  return (
    <>
      {isAdminPage ? <AdminHeader/> : <Header setModified={setModified}/>}

      <ToastContainer/>
      {/* <Container className="my-2"> */}
      <Outlet modified={modified}/>
      {(!isAdminPage && !isLoginPage &&!isRegisterPage) && <Footer/>}
  
      {/* </Container> */}
     
    </>
  );
}

export default App;