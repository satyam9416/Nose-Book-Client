import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from './components/custom-routes/privateRoute';
import './app.css'
import Loading from './pages/loading';
const Home = lazy(() => import('./pages/home'));
const Profile = lazy(() => import('./pages/profile'));
const Chat = lazy(() => import('./pages/Chat'));
const Signup = lazy(() => import('./components/auth/signup/signup'));
const Login = lazy(() => import('./components/auth/login/login'));



const App = () => {

  return (
    <Routes>
      <Route path='*' element={<h1>page not found</h1>} />

      <Route path='/' element={<PrivateRoute />} >

        <Route index element={<Navigate to='home' />} />

        <Route path='/home' element={
          <Suspense fallback={<Loading page />}><Home/></Suspense>
        } />

        <Route path='/profile/:id' element={
          <Suspense fallback={<Loading page />}><Profile /></Suspense>          
        } />

        <Route path='/chat/:id' element={
          <Suspense fallback={<Loading page />}><Chat /></Suspense>    
        } />

      </Route>

      <Route path='/signup' element={
        <Suspense fallback={<Loading page />}><Signup /></Suspense>    
      } />

      <Route path='/login' element={
        <Suspense fallback={<Loading page />}><Login /></Suspense>    
      } />
    </Routes>
  )
}
export default App