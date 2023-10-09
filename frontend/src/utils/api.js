import axios from "axios";
import dayjs from 'dayjs'
import { toast } from "react-toastify";

export const api = axios.create({
    baseURL:"http://localhost:5000/api",
})

export const getAllProperties = async()=>{
    try {
        const response = await api.get("/residency/allresidencies",{
            timeout :10*1000,
        });
        console.log("jjjh",response)
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

export const createResidency=async(data,token)=>{
    try {
        const res=await api.post(
            `/residency/create`,
            {
                data
            },
            {
                headers:{
                    Authorizatin:`Bearer ${token}`,
                },
            }
        )
    } catch (error) {
        throw error;
    }
}

export const bookVisit = async (date, propertyId, email, token,timeSlots) => {
    try {
      await api.post(
        `/user/bookVisit/${propertyId}`,
        {
          email,
          id: propertyId,
          date: dayjs(date).format("DD/MM/YYYY"),
          timeSlots:timeSlots
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong, Please try again");
      throw error;
    }
  };