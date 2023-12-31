"use client";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { patternEmail, patternName, patternPhone } from "@/data/patterns";

import {  STORAGE_KEY_CAREER, STORAGE_KEY_CONTACTS, useHookForms } from "@/hooks/useHookForm";

import { ICareer } from "@/types/propsType";
import { IForm } from "@/types/formTypes";

import s from "@/sections/Career/Career.module.css";




export function FormCareer({ type = "career" }: ICareer) {
  const isShown = type === "career" ? true : false;

  const { register, errors, onSubmit, form, setForm } = useHookForms(isShown);

  useEffect(() => {
    
    let infoStorage = isShown
    ? localStorage.getItem(STORAGE_KEY_CAREER)
    : localStorage.getItem(STORAGE_KEY_CONTACTS);

    let infoStorageParse: IForm;
    setForm((prevState) => {
      if (infoStorage) {
        try {
          infoStorageParse = JSON.parse(infoStorage) ?? {};
          return infoStorageParse;
        } catch (error) {
          return prevState;
        }
      }
      return prevState;
    });
  }, [isShown, setForm]);

  return (
    <>
      <form
        className="text-text-white font-extralight relative z-10"
        onSubmit={onSubmit}
      >
        <div
          className={`tab:grid  ${
            isShown
              ? "tab:grid-cols-[1fr_1fr]"
              : "tab:grid-cols-[221px_1fr] desk:block"
          }    tab:gap-5 desk:gap-6 desk:w-[605px] `}
        >
          <div
            className={`${
              isShown
                ? ""
                : "desk:grid desk:grid-cols-[1fr_1fr] desk:gap-5 desk:mb-[42px] "
            }`}
          >
            <div className="relative ">
              <label
                htmlFor="name"
                className={`${
                  errors.fullName ? "text-text-error" : "text-text-white"
                } tracking-[2.4px] block text-xs_slogan mb-1 desk:mb-[6px]`}
              >
                Full name
              </label>
              <input
                value={form.name ?? ""}
                id="name"
                type="text"
                className={`${
                  errors.fullName ? "text-text-error" : "text-text-white"
                } bg-bg-label w-[100%] pl-2  text-xs_input desk:text-lg_input_desk placeholder-white placeholder-opacity-[0.2] `}
                placeholder="John Smith"
                {...register("fullName", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setForm((prevState) => {
                      const state = { ...prevState, name: e.target.value };
                      if (typeof window !== 'undefined'){
                      const key = isShown
                        ? STORAGE_KEY_CAREER
                        : STORAGE_KEY_CONTACTS;
                      localStorage.setItem(key, JSON.stringify(state));
                      }

                      return state;
                    });
                  },
                  required: "Name is required",
                  pattern: patternName,
                })}
                aria-invalid={errors.fullName ? "true" : "false"}
              />
              {errors.fullName && (
                <p
                  className={`${s.error_career} absolute  right-0 pl-[22px]  text-text-error text-xs_slogan tracking-[2.4px]`}
                >
                  {errors.fullName.message
                    ? errors.fullName.message
                    : "Incorrect name"}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className={`${
                  errors.email ? "text-text-error" : "text-text-white"
                } tracking-[2.4px] block text-xs_slogan mb-1 ${
                  isShown
                    ? "mt-4 desk:mt-[26px]"
                    : "mt-[25px] tab:mt-[28px] desk:mt-0"
                }  desk:mb-[6px]`}
              >
                E-mail
              </label>
              <input
                value={form.email ?? ""}
                id="email"
                type="email"
                className={`${
                  errors.email ? "text-text-error" : "text-text-white"
                }  bg-bg-label  w-[100%] pl-2  text-xs_input  desk:text-lg_input_desk placeholder-white placeholder-opacity-[0.2] `}
                placeholder="johnsmith@email.com"
                {...register("email", {
                  required: "Phone is required",
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    {
                      setForm((prevState) => {
                        const state = { ...prevState, email: e.target.value };
                        if (typeof window !== 'undefined')
                        {const key = isShown
                          ? STORAGE_KEY_CAREER
                          : STORAGE_KEY_CONTACTS;
                        localStorage.setItem(key, JSON.stringify(state));}

                        return state;
                      });
                    }
                  },
                  pattern: patternEmail,
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p
                  className={`${s.error_career} absolute  right-0 pl-[22px]  text-text-error text-xs_slogan tracking-[2.4px]`}
                >
                  {errors.email.message
                    ? errors.email.message
                    : "Invalid email"}
                </p>
              )}
            </div>
            {isShown && (
              <>
                <div className="relative">
                  <label
                    htmlFor="position"
                    className={`${
                      errors.position ? "text-text-error" : "text-text-white"
                    } tracking-[2.4px] block text-xs_slogan mb-1 mt-4 desk:mt-[26px] desk:mb-[6px]`}
                  >
                    Position
                  </label>
                  <input
                    value={form.position ?? ""}
                    type="text"
                    id="position"
                    className={`text-text-white bg-bg-label  w-[100%] pl-2 text-xs_input  desk:text-lg_input_desk placeholder-white placeholder-opacity-[0.2] `}
                    placeholder="Movie maker"
                    {...register("position", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        {
                          setForm((prevState) => {
                            const state = {
                              ...prevState,
                              position: e.target.value,
                            };
                            if (typeof window !== 'undefined')
                           {localStorage.setItem(
                              STORAGE_KEY_CAREER,
                              JSON.stringify(state)
                            );
                           }
                            return state;
                          });
                        }
                      },
                      required: "Position is required",
                    })}
                    aria-invalid={errors.position ? "true" : "false"}
                  />
                  {errors.position && (
                    <p
                      className={`${s.error_career} absolute  right-0 pl-[22px]  text-text-error text-xs_slogan tracking-[2.4px]`}
                    >
                      {errors.position.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label
                    htmlFor="phone"
                    className={`${
                      errors.phone ? "text-text-error" : "text-text-white"
                    } tracking-[2.4px] w-[100%] block text-xs_slogan mb-1 mt-4 desk:mt-[26px] desk:mb-[6px]`}
                  >
                    Phone
                  </label>
                  <div className="flex bg-bg-label pl-2 text-xs_input  desk:text-lg_input_desk">
                    <span className="block w-[40px] desk:w-[58px]">+ 38</span>
                    <input
                      value={form.phone ?? ""}
                      type="tel"
                      id="phone"
                      className={`${
                        errors.phone ? "text-text-error" : "text-text-white"
                      }  inline-block  w-[100%] bg-transparent placeholder-white placeholder-opacity-[0.2] `}
                      placeholder="(097) 12 34 567"
                      {...register("phone", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          {
                            setForm((prevState) => {
                              const state = {
                                ...prevState,
                                phone: e.target.value,
                              };
                              if (typeof window !== 'undefined')
                             { localStorage.setItem(
                                STORAGE_KEY_CAREER,
                                JSON.stringify(state)
                              );
                             }

                              return state;
                            });
                          }
                        },
                        required: "Phone is required",
                        pattern: patternPhone,
                      })}
                      aria-invalid={errors.phone ? "true" : "false"}
                    />
                  </div>
                  {errors.phone && (
                    <p
                      className={`${s.error_career} absolute  right-0 pl-[22px]  text-text-error text-xs_slogan tracking-[2.4px]`}
                    >
                      {errors.phone.message
                        ? errors.phone.message
                        : "Incorrect phone"}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          <div>
            <div className="relative">
              <label
                htmlFor="Message"
                className={`${
                  errors.message ? "text-text-error" : "text-text-white"
                } tracking-[2.4px] block text-xs_slogan mb-1 ${
                  isShown ? "mt-4" : "mt-6"
                } desk:mb-[6px] tab:mt-0`}
              >
                Message
              </label>
              <textarea
                value={form.message ?? ""}
                id="Message"
                className={`${
                  errors.message ? "text-text-error" : "text-text-white"
                } ${
                  isShown ? "desk:h-[268px]" : "desk:h-[174px]"
                } block w-[100%] h-[196px] tab:h-[232px]  bg-bg-label text-xs_input  desk:text-lg_input_desk resize-none `}
                {...register("message", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setForm((prevState) => {
                      const state = { ...prevState, message: e.target.value };
                      if (typeof window !== 'undefined'){
                      const key = isShown
                        ? STORAGE_KEY_CAREER
                        : STORAGE_KEY_CONTACTS;
                      localStorage.setItem(key, JSON.stringify(state));
                      }

                      return state;
                    });
                  },
                  maxLength: 290,
                })}
              ></textarea>
              {errors.message && (
                <p
                  className={`${s.error_career} absolute  right-0 tab:left-0 tab:right-auto pl-[22px]  text-text-error text-xs_slogan tracking-[2.4px]`}
                >
                  Too long message
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="tab:flex tab:justify-between">
          {isShown && (
            <div className="relative flex gap-2 tab:w-[222px] desk:w-[291px]">
              <input
                type="checkbox"
                id="check-user"
                {...register("flag", { required: "Сonfirmation required" })}
                className={`${s.checkbox_career} `}
                aria-invalid={errors.flag ? "true" : "false"}
              />
              <label
                className="block mt-[18px] tab:mt-[16px] desk:mt-[38px] ml-[8px] text-xs_checkbox font-extralight desk:w-[100%]"
                htmlFor="check-user"
              >
                I confirm my consent to the processing of personal data.
              </label>
              {errors.flag && (
                <p
                  className={`${s.error_career} absolute  left-0 tab:right-0 tab:left-auto top-[57px]  tab:top-[55px] desk:top-[80px] pl-[22px]  text-text-error text-xs_slogan tracking-[2.4px]`}
                >
                  {errors.flag.message}
                </p>
              )}
            </div>
          )}
          <button
            className={`text-xxl_mob_send font-medium block ml-auto mt-4 ${
              isShown ? "tab:mt-[9px]" : "desk:mt-6"
            } desk:text-xxl_desk_send`}
            type="submit"
          >
            SEND
          </button>
        </div>
      </form>
      <Toaster />
    </>
  );
}
