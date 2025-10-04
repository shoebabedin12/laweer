import { z } from 'zod'

export const SignupFormSchema = z.object({
  name: z.string({ message: 'Please enter a Name.' }).min(1, "Name is required"),
  email: z.string({ message: 'Please enter a valid email.' }).min(1, "Email is required").email("Invalid email"),
  password: z.string({ message: "Password is required" })
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
  role: z.enum(["user", "lawyer"], {
    message: "একটি সঠিক ভূমিকা নির্বাচন করুন",
  }),
  specialization: z.string().optional(),
  experience: z.union([z.string(), z.number()]).optional(),
}).superRefine((data, ctx) => {
  if (data.role === "lawyer") {
    if (!data.specialization) {
      ctx.addIssue({
        path: ["specialization"],
        message: "Specialization is required for lawyers.",
        code: z.ZodIssueCode.custom,
      });
    }
    if (!data.experience) {
      ctx.addIssue({
        path: ["experience"],
        message: "Experience is required for lawyers.",
        code: z.ZodIssueCode.custom,
      });
    }
  }
});

export const SigninFormSchema = z.object({
  email: z.string({ message: 'Please enter a valid email.' }).min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ message: "Password is required" })
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})


export type FormState =
  | {
    errors?: {
      name?: string[]
      email?: string[]
      password?: string[]
      role?: string[]
      specialization?: string[],
      experience?: string[]
      general?: string[]
    }
    message?: string
  }
  | undefined