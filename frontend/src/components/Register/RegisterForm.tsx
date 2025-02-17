import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Separator} from "@/components/ui/separator.tsx";

const AccountSettings = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [accountData, setAccountData] = useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1234567890",
        email: "john.doe@example.com",
        username: "@johndoe",
        gender: "Male",
    })
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountData({ ...accountData, [e.target.name]: e.target.value })
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
    }

    const handleGenderChange = (value: string) => {
        setAccountData({ ...accountData, gender: value })
    }

    const handleSaveAccount = () => {
        // Here you would typically send the account data to your backend
        console.log("Saving account data:", accountData)
        setIsEditing(false)
    }

    const handleSavePassword = () => {
        // Here you would typically send the password data to your backend
        console.log("Saving password data:", passwordData)
        setIsChangingPassword(false)
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Account</h2>
                <div>
                    <Button variant="outline" className="mr-2" onClick={() => setIsChangingPassword(!isChangingPassword)}>
                        {isChangingPassword ? "Cancel Password Change" : "Change Password"}
                    </Button>
                    <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit"}</Button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={accountData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={accountData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" value={accountData.phone} onChange={handleInputChange} disabled={!isEditing} />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" value={accountData.email} disabled={true} />
                </div>
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        name="username"
                        value={accountData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select disabled={!isEditing} value={accountData.gender} onValueChange={handleGenderChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {isEditing && (
                <Button className="mt-4" onClick={handleSaveAccount}>
                    Save Account Changes
                </Button>
            )}

            <Separator className="my-6" />

            {isChangingPassword && (
                <div className="mt-4 space-y-4">
                    <h3 className="text-xl font-semibold">Change Password</h3>
                    <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <Button onClick={handleSavePassword}>Save Password Changes</Button>
                </div>
            )}
        </div>
    )
}

export default AccountSettings;