"use client";
import { signUpSchema, SignUpSchema } from "@/lib/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";

// import { z } from "zod";

// const signUpSchema = z
//   .object({
//     email: z.string().trim().email(),
//     password: z.string().trim().min(4, "password should be 4 characters"),
//     confrimPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confrimPassword, {
//     message: "Password must be the same",
//     path: ["confrimPassword"],
//   });

//   type SignUpSchema = z.infer<typeof signUpSchema>;

export default function FormWithReactHookFormAndZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<SignUpSchema>({ 
    resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: SignUpSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2  min-h-screen"
      >
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded text-black"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded text-black"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <input
          {...register("confrimPassword")}
          type="password"
          placeholder="Confrim password"
          className="px-4 py-2 rounded text-black"
        />
        {errors.confrimPassword && (
          <p className="text-red-500">{`${errors.confrimPassword.message}`}</p>
        )}
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
