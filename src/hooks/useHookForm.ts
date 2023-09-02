import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { FormData, IForm } from "@/types/formTypes";

import { randomPromise } from "@/data/randomPromise";

export const STORAGE_KEY_CAREER = "local_key_career";
export const STORAGE_KEY_CONTACTS = "local_key_contacts";

export const useHookForms = (isShown: boolean) => {
  const [form, setForm] = useState<IForm>({});

  const [sentSuccessful, setSentSuccessful] = useState(false);

  const {
    register,
    formState,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({});

  const onSubmit = handleSubmit((data) => {
    if (data.phone) {
      data.phone = "+38" + data.phone;
    }

    randomPromise()
      .then((result) => {
        if (typeof result === "string") {
          setSentSuccessful(true);
          toast.success(result);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      if (!sentSuccessful) return;
      setSentSuccessful(false);
      reset();
      setForm({});
      if (isShown) {
        localStorage.removeItem(STORAGE_KEY_CAREER);
      } else {
        localStorage.removeItem(STORAGE_KEY_CONTACTS);
      }
    }
  }, [formState, isShown, reset, sentSuccessful]);

  return { register, errors, onSubmit, form, setForm };
};
