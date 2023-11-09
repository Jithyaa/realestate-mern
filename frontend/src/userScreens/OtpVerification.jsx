import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyMutation } from "../slices/usersApiSlices";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import '../UserCss/OtpVerification.css';

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const tempInfo = localStorage.getItem("tempInfo");
  const userEmail =  JSON.parse(tempInfo) ; // Check if tempInfo is null
  const email = userEmail ? userEmail.email : ""; // Access email property if userEmail is not null

  const [verify, { isLoading }] = useVerifyMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verify({ email, otp });
      console.log(res);

      if (res.error) {
        toast.error("Wrong OTP");
      } else {
        toast.success("Account created");
        navigate('/login')
        
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="otpverification-container">
        <div className="form-container5">
          <form className="form1" onSubmit={submitHandler}>
            <h1>OTP Verification</h1>

            <div className="div1">
              <label htmlFor="lastName"></label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div>
              {isLoading && <Loader />}
              <button  className="btn" type="submit">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
