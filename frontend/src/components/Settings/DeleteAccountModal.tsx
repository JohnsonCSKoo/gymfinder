import type React from "react"

import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useDispatch} from "react-redux";
import { deleteAccount } from "@/state/authSlice.ts";
import {useNavigate} from "react-router-dom";
import {AppDispatch} from "@/state/store.ts";

interface DeleteAccountModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleDelete = (e) => {
        e.preventDefault();

        if (!password || password.length  < 8) {
            setError("Please enter a valid password.")
            return;
        }

        try {
            dispatch(deleteAccount({password: password, token: "" }));
        } catch (ex) {
            console.log("HIT")
            setPassword("");
            setError("Please enter a valid password.");
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setError("")
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="my-4">
                    <Label htmlFor="confirmPassword" className="mb-2 block">
                        Please enter your password to confirm:
                    </Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            setPassword("")
                            setError("")
                        }}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={!password}>
                        Delete Account
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
