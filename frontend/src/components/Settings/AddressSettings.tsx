import React, {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {AddressType} from "@/@types/enums/addressType.ts";
import {UpdateAddressDto, UserAddressSettings} from "@/@types/address";
import {State} from "@/@types/enums/state.ts";
import {Country} from "@/@types/enums/country.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {ToastAction} from "@/components/ui/toast.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {updateUserAddress} from "@/api/userApi.ts";
import {getEnumKey} from "@/lib/utils.ts";

interface AddressSettingsProps {
    addressData?: UserAddressSettings,
    userId: string | null
}

const AddressSettings: React.FC<AddressSettingsProps> = ({addressData, userId}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isWorkAddressEnabled, setIsWorkAddressEnabled] = useState(false);
    const [originalData, setOriginalData] = useState<UserAddressSettings>(addressData);
    const [formData, setFormData] = useState<UserAddressSettings>(addressData);
    const [error, setError] = useState<string>("");

    const { toast } = useToast();

    useEffect(() => {
        if (addressData) {
            const formData: UserAddressSettings = {
                [AddressType.HOME]: {
                    blockName: addressData[AddressType.HOME]?.blockName || "",
                    streetName: addressData[AddressType.HOME]?.streetName || "",
                    unitNo: addressData[AddressType.HOME]?.unitNo || "",
                    floorNo: addressData[AddressType.HOME]?.floorNo || "",
                    postalCode: addressData[AddressType.HOME]?.postalCode || "",
                    state: addressData[AddressType.HOME]?.state || State.SINGAPORE,
                    country: addressData[AddressType.HOME]?.country || Country.SINGAPORE,
                },
                [AddressType.WORK]: {
                    blockName: addressData[AddressType.WORK]?.blockName || "",
                    streetName: addressData[AddressType.WORK]?.streetName || "",
                    unitNo: addressData[AddressType.WORK]?.unitNo || "",
                    floorNo: addressData[AddressType.WORK]?.floorNo || "",
                    postalCode: addressData[AddressType.WORK]?.postalCode || "",
                    state: addressData[AddressType.WORK]?.state || State.SINGAPORE,
                    country: addressData[AddressType.WORK]?.country || Country.SINGAPORE,
                },
                hasWorkAddress: addressData.hasWorkAddress
            };
            setIsWorkAddressEnabled(addressData.hasWorkAddress);
            setFormData(formData);
            setOriginalData(formData);
        }
    }, [addressData]);

    const handleToggleEditing = () => {
        setIsEditing(prevState => {
            if (prevState) {
                setFormData(originalData);
                setError("");
            }
            return !prevState;
        });
    }

    const handleInputChange = (type: AddressType.HOME | AddressType.WORK, field: string, value: string | State | Country) => {

        setFormData({
            ...formData,
            [type]: {
                ...formData[type],
                [field]: value,
            },
        })
    }

    const handleSave = async () => {

        // validate address data
        if (formData[AddressType.HOME] === null ||
            formData[AddressType.HOME].blockName === "" ||
            formData[AddressType.HOME].streetName === "" ||
            formData[AddressType.HOME].postalCode === "" ||
            formData[AddressType.HOME].state === null ||
            formData[AddressType.HOME].country === null) {
            setError("Home address fields are required.");
            return;
        }

        if (isWorkAddressEnabled && (
            formData[AddressType.WORK] === null ||
            formData[AddressType.WORK].blockName === "" ||
            formData[AddressType.WORK].streetName === "" ||
            formData[AddressType.WORK].postalCode === "" ||
            formData[AddressType.WORK].state === null ||
            formData[AddressType.WORK].country === null)) {
            setError("Work address fields are required.");
            return;
        }

        const updatedAddress: UpdateAddressDto = {
            homeAddress: {
                blockName: formData[AddressType.HOME]?.blockName || "",
                    streetName: formData[AddressType.HOME]?.streetName || "",
                    unitNo: formData[AddressType.HOME]?.unitNo || "",
                    floorNo: formData[AddressType.HOME]?.floorNo || "",
                    postalCode: formData[AddressType.HOME]?.postalCode || "",
                    state: getEnumKey(State, formData[AddressType.HOME]?.state || State.SINGAPORE),
                    country: getEnumKey(Country, formData[AddressType.HOME]?.country || Country.SINGAPORE),
            },
            workAddress: {
                blockName: formData[AddressType.WORK]?.blockName || "",
                    streetName: formData[AddressType.WORK]?.streetName || "",
                    unitNo: formData[AddressType.WORK]?.unitNo || "",
                    floorNo: formData[AddressType.WORK]?.floorNo || "",
                    postalCode: formData[AddressType.WORK]?.postalCode || "",
                    state: getEnumKey(State, formData[AddressType.WORK]?.state || State.SINGAPORE),
                    country: getEnumKey(Country, formData[AddressType.WORK]?.country || Country.SINGAPORE),
            },
            hasWorkAddress: isWorkAddressEnabled
        };

        await updateUserAddress(userId!, updatedAddress)
            .then(() => {
                toast({
                    title: "Address updated successfully",
                    action: <ToastAction altText="Dismiss">Dismiss</ToastAction>
                });
                setIsEditing(false);
            }).catch((error) => {
                console.error("Error updating address:", error);
                toast({
                    title: "Error updating address",
                    description: "An error occurred while updating address. Please try again.",
                    action: <ToastAction altText="Dismiss">Dismiss</ToastAction>
                });
            });
    }

    const renderAddressFields = (type: AddressType.HOME | AddressType.WORK) => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor={`${type}BlockName`}>
                        Block Name<span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id={`${type}BlockName`}
                        value={formData[type]!.blockName}
                        onChange={(e) => handleInputChange(type, "blockName", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <Label htmlFor={`${type}StreetName`}>
                        Street Name<span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id={`${type}StreetName`}
                        value={formData[type]!.streetName}
                        onChange={(e) => handleInputChange(type, "streetName", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor={`${type}UnitNumber`}>Unit No.</Label>
                    <Input
                        id={`${type}UnitNumber`}
                        value={formData[type]!.unitNo}
                        onChange={(e) => handleInputChange(type, "unitNo", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <Label htmlFor={`${type}FloorNumber`}>Floor No.</Label>
                    <Input
                        id={`${type}FloorNumber`}
                        value={formData[type]!.floorNo}
                        onChange={(e) => handleInputChange(type, "floorNo", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor={`${type}PostalCode`}>
                    Postal Code<span className="text-red-500">*</span>
                </Label>
                <Input
                    id={`${type}PostalCode`}
                    value={formData[type]!.postalCode}
                    onChange={(e) => handleInputChange(type, "postalCode", e.target.value)}
                    disabled={!isEditing}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor={`${type}State`}>
                        State<span className="text-red-500">*</span>
                    </Label>
                    <Select
                        disabled={!isEditing}
                        value={formData[type]!.state}
                        onValueChange={(value: State) => handleInputChange(type, "state", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Object.values(State).map((state) => (
                                    <SelectItem key={state} value={state}>
                                        {state}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor={`${type}Country`}>
                        Country<span className="text-red-500">*</span>
                    </Label>
                    <Select
                        disabled={!isEditing}
                        value={formData[type]!.country}
                        onValueChange={(value: Country) => handleInputChange(type, "country", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Object.values(Country).map((country) => (
                                    <SelectItem key={country} value={country}>
                                        {country}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Address</h2>
                <div>
                    {isEditing && (
                        <Button className="mr-4" onClick={handleSave}>
                            Save
                        </Button>
                    )}
                    <Button
                        onClick={handleToggleEditing}
                        variant={isEditing ? "outline" : "default"}
                    >
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                </div>
            </div>
            <Tabs defaultValue={AddressType.HOME}>
                <TabsList>
                    <TabsTrigger value={AddressType.HOME}>Home</TabsTrigger>
                    <TabsTrigger value={AddressType.WORK}>Work</TabsTrigger>
                </TabsList>
                <Label className="flex items-center space-x-2 mt-3">
                    <Checkbox
                        checked={isWorkAddressEnabled}
                        onCheckedChange={() => {
                            setIsWorkAddressEnabled(!isWorkAddressEnabled);
                        }}
                        disabled={!isEditing}
                        className="mr-2 focus:outline-none"
                    />
                    Enable work address
                </Label>
                <TabsContent value={AddressType.HOME}>{renderAddressFields(AddressType.HOME)}</TabsContent>
                <TabsContent value={AddressType.WORK}>{renderAddressFields(AddressType.WORK)}</TabsContent>
            </Tabs>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
    )
}

export default AddressSettings;