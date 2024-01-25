import { AuthLayout } from "@/layouts/AuthLayout";

export function LoginPage() {
  window.document.title = "Learnovate - Login";
  return (
    <AuthLayout title="Welcome Back" subTitle="Welcome back! Please enter your details.">
      <div className="my-6">login form to be added here</div>
    </AuthLayout>
  );
}
