import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Label} from "@/components/ui/label.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useNavigate} from "react-router-dom";
import {LoginDto} from "@/@types/auth";
import {AppDispatch, RootState} from "@/state/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "@/state/authSlice.ts";

const LoginForm: React.FC = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("")
    const [keepLoggedIn, setKeepLoggedIn] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    // form handler
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");

        if (!email || !password) {
            setFormError("All fields are required");
            return;
        }

        const emailRegex = new RegExp(/^\S+@\S+\.\S+$/)
        if (!emailRegex.test(email)) {
            setFormError("Please enter a valid email address");
            return
        }

        const loginDto: LoginDto = {
            email: email,
            password: password,
        }

        dispatch(loginUser(loginDto)).then(() => {
            navigate("/");
        });
    }

    return (
        <>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="keepLoggedIn"
                        checked={keepLoggedIn}
                        onCheckedChange={(checked) => setKeepLoggedIn(checked as boolean)}
                    />
                    <Label htmlFor="keepLoggedIn">Keep me logged in</Label>
                </div>
                <Button type="submit" className="w-full">
                    Sign In
                </Button>
                <div className="text-center">
                    <a href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                    </a>
                </div>

                {formError && <p className="text-sm text-red-500 mt-2">{formError}</p>}
            </form>
        </>
    )
};

export default LoginForm;
