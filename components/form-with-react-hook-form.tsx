"use client";
import React, { useState } from "react";
import {useForm} from "react-hook-form"
import { FieldValues } from "react-hook-form";

export default function FormWithReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
    getValues,
  }= useForm();

  const onSubmit = async(data: FieldValues)=>{
    await new Promise((resolve)=>setTimeout(resolve,1000))
reset();
  }



  return (
    <div>
      <form
      onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2  min-h-screen"
      >
        <input
        {
          ...register("email",{
            required:"Email is required"
          })
        }
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded text-black"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        ) }
        <input
        {
          ...register("password",
          {required:"Password is required",
            minLength: {value:4,
              message: "Password must be at least 10 characters",
            }
          })
        }
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded text-black"
        />
          {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        ) }
        <input
        {
          ...register("comfrimPassword",
          {required:"Confrim Password is required",
          validate: (value)=> 
            value === getValues("password") || "passwords didn't match",
          })
        }
          type="password"
          placeholder="Confrim password"
          className="px-4 py-2 rounded text-black"
        />
          {errors.comfrimPassword && (
          <p className="text-red-500">{`${errors.comfrimPassword.message}`}</p>
        ) }
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
