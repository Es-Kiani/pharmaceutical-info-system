import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BlogPage from './pages/BlogPage';
import DrugInfoPage from './pages/DrugInfoPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PassgenPage from './pages/PassgenPage';
import LogoutPage from './pages/LogoutPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ControlPanelPage from './pages/ControlPanelPage';



function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/main' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/controlpanel' element={<ControlPanelPage />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/druginfo/:drugId' element={<DrugInfoPage />} />
        <Route path='/login/resetpassword' element={<ResetPasswordPage />} />
        <Route path='/register/passgen' element={<PassgenPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
