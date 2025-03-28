import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './components/Home'
import SignupPage from './components/SignUp'
import LoginPage from './components/Login'
import Dashboard from './components/Dashboard'
import GeminiChat from './components/Upload'
import Contact from './components/Contact'
import About from './components/About'
import Certi from "./components/certificates/generate"
import Verify from './components/Verify'


function App() {
  

  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/upload" element={<GeminiChat/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/gen-ce" element={<Certi/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
