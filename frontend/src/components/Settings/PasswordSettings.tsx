import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const PasswordSettings = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [passwordData, setPasswordData] = useState({
        password: "",
        confirmPassword: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
    }


    const handleSave = () => {
        // Here you would typically send the data to your backend
        console.log("Saving password data:", passwordData)
        setIsEditing(false)
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Password</h2>
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
            <div className="mt-4 grid gap-4">
                <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                        id="currentPassword"
                        type="password"
                        placeholder="********"
                        disabled={!isEditing} />
                </div>
                <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                        id="newPassword"
                        type="password"
                        placeholder="********"
                        onChange={handleInputChange}
                        disabled={!isEditing} />
                </div>
                <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="********"
                        onChange={handleInputChange}
                        disabled={!isEditing} />
                </div>
            </div>
        </div>
    )
}

export default PasswordSettings;