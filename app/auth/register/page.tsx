import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <AuthForm type="register" />
    </main>
  );
}
