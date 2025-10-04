'use client';

import { useActionState, useState } from 'react';
import { signup } from '../actions/auth';

export default function ClientSignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  const [role, setRole] = useState('user');

   // ✨ Custom form handler to prevent reset when errors exist
  const handleSubmit = async (formData: FormData) => {
    const result = await action(formData);

    // if there's an error (no success message), don't reset the form
    if (!result?.message) return;

    // otherwise reset form manually on success
    (document.getElementById('signup-form') as HTMLFormElement)?.reset();
    setRole('user'); // reset role select
  };

  return (
    <form action={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          নাম
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.errors?.name && <p>{state.errors.name}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          ইমেইল
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.errors?.email && <p>{state.errors.email}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          পাসওয়ার্ড
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          ভূমিকা
        </label>
        <select
          id="role"
          name="role"
          defaultValue="user"
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="user">ইউজার</option>
          <option value="lawyer">আইনজীবী</option>
        </select>
        {state?.errors?.role && <p className="text-red-500 text-sm">{state?.errors.role}</p>}
      </div>
      {role === 'lawyer' && (
        <>
          <div className="mb-4">
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
              বিশেষত্ব
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors?.specialization && (
              <p className="text-red-500 text-sm">{state?.errors?.specialization}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              অভিজ্ঞতা (বছর)
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors?.experience && <p className="text-red-500 text-sm">{state?.errors?.experience}</p>}
          </div>
        </>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {pending ? 'সাইনআপ হচ্ছে...' : 'সাইনআপ'}
      </button>

      {state?.message && (
        <p className="text-green-600 text-center mt-2">{state.message}</p>
      )}
    </form>
  );
}