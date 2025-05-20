import React from 'react';
import toast, { Toaster } from "react-hot-toast";
import Colors from '../assets/Style';



function ToasterContainer() {
  return (
    <Toaster
      position={'top-center'}
      toastOptions={{
        duration: 5000, // 5 seconds
      }}
    />
  )
};

export const SuccessToaster = (message) => {
  toast.success(message, {
    style: {
      backgroundColor: Colors.darkGray1,
      color: "white",
    },
  });
};

export const ErrorToaster = (message) => {
  toast.error(message, {
    style: {
      backgroundColor: Colors.darkGray1,
      color: Colors.white,
    },
  });
};

export default ToasterContainer
