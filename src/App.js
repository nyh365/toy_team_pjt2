import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

// component
import Home from './pages/Home/Home';
// react-cookie
import { CookiesProvider } from 'react-cookie';
// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserLogin from 'pages/Login/UserLogin';
import Notice from 'pages/Notice/Notice';
const queryClient = new QueryClient();
function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter className="App">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/notice" element={<Notice />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
