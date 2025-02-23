import RegisterForm from "@/components/Register/RegisterForm"
import { Link } from "react-router-dom"

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen">
            {/* Left side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-white mb-4">GymFinder</h1>
                    <p className="text-xl text-white opacity-80">Discover Your Perfect Workout Space</p>
                </div>
            </div>

            {/* Right side - Register Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold">Create an Account</h2>
                        <p className="text-gray-600">Join GymFinder today</p>
                    </div>
                    <RegisterForm />
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

