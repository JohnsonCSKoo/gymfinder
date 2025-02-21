import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '@/pages/AuthPages/RegisterPage';
import LoginPage from '@/pages/AuthPages/LoginPage';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import Layout from "@/components/Layout/Layout.tsx";
import HomePage from "@/pages/HomePage/HomePage.tsx";
import SettingsPage from "@/pages/SettingsPage/SettingsPage.tsx";
import PrivateRoute from './PrivateRoute';

const AppRoutes: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.auth);

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    <Route path="/settings"
                           element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
                    <Route
                        path="/register"
                        element={token ? <Navigate to="/" /> : <RegisterPage />} />
                    <Route
                        path="/login"
                        element={token ? <Navigate to="/" /> :<LoginPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default AppRoutes;