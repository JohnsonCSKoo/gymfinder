import React, {useEffect} from "react"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {UpdateUserDto, UserSettings} from "@/@types/user";
import {Gender} from "@/@types/enums/gender.ts";
import {updateUser} from "@/api/userApi.ts";
import {getEnumKey} from "@/lib/utils.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {ToastAction} from "@/components/ui/toast.tsx";

interface AccountSettingsProps {
    userData?: UserSettings,
    userId: string | null
}

// TODO implement Zod validation instead

const AccountSettings: React.FC<AccountSettingsProps> = ({userData, userId}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState<UserSettings>(userData);
    const [formData, setFormData] = useState<UserSettings>(userData);

    const { toast } = useToast();

    useEffect(() => {
        if (userData) {
            const formData: UserSettings = {
                firstName: userData.firstName ?? "",
                lastName: userData.lastName ?? "",
                phone: userData.phone ?? "",
                email: userData.email ?? "",
                username: userData.username ?? "",
                gender: userData.gender ? userData.gender : "" as Gender
            };
            setFormData(formData);
            setOriginalData(formData);
        }
    }, [userData]);

    const setFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({...prev, firstName: e.target.value}));
    };

    const setLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({...prev, lastName: e.target.value}));
    };

    const setPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({...prev, phone: e.target.value}));
    };

    const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({...prev, username: e.target.value}));
    };

    const setGender = (value: string) => {
        setFormData((prev) => ({...prev, gender: value as Gender}));
    }

    const [error, setError] = useState<string>("");

    const handleToggleEditing = () => {
        setIsEditing(prevState => {
            if (prevState) {
                setFormData(originalData);
                setError("");
            }
            return !prevState;
        });
    }

    const handleSave = async () => {
        if (!formData.firstName || !formData.lastName) {
            setError("Required fields cannot be empty.");
            return;
        }

        const updatedUser: UpdateUserDto = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phone,
            userTag: formData.username,
            gender: getEnumKey(Gender, formData.gender)
        }

        await updateUser(userId!, updatedUser)
            .then(() => {
                toast({
                    title: "User updated successfully",
                    action: <ToastAction altText="Dismiss">Dismiss</ToastAction>
                });
                setIsEditing(false);
            }).catch((error) => {
                console.error("Error updating user:", error);
                toast({
                    title: "Error updating user",
                    description: "An error occurred while updating user. Please try again.",
                    action: <ToastAction altText="Dismiss">Dismiss</ToastAction>
                });
            });

    }

    return (
        <form className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Account</h2>
                <div>
                    {isEditing && (
                        <Button
                            type="button"
                            className="mr-4"
                            onClick={handleSave}>
                            Save
                        </Button>
                    )}
                    <Button
                        type="button"
                        onClick={handleToggleEditing}
                        variant={isEditing ? "outline" : "default"}
                    >
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="firstName">
                        First Name<span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={setFirstName}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <Label htmlFor="lastName">
                        Last Name<span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={setLastName}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <Label htmlFor="email">
                        Email<span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        disabled={true}/>
                </div>
                <div>
                    <Label htmlFor="username">
                        Username
                    </Label>
                    <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={setUsername}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <Label htmlFor="phone">
                        Phone Number
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        placeholder="1234567890"
                        onChange={setPhone}
                        disabled={!isEditing}/>
                </div>
                <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                        disabled={!isEditing}
                        value={formData.gender}
                        onValueChange={setGender}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select gender"/>
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(Gender).map((gender, index) => (
                                <SelectItem key={index} value={gender}>{gender}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </form>
    )
}

export default AccountSettings;