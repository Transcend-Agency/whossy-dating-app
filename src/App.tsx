import { Route, Routes } from 'react-router-dom'
import './index.scss'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Home from './pages/Home'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
       <Routes>
         <Route path='/' element={<Home/>} />
       </Routes>
    </QueryClientProvider>
  )
}

export default App
