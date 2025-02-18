import React, {useState} from 'react';
import {Role} from "@/@types/enums/role.ts";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import {useNavigate} from "react-router-dom";
import {RegisterDto} from "@/@types/auth";
import {getEnumKey} from "@/lib/utils.ts";
import {AppDispatch, RootState} from "@/state/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "@/state/authSlice.ts";
import {Label} from "@/components/ui/label.tsx";
import UserTypeSwitch from "@/components/Register/UserTypeSwitch.tsx";

const RegisterForm: React.FC = () => {
    const [step, setStep] = useState(1)
    const [isGymOwner, setIsGymOwner] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [formError, setFormError] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleNext = () => {
        setFormError("")
        if (step === 2) {
            if (!firstName || !lastName || !email) {
                setFormError("All fields are required");
                return;
            }

            const emailRegex = new RegExp(/^\S+@\S+\.\S+$/)
            if (!emailRegex.test(email)) {
                setFormError("Please enter a valid email address")
                return
            }
        }

        setStep(step + 1)
    }

    const handleBack = () => {
        setStep(step - 1)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");

        if (!password || !confirmPassword) {
            setFormError("All fields are required");
            return;
        }

        const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,}$/)
        if (!passwordRegex.test(password)) {
            setFormError("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long");
            return;
        }

        if (password !== confirmPassword) {
            setFormError("Passwords do not match");
            return;
        }

        const registerDto: RegisterDto = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: getEnumKey(Role, isGymOwner ? Role.GYM_OWNER : Role.USER),
        }

        dispatch(registerUser(registerDto)).then(() => {
            navigate("/");
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
                <div className="space-y-4">
                    <UserTypeSwitch isGymOwner={isGymOwner} setIsGymOwner={setIsGymOwner} />
                    <Button type="button" onClick={handleNext} className="w-full">
                        Next
                    </Button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <Button type="button" variant="ghost" onClick={handleBack} className="mb-2">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <Button type="button" onClick={handleNext} className="w-full">
                        Next
                    </Button>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <Button type="button" variant="ghost" onClick={handleBack} className="mb-2">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Register
                    </Button>
                </div>
            )}

            {formError && <p className="text-sm text-red-500 mt-2">{formError}</p>}
        </form>
    )
};

export default RegisterForm;
