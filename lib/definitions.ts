import { object, string } from 'zod'
 
export const SigninFormSchema = object({
  email: string({ message: 'Please enter a valid email.' }).min(1, "Email is required")
    .email("Invalid email"),
  password: string({ message: "Password is required" })
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
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined