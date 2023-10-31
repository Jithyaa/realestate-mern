
import { Route, Routes } from "react-router-dom";
import HomeScreen from "../adminScreens/HomeScreen.jsx";
import LoginScreen from "../adminScreens/LoginScreen.jsx";
import AdPrivateRoute from '../components/AdPrivateRoute.jsx';
import PropertiesList from "../adminScreens/PropertiesList.jsx";
import Dashboard from "../adminScreens/Dashboard.jsx";

const AdminRoutes = () => {
  return (
    <>
     <Routes>
     
     <Route  path='/adminlogin' element={<LoginScreen/>}/>
     <Route path="/properties-list" element={<PropertiesList/>}/>
     <Route path="/dashboard" element={<Dashboard/>}/>
     <Route path='' element={<AdPrivateRoute/>}>
     <Route  path='/admin' element={<HomeScreen/>}/>
      </Route>

     </Routes>
      
    </>
  )
}

export default AdminRoutes;
