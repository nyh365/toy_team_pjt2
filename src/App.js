import UserLogin from 'pages/Login/UserLogin';
import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

// component
import Home from 'pages/Home/Home';
// react-cookie
import { CookiesProvider } from 'react-cookie';
// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import tw, { styled, css } from 'twin.macro';
const queryClient = new QueryClient();
function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter className="App">
          <div>
            <Routes>
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
