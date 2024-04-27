import React from "react";
import { imageDB } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import Cookies from "js-cookie";

const useUploadImage = (file) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const uploadImage = async () => {
    
    const user = Cookies.get("user");
    const imageRef = ref(imageDB, `images/${user}`);

    try {
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadImage, isLoading, error };
};

export default useUploadImage;