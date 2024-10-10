"use client";
import React, { useEffect, useState } from "react";
import { useForm, useWatch, FieldValues, Control, UseFormRegister, useFormState } from "react-hook-form";

// Type definitions for FormValues and props
interface FormValues {
  firstName: string;
  lastName: string;
}

interface ControllerProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  name: keyof FormValues;
  rules?: any;
  render: (props: {
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    name: string;
  }) => JSX.Element;
}

interface InputProps {
  value: any;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}

// Custom Controller component
const Controller: React.FC<ControllerProps> = ({ control, register, name, rules, render }) => {
  const value = useWatch({
    control,
    name,
  });
  const {errors} = useFormState({
    control,
    name,
  });
  const props = register(name, rules);

  return render({
    value,
    onChange: (e) =>
      props.onChange({
        target: {
          name,
          value: e.target.value,
        },
      }),
      onBlur: () => props.onBlur(), 
    name: props.name,
  });
};

// Custom Input component
const Input: React.FC<InputProps> = (props) => {
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <input
      name={props.name}
      className={`px-4 py-2 rounded w-full my-5 text-black ${props.className}`}
      placeholder={props.placeholder || ""}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange && props.onChange(e);
      }}
      value={value}
    />
  );
};

export default function FromController() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "test1",
    },
  });

  const onSubmit = (data: FieldValues) => console.log("Data: ", data);

  let renderCount = 0;
  renderCount++;

  console.log("Errors: ", errors);

  useEffect(() => {
    setTimeout(() => {
      setValue("lastName", "test");
    }, 1000);
  }, [setValue]);

  return (
    <div className="grid-rows-1 w-full my-5 min-h-screen">
      renderCount = {renderCount}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name Input */}
        <input
          type="text"
          {...register("firstName", { required: true })}
          placeholder="First Name"
          className="px-4 py-2 rounded w-full my-5 text-black"
        />
        <p className="text-red-500">{errors.firstName && "First Name is required"}</p>

        {/* Last Name Input with Controller */}
        <Controller
          control={control}
          register={register}
          name="lastName"
          rules={{ required: true }}
          render={(props) => (
            <Input
              {...props}
              className="border border-gray-300"
              placeholder="Last Name"
            />
          )}
        />
        <p className="text-red-500">{errors.lastName && "Last Name is required"}</p>

        <input
          type="submit"
          className="bg-blue-500 w-full hover:bg-gray-500 py-2 my-2 rounded"
        />
      </form>
    </div>
  );
}
