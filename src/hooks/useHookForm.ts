import { useForm } from "react-hook-form";

import { FormData } from "@/types/formTypes";

export const useHookForms = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } =    useForm<FormData>({});

  const onSubmit = handleSubmit((data) => {
    if (!data) console.log("error");
    else if (data.phone) {
      data.phone = "+38" + data.phone;
    }
      console.log(data);
    
  });
  return { register, errors, onSubmit };
};
