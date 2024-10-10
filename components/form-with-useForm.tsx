"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FieldValues } from "react-hook-form";

let renderCount = 0;

interface FormValues {
  firstName: string;
  lastName: string;
}

function sleep(ms: number){
  return new Promise(resolve => setTimeout(resolve, ms));
}


export default function FormWithUseForm() {
  //   const [value, setValue] = React.useState("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    getValues,
    trigger,
    formState: {
      touchedFields,
      errors,
      isValid,
      isSubmitSuccessful,
      isDirty,
      dirtyFields,
    },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  renderCount++;

  // console.log("isDirty", isDirty);

  // console.log("Errors: ", errors);
  //   console.log(watch());

  //   const firstName = watch("firstName");
  const onSubmit =async (data: FormValues)=>{
throw new Error("test")
    
  }
  const onError =()=>{
    console.log("Wrong ");
    
  }

    // React.useEffect(() =>{
    //   if(isSubmitSuccessful){
    //     reset({
    //       firstName: "sara",
    //           lastName: "rahman",
    //     })
    //   }

    // }, [isSubmitSuccessful, reset])

  return (
    <div className="grid-rows-1 w-full my-5 min-h-screen">
      renderCount= {renderCount}
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
      >
      {/* <form
        onSubmit={handleSubmit((data) => {
          console.log("Data: ", data);
        })}
      > */}
        {/* <p>{firstName === "lili1" ? "this is fake one" : "wait"}</p> */}
        <input
          type="firstName"
          {...register("firstName", { required: true , minLength:2})}
          placeholder="First Name"
          className="px-4 py-2 rounded w-full my-5  text-black"
        />
        {/* <input
          type="lastName"
          {...register("lastName", { required: true , minLength:4})}
          placeholder="Last Name"
          className="px-4 py-2 rounded w-full my-5  text-black"
        /> */}
        {/* <Controller
          name="lastName"
          control={control}
        
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Last Name"
              className="px-4 py-2 rounded w-full my-5 text-black"
            />
          )}
        />
        <p className="text-red-500">{errors.lastName?.message}</p> */}

        {/* <button type="button" 
        className="bg-pink-500 py-2 w-full"
        onClick={async () => {
          const output = await trigger("firstName",{ shouldFocus:true});

          console.log("output", output);
          
        }}
        
        >
          trigger
        </button> */}
        {/* <input
        type="lastName"
        {...register("lastName", {  required: true })}
        placeholder="First Name"
        className="px-4 py-2 rounded w-full my-5  text-black"
      /> */}
        {/* //////////////////////////////// */}
        {/* <input
          type="firstName"
          {...register("yourDetails.firstName", {  required: true })}
          placeholder="First Name"
          className="px-4 py-2 rounded w-full my-5  text-black"
        />

        <p className="text-red-500">{errors.firstName?.message}</p>
        <input
          type="lastName"
          {...register("yourDetails.lastName", {
            required: true,
            minLength: {
              value: 6,
              message: "Last Name must be at least 4 characters",
            },
          })}
          placeholder="Last Name"
          className="px-4 py-2 rounded w-full my-5 text-black"
        />
        <p className="text-red-500">{errors.lastName?.message}</p>  */}
        {/* <input
          type="email"
          value={value}
          onChange={(e) =>setValue(e.target.value)}
          placeholder="Email"
          className="px-4 py-2 rounded w-full my-5    text-black"
        /> */}
        {/* <button type="button" className="bg-red-500 py-2 w-full" onClick={() => {setValue("yourDetails",{
firstName: "lili", lastName: "luo"})}}>
          setValue
        </button> */}
        <input
          type="submit"
          className="bg-blue-500 w-full hover:bg-gray-500 py-2 my-2 rounded"
        />
      </form>
    </div>
  );
}
