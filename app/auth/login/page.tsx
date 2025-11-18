import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <AuthForm type="login" />
    </main>
  );
}
