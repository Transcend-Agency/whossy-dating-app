import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom';
import {DashboardProvider} from "@/components/dashboard/DashboardProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <DashboardProvider>
            <App />
        </DashboardProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
