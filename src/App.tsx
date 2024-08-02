import { Route, Routes, useLocation } from "react-router-dom";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./pages/AuthLayout";
import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import MarqueeImageSliderBackground from "./components/auth/MarqueeImageSliderBackground";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CreateAccount from "./pages/CreateAccount";
import OnboardingLayout from "./pages/OnboardingLayout";
import AccountSetup from './pages/AccountSetup'
import PhoneNumber from './pages/PhoneNumber'
import FinalizeSetup from './components/auth/FinalizeSetup'
import EmailVerification from './components/auth/EmailVerification'
import Onboarding from "./pages/Onboarding";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      {location.pathname.startsWith("/auth") && (
        <MarqueeImageSliderBackground />
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='create-account' element={<CreateAccount />} />
            <Route path='account-setup' element={<AccountSetup />} />
            <Route path='phone-number' element={<PhoneNumber />} />
            <Route path='finalize-setup' element={<FinalizeSetup />} />
            <Route path='email-verification' element={<EmailVerification />} />
          </Route>
          <Route path="/onboarding" element={<OnboardingLayout />}>
            <Route index element={<Onboarding />} />
          </Route>
          <Route path='' element={<Landing />}/>
        </Routes>
        <ToastContainer />
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default App;

const ToastContainer: React.FC = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          maxWidth: "1000px",
          fontSize: "1.6rem",
        },
        duration: 1500,
      }}
    />
  );
};
