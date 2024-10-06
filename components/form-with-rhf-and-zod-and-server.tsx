"use client";
import { signUpSchema, SignUpSchema } from "@/lib/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function FormWithReactHookFormAndZodAndServer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          confrimPassword: data.confrimPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      const responseData = await response.json();

      if (!response.ok) {
        alert("Submitting form failed");
        return;
      }

      if (responseData.errors) {
        const errors = responseData.errors;

        if (errors.email) {
          setError("email", {
            type: "server",
            message: errors.email,
          });
        } else if (errors.password) {
          setError("password", {
            type: "server",
            message: errors.password,
          });
        } else if (errors.confrimPassword) {
          setError("confrimPassword", {
            type: "server",
            message: errors.confrimPassword,
          });
        }
      } else {
        alert("Form submitted successfully");
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  }; // <-- This was missing

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 min-h-screen"
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
          placeholder="Confirm Password"
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
