import RegisterForm from '@/components/Register/RegisterForm';
import React from 'react';

const RegisterPage: React.FC = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
