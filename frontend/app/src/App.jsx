import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { useSelector } from 'react-redux'

import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <>
      <BrowserRouter basename="/htWithAuthentication/">
        <Routes>
          {!isAuthenticated && 
            <Route path='*' element={<LoginPage />} />
          }
          {isAuthenticated && 
            <Route path='/' element={<MainPage />} />
          }          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
