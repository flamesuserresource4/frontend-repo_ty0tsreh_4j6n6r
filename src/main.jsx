import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import './index.css'
import Navbar from './components/Navbar'
import Transactions from './pages/Transactions'
import Messages from './pages/Messages'
import Profile from './pages/Profile'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/transactions" element={<><Navbar /><Transactions /></>} />
        <Route path="/messages" element={<><Navbar /><Messages /></>} />
        <Route path="/profile" element={<><Navbar /><Profile /></>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
