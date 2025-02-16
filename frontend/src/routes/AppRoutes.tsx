import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '@/pages/AuthPages/RegisterPage';
import LoginPage from '@/pages/AuthPages/LoginPage';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import Layout from "@/components/Layout/Layout.tsx";

const AppRoutes: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.auth);

    console.log(token);

    return (
        <Router>
            <Layout>
                <Routes>
                    {/*<Route path="/" element={<RegisterPage />} />*/}
                    <Route
                        path="/register"
                        element={token ? <Navigate to="/" /> : <RegisterPage />} />
                    <Route
                        path="/login"
                        element={token ? <Navigate to="/" /> :<LoginPage />} />
                    {/* Add more routes here */}
                </Routes>
            </Layout>
        </Router>
    );
}

export default AppRoutes;