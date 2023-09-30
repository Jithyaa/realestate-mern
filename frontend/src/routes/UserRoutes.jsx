import { Route, Routes } from "react-router-dom";
import HomeScreens from "../userScreens/HomeScreens.jsx";
import LoginScreen from '../userScreens/LoginScreen.jsx';
import RegisterScreen from '../userScreens/RegisterScreen.jsx';
import ProfileScreen from '../userScreens/ProfileScreen.jsx';
import PrivateRoute from '../components/PrivateRoute.jsx';
import ForgotPassword from '../userScreens/ForgotPassword.jsx'
import ForgotOtp from "../userScreens/ForgotOtp.jsx";
import ResetPassword from "../userScreens/ResetPassword.jsx";
import OtpVerification from '../userScreens/OtpVerification.jsx';
import Properties from '../userScreens/Properties.jsx';
import { QueryClient, QueryClientProvider } from "react-query";
import Property from "../userScreens/Property.jsx";
import Website from "../pages/Website.jsx";
import Residencies from "../userScreens/Residencies.jsx";
import { useState } from "react";


const UserRoutes = () => {
    const queryClient = new QueryClient();
    const [userDetails, setUserDetails] = useState({
      favourites: [],
      bookings: [],
      token: null,
    });
  
    return (
    //   <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
        <QueryClientProvider client={queryClient}>
          <>
            <Routes>
                    {/* <Route path="/" element={<Website/>}/> */}
                    <Route path='/login' element={<LoginScreen />} />
                    <Route path='/register' element={<RegisterScreen />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/forgot-otp" element={<ForgotOtp />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/otp-verification" element={<OtpVerification />} />
                    {/* <Route path="/residencies" element={<Residencies/>}/> */}
                    <Route path="/" element={<Website/>}/>
                    <Route path="/properties" >
                        <Route index element={<Properties />} />
                        <Route path=":propertyId" element={<Property/>} />
                    </Route>
                    {/* private routes */}
                    <Route path='' element={<PrivateRoute />}>
                        <Route path='/profile' element={<ProfileScreen />} />
                        <Route index={true} path='/' element={<HomeScreens />} />
                    </Route>
                </Routes>
            </>
        </QueryClientProvider>
        //  </UserDetailContext.Provider>

    )
}

export default UserRoutes;

