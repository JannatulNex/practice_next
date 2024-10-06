import { z } from "zod"; 
export const signUpSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().trim().min(4, "password should be 4 characters"),
    confrimPassword: z.string(),
  })
  .refine((data) => data.password === data.confrimPassword, {
    message: "Password must be the same",
    path: ["confrimPassword"],
  });

 export type SignUpSchema = z.infer<typeof signUpSchema>;
