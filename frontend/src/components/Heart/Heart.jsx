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
  const userInfo = useSelector((state) => state.auth);
  const { mutate } = useMutation({
    mutationFn: () =>
      toFav(id, userInfo.email, userInfo.token),
    onSuccess: () => {
      const updatedFavourites = updateFavourites(id, userInfo.favourites);
      dispatch(
        setCredentials({
          ...userInfo,
          favourites: updatedFavourites,
        })
      );
    },
  });

  const handleLike = () => {
      mutate();
      setHeartColor((prev) => (prev === '#fa3e5f' ? 'white' : '#fa3e5f'));
    
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
