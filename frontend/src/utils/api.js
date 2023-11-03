import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux"
export const api = axios.create({
  baseURL: "http://localhost:5000/api",
})

export const getAllProperties = async () => {

  try {
    const response = await api.get("/residency/allresidencies", {
      timeout: 10 * 1000,
    });

    console.log("response", response);

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;

  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;

  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }

};



export const toFav = async (id, email, token) => {
  try {
    await api.post(`/users/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
  } catch (e) {
    throw e;
  }
};


export const createResidency = async (data, token) => {
  try {
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
  } catch (error) {
    throw error
  }
}


export const bookVisit = async (dateValue, selectedTime, propertyId, email, token) => {
    try {

      const propertyDetails=await api.get(`/residency/${propertyId}`);

      if(propertyDetails){
        const {type,owner}=propertyDetails.data;
      

      await api.post(
        `/users/bookVisit/${propertyId}`,
        {
            userEmail:email,
            id: propertyId,
            date: new Date(dateValue),
            // timeSlots: timeSlots,
            selectedTime: selectedTime,
            ownerId:owner,
            type:type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    } catch (error) {
      console.error('An error occurred:', error);
      // toast.error('Something went wrong. Please try again.');
      throw error;
    }
  };
  

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/users/removeBooking/${id}`,
      {
        email,
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

export const getOwnedProperties = async (userEmail, token) => {
  try {
    const res = await api.post(
      `/users/ownedProperties`,
      {
        email: userEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data; 
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error
  }
};

export const getBookings = async(userEmail,token)=>{
  try {
    const response = await api.post(
      `/users/bookings`,
      {
        userEmail
      },
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

