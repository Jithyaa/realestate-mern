import axios from "axios";
import dayjs from 'dayjs'
import { toast } from "react-toastify";
import {useSelector} from "react-redux"
export const api = axios.create({
    baseURL:"http://localhost:5000/api",
})

export const getAllProperties = async()=>{
    
    try {
        const response = await api.get("/residency/allresidencies",{
            timeout :10*1000,
        });
        
        console.log("response",response);

        if(response.status=== 400 || response.status=== 500 ){
            throw response.data;
        }
        return response.data;

    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }
};

export const getProperty = async(id)=>{
    try {
        const response = await api.get(`/residency/${id}`,{
            timeout :10*1000,
        });
        if(response.status=== 400 || response.status=== 500 ){
            throw response.data;
        }
        return response.data;

    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }

};

 

export const toFav=async(id,email,token)=>{
    try {
        await api.post(`/user/toFav/${id}`,
        {
            email,
        },
        {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }
        );
    } catch (e) {
        throw e;
    }
};


export const createResidency = async (data, token) => {
    try{
      const res = await api.post(
        `/residency/create`,
        {
          data
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    }catch(error)
    {
      throw error
    }
  }


export const bookVisit = async (dateValue, selectedTime, propertyId, email, token, timeSlots) => {
    try {
      const formattedDate = dayjs(dateValue, 'YYYY-MM-DD').format('DD/MM/YYYY');
  
      await api.post(
        `/user/bookVisit/${propertyId}`,
        {
            email,
            id: propertyId,
            date: formattedDate,
            timeSlots: timeSlots,
            selectedTime: selectedTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('Something went wrong. Please try again.');
      throw error;
    }
  };
  