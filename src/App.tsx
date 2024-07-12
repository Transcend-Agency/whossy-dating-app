import { Route, Routes } from "react-router-dom";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Signup from "./components/auth/SignUpWithEmail";
import Auth from "./pages/Auth";
import OnboardingLayout from "./pages/OnboardingLayout";
import RelationshipPreference from "./pages/RelationshipPreference";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route index element={<RelationshipPreference />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
