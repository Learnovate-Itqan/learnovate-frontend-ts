import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/Auth/login";
import { RegisterPage } from "@/pages/Auth/register";
import { ForgotPassword } from "@/pages/Auth/ForgotPassword";
import { ResetPassword } from "@/pages/Auth/ResetPassword";
import { VerificationPage } from "./pages/Auth/Verification";
import { AuthRoutes } from "./routes/Auth";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<div>404</div>}>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        {/* Authentication Routes */}
        <Route element={<AuthRoutes />}>
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
          <Route path="auth/verification" element={<VerificationPage />} />
          <Route path="auth/forgot-password" element={<ForgotPassword />} />
          <Route path="auth/reset-password/:id" element={<ResetPassword />} />
        </Route>
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Route>
  )
);
