import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from './components/auth/signup/signup'
import Login from './components/auth/login/login'
import Home from './pages/home';
import PrivateRoute from './components/custom-routes/privateRoute';
import Profile from './pages/profile';
import Chat from './pages/Chat';

const App = () => {

  return (
    <Routes>
      <Route path='*' element={<h1>page not found</h1>} />
      <Route path='/' element={<PrivateRoute />} >
        <Route path='/' element={<Navigate to='home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/chat/:id' element={<Chat />} />
      </Route>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
export default App