"use client";
import { log } from "console";
import React, { useState } from "react";
import { useForm, Control, useFieldArray, useWatch } from "react-hook-form";
import { FieldValues } from "react-hook-form";

let renderCount = 0;

interface FormValues {
  cart: {
    name: string;
    amount: number;
  }[];
}

// Update the getTotal function to return the total amount
function getTotal(payload: FormValues["cart"]): number {
    let total = 0;
    for (const item of payload) {
      // Add amount to total, using 0 if amount is NaN
      total = total + (Number.isNaN(item.amount) ? 0 : item.amount);
    }
    return total;
  }

function TotalAmount({ control }: { control: Control<FormValues> }) {
    const cartValues = useWatch({
        control,
        name: "cart"
    })
    return <p>Total Amount: {getTotal(cartValues)}</p>;
}


export default function UseField() {
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
      cart: [{ name: "", amount: 0 }],
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: "cart",
    control,
    rules: {
        required: "please append at least 1 item",

    }
  });
// console.log(watch());

  renderCount++;

  console.log("Errors: ", errors);

  return (
    <div className="grid-rows-1 w-full my-5 min-h-screen">
      renderCount= {renderCount}
      <form
        onSubmit={handleSubmit((data) => {
          console.log("Submit Data", data);
        })}
      >
        {fields.map((field, index) => {
          return (
            <section key={field.id} className="flex flex-col gap-y-2">
              <label>
                <span>Name : </span>
                <input
                  type="text"
                  className="my-2"
                  {...register(`cart.${index}.name`,{required: true})}
                />
              </label>
              <label>
                <span>Amount : </span>
                <input
                  type="number"
                  {...register(`cart.${index}.amount`, { valueAsNumber: true })}
                />
              </label>
              <button type="button" 
              className="bg-red-700 w-full  py-2 my-2 rounded" onClick={()=>remove(index)}>
                Delete
              </button>
            </section>
          );
        })}
        <button
          type="button"
          className="bg-blue-500 w-full  py-2 my-2 rounded"
          onClick={() => {
            append({
              name: "append",
              amount: 0,
            });
          }}
        >
          Append
        </button>
        <button
          type="button"
          className="bg-red-500 w-full  py-2 my-2 rounded"
          onClick={() => {
            prepend({ name: "prepend", amount: 0 });
          }}
        >
          Prepend
        </button>
        <TotalAmount control={control}/>


        <p>{errors.cart?.root?.message}</p>
        <input
          type="submit"
          className="bg-pink-500 w-full  py-2 my-2 rounded"
        />
      </form>
    </div>
  );
}
