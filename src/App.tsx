import { Route, Routes } from "react-router-dom";
import { Header } from "./components/shared/header";
import { HomePage } from "./pages/home-page";
import { AdminPage } from "./pages/admin-page";
import { PrivacyPage } from "./pages/privacy-page";
import { TermsPage } from "./pages/terms-page";
import { AdminAuthProvider, useAdminAuth } from "./contexts/admin-auth-context";
import { LoginForm } from "./components/admin/login-form";
import { CookiesBanner } from "./components/shared/cookies-banner";

function ProtectedAdminRoute() {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? <AdminPage /> : <LoginForm />;
}

function AppRoutes() {
  return (
    <div className="min-h-svh bg-sand-50 flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<ProtectedAdminRoute />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
      <CookiesBanner />
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <AppRoutes />
    </AdminAuthProvider>
  );
}
