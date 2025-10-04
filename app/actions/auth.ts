import { SignupFormSchema, FormState } from '@/app/lib/definitions'

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
   // Extract fields
  const role = formData.get("role") as string;

  const baseFields = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role,
  };

   // Conditionally add lawyer fields
  const extraFields =
    role === "lawyer"
      ? {
          specialization: formData.get("specialization"),
          experience: formData.get("experience"),
        }
      : {};

  // Combine both
  const allFields = { ...baseFields, ...extraFields };

  console.log("🧾 Form data being validated:", allFields);

  // ✅ Validate all fields using Zod schema
  const validatedFields = SignupFormSchema.safeParse(allFields);
  

  // If any form fields are invalid, return early
 if (!validatedFields.success) {
    console.log("❌ Validation failed:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, role: validatedRole, specialization, experience } =
    validatedFields.data;


  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_APP_API_KEY}/auth/signup`;
    console.log("🌐 Sending signup request to:", apiUrl);

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        role: validatedRole,
        specialization: role === "lawyer" ? specialization : null,
        experience: role === "lawyer" ? Number(experience) : null,
      }),
    });

    console.log("📡 Response status:", res.status);

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Invalid response" }));
      console.error("❌ API Error:", err);
      return { errors: { general: [err.message || "Signup failed"] } };
    }

    const result = await res.json();
    return { message: result.message || 'সাইনআপ সফল হয়েছে!' };
  } catch (error) {
    console.error('Signup error:', error);
    return { errors: { general: ['কিছু ভুল হয়েছে, আবার চেষ্টা করুন'] } };
  }
} 