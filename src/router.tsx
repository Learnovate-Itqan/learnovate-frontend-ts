import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { AppLayout } from "@/layouts/AppLayout";
import { NotFoundPage } from "@/pages/404";
import { EmailVerificationPage } from "@/pages/Auth/EmailVerification";
import { ForgotPassword } from "@/pages/Auth/ForgotPassword";
import { ResetPassword } from "@/pages/Auth/ResetPassword";
import { VerificationPage } from "@/pages/Auth/Verification";
import { LoginPage } from "@/pages/Auth/login";
import { RegisterPage } from "@/pages/Auth/register";
import { CoursesPage } from "@/pages/courses";
import { HomePage } from "@/pages/home";
import { MentorMePage } from "@/pages/mentor/me";
import { MentorViewerPage } from "@/pages/mentor/viewer";

import { ChatPage } from "./pages/chat";
import { MentorEditPage } from "./pages/mentor/edit";
import { AppLayout } from "./layouts/AppLayout";
import { NotFoundPage } from "./pages/404";
import { EmailVerificationPage } from "./pages/Auth/EmailVerification";
import { VerificationPage } from "./pages/Auth/Verification";
import { Contact } from "./pages/contact";
import { CoursesPage } from "./pages/courses";
import MentorPage from "./pages/mentors";
import { Pricing } from "./pages/pricing";
import { Track } from "./pages/track";
import { AuthRoutes } from "./routes/Auth";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<div>404</div>}>
      <Route path="/">
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/mentors" element={<MentorPage />} />
          <Route path="/track/:id" element={<Track />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>
        {/* Authentication Routes */}
        <Route element={<AuthRoutes />}>
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
          <Route path="auth/verify/email/:code" element={<EmailVerificationPage />} />
          <Route path="auth/verification" element={<VerificationPage />} />
          <Route path="auth/forgot-password" element={<ForgotPassword />} />
          <Route path="auth/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Mentor Routes */}
        <Route path="mentor/:id" element={<MentorViewerPage />} />
        <Route path="mentor/me/:id" element={<MentorMePage />} />
        <Route path="/mentor/me/:id/edit" element={<MentorEditPage />} />
        {/* Chat Routes */}
        <Route path="chat/learnovate-assistant" element={<ChatPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
