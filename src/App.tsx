import { Route, Routes } from "react-router-dom";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Auth />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
