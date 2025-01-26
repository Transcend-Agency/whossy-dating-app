import useProfileFetcher from "@/hooks/useProfileFetcher.tsx";
import useDashboardStore from "@/store/useDashboardStore.tsx";
import useAutoLogout from "@/store/UserId.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import EmailVerification from "./components/auth/EmailVerification";
import FinalizeSetup from "./components/auth/FinalizeSetup";
import MarqueeImageSliderBackground from "./components/auth/MarqueeImageSliderBackground";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import MatchesPage from "./components/dashboard/MatchesPage";
import ViewProfile from "./components/dashboard/ViewProfile";
import useTrackUserPresence from "./hooks/useTrackUserPresesnce";
import "./index.scss";
import AccountSetup from "./pages/AccountSetup";
import AuthLayout from "./pages/AuthLayout";
import Chat from "./pages/Chat";
import Contact from "./pages/Contact";
import CreateAccount from "./pages/CreateAccount";
import Explore from "./pages/dashboard/Explore";
import SwipingAndMatching from "./pages/dashboard/SwipingAndMatching";
import UserProfile from "./pages/dashboard/UserProfile";
import Faq from "./pages/Faq";
import Favorites from "./pages/Favorites";
import ForgotPassword from "./pages/ForgotPassword";
import GlobalSearch from "./pages/GlobalSearch";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Notification from "./pages/Notification";
import Onboarding from "./pages/Onboarding";
import OnboardingLayout from "./pages/OnboardingLayout";
import PhoneNumber from "./pages/PhoneNumber";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { ProtectedDashboard } from "./pages/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";


const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  useTrackUserPresence();
  useAutoLogout()

  const { profiles, selectedProfile, setSelectedProfile, blockedUsers, selectedOption, currentLocation, previousLocation } = useDashboardStore()
  const { fetchProfilesBasedOnOption, refreshProfiles } = useProfileFetcher()

  useEffect(() => {
    fetchProfilesBasedOnOption().catch((err) => console.error("An error occurred while trying to fetch profiles: ", err))
  }, [selectedOption, blockedUsers]);

  return (

    <QueryClientProvider client={queryClient}>
      {location.pathname.startsWith("/auth") && (<MarqueeImageSliderBackground />)}
      <AnimatePresence>
        <RouteWatcher key={`${currentLocation}_${previousLocation}`} />
        <Routes location={location} key={location.pathname}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route path="account-setup" element={<AccountSetup />} />
            <Route path="phone-number" element={<PhoneNumber />} />
            <Route path="finalize-setup" element={<FinalizeSetup />} />
            <Route path="email-verification" element={<EmailVerification />} />
          </Route>
          <Route path="/onboarding" element={<OnboardingLayout />}>
            <Route index element={<Onboarding />} />
          </Route>
          <Route path="/dashboard" element={
            <ProtectedDashboard><DashboardLayout /></ProtectedDashboard>}>
            <Route path="user-profile" element={selectedProfile ? <ViewProfile
              onBackClick={() => { setSelectedProfile(null) }}
              userData={profiles.find(profile => selectedProfile as string == profile.uid)!}
              onBlockChange={refreshProfiles}
            /> : <UserProfile />} />
            <Route path="explore" element={<Explore />} />
            <Route path="swipe-and-match" element={<SwipingAndMatching />} />
            <Route path="matches" element={selectedProfile ? <ViewProfile
              onBackClick={() => { setSelectedProfile(null) }}
              userData={profiles.find(profile => selectedProfile as string == profile.uid)!}
              onBlockChange={refreshProfiles}
            /> : <MatchesPage />} />
            <Route path="globalSearch" element={<GlobalSearch />} />
            <Route path="heart" element={<Favorites />} />
            <Route path="chat" element={selectedProfile ? <ViewProfile
              onBackClick={() => { setSelectedProfile(null) }}
              userData={profiles.find(profile => selectedProfile as string == profile.uid)!}
              onBlockChange={refreshProfiles}
            /> : <Chat />} />
            <Route path="notification" element={<Notification />} />
          </Route>
          <Route path="" element={<Landing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
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

const RouteWatcher = () => {
  const location = useLocation()
  const { setLocation } = useDashboardStore()

  useEffect(() => {
    setLocation(location.pathname)
  }, [location, setLocation])

  return null
};