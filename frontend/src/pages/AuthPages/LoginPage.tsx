import { Link } from "react-router-dom"
import LoginForm from "@/components/Login/LoginForm.tsx";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen">
            {/* Left side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-white mb-4">GymFinder</h1>
                    <p className="text-xl text-white opacity-80">Discover Your Perfect Workout Space</p>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold">Welcome Back</h2>
                        <p className="text-gray-600">Log in to your account</p>
                    </div>
                    <LoginForm />
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
