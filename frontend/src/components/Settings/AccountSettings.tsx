import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const AccountSettings = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [accountData, setAccountData] = useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1234567890",
        email: "john.doe@example.com",
        username: "@johndoe",
        gender: "Male",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountData({ ...accountData, [e.target.name]: e.target.value })
    }

    const handleGenderChange = (value: string) => {
        setAccountData({ ...accountData, gender: value })
    }

    const handleSave = () => {
        // Here you would typically send the data to your backend
        console.log("Saving account data:", accountData)
        setIsEditing(false)
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Account</h2>
                <div>
                    {isEditing && (
                        <Button className="mr-4" onClick={handleSave}>
                            Save
                        </Button>
                    )}
                    <Button
                        onClick={() => setIsEditing(!isEditing)}
                        variant={isEditing ? "outline" : "default"}
                        >
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
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
        </div>
    )
}

export default AccountSettings;