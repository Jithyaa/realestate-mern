import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import './UploadImage.css';
import { Button, Group } from '@mantine/core';

const UploadImage = ({ propertyDetails, setPropertyDetails, nextStep, prevStep }) => {
  const [imageURLs, setImageURLs] = useState(propertyDetails.images || []); // Use an array to store multiple images
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  let arr=[]
  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, images: imageURLs })); // Store the array of image URLs
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dkvlosdyw",
        uploadPreset: "ektlpubi",
        multiple:true,
        maxFiles: 5, 
      },
      (err, results) => {
        console.log("🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️",results)
        if(err){
            console.log(err)
        }
        if (results.event === "success") {
            console.log("bbbbbbbbbbbbbbbbbbb");
            
            arr.push(results.info.secure_url)
            console.log(arr);
        //   const newImages = results.info.map((info) => info.secure_url);
          
          setImageURLs(arr);
        }
      }
    );
  }, []); 

  
  const removeImage = (index) => {
    const updatedImages = [...imageURLs];
    updatedImages.splice(index, 1);
    setImageURLs(updatedImages);
  };

  return (
    <div className="flexColCenter uploadWrapper">
      <div className="uploadImagesContainer">
        {imageURLs.length > 0 &&
          imageURLs.map((url, index) => (
            <div key={index} className="uploadedImage">
              <img src={url} alt={`Image ${index}`} />
              <button onClick={() => removeImage(index)}>Remove</button>
            </div>
          ))}
      </div>

      {imageURLs.length < 5 && ( 
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      )}
      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={imageURLs.length === 0}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
