import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-14">
      <AuthForm type="login" />
    </main>
  );
}
