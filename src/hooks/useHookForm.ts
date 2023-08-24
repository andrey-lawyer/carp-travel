import { useForm } from "react-hook-form";

import { FormData } from "@/types/formTypes";
import { useEffect } from "react";

export const useHookForms = () => {


  const {
    register,
    formState,
    handleSubmit,
    reset,
    formState: { errors },
  } =    useForm<FormData>({});

  const onSubmit = handleSubmit((data) => {
   
    if (data.phone) {
      data.phone = "+38" + data.phone;
    }
      console.log(data);
      alert("The form was successfuly sent!");
      
    
  });
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState,  reset]);

  return { register, errors, onSubmit };
};
