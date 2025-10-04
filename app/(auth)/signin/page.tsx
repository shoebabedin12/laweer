import ClientLoginForm from '@/app/components/LoginComponent';


export default async function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">লগইন</h1>
        <ClientLoginForm />
      </div>
    </div>
  );
}