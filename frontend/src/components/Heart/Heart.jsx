import React, { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { toFav } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavourites } from '../../utils/common';
import { setCredentials } from '../../slices/authSlice';

const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState('white');

  const dispatch = useDispatch();

  // Access user info from Redux state
  const userInfo = useSelector((state) => state.auth.userInfo);

  const { mutate } = useMutation({
    mutationFn: () =>
      toFav(id, userInfo.email, userInfo.token), // Use userInfo to access email and token
    onSuccess: () => {
      // Dispatch an action to update favorites in the state
      const updatedFavourites = updateFavourites(id, userInfo.favourites);
      // Use setCredentials action to update userInfo in Redux state
      dispatch(
        setCredentials({
          ...userInfo,
          favourites: updatedFavourites,
        })
      );
    },
  });

  const handleLike = () => {
    if (validateLogin) {
      mutate();
      setHeartColor((prev) => (prev === '#fa3e5f' ? 'white' : '#fa3e5f'));
    }
  };

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
