import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { HomePage } from "@/pages/home";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<div>404</div>}>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
      </Route>
      <Route path="/">
        <Route path="auth/login" element={<>Login</>} />
        <Route path="auth/register" element={<>Register</>} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Route>
  )
);
