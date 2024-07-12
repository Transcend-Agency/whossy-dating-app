import { Route, Routes, useLocation } from 'react-router-dom'
import './index.scss'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthLayout from './pages/AuthLayout'
import Home from './pages/Home'
import { AnimatePresence } from "framer-motion";
import Login from './pages/Login'
import MarqueeImageSliderBackground from './components/auth/MarqueeImageSliderBackground'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import CreateAccount from './pages/CreateAccount'


const queryClient = new QueryClient()

function App() {
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      {location.pathname.startsWith('/auth') && <MarqueeImageSliderBackground />}
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/auth' element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='create-account' element={<CreateAccount />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </QueryClientProvider>
  )
}

export default App
