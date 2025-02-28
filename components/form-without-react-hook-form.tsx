"use client";
import React, { useState } from "react";

export default function FormWithoutReactHookForm() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors ]= useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(password !== confirmPassword){
        setErrors(["Password and confrim password do not match"]);
        setIsSubmitting(false);
        return;
    }
    //todo: submit to server
    await new Promise((resolve)=>setTimeout(resolve,1000))

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsSubmitting(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-2  min-h-screen"
      >
        {errors.length > 0 &&(
            <ul>
                {errors.map((error)=>(
                    <li
                    key={error}
                    className="bg-red-100 text-red-500 px-4 py-2 rounded"
                    >
                        {error}
                    </li>
                ))}
            </ul>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded text-black"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="px-4 py-2 rounded text-black"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confrim password"
          className="px-4 py-2 rounded text-black"
        />
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
