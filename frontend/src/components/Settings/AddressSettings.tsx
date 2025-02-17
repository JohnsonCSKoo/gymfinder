import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const AddressSettings: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [addressData, setAddressData] = useState({
        home: {
            blockName: "123",
            streetName: "Main St",
            unitNumber: "#01",
            floorNumber: "01",
            postalCode: "12345",
            state: "California",
            country: "United States",
        },
        work: {
            blockName: "456",
            streetName: "Business Ave",
            unitNumber: "#10",
            floorNumber: "20",
            postalCode: "67890",
            state: "New York",
            country: "United States",
        },
    })

    const handleInputChange = (type: "home" | "work", field: string, value: string) => {
        setAddressData({
            ...addressData,
            [type]: {
                ...addressData[type],
                [field]: value,
            },
        })
    }

    const handleSave = () => {
        // Here you would typically send the data to your backend
        console.log("Saving address data:", addressData)
        setIsEditing(false)
    }

    const renderAddressFields = (type: "home" | "work") => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor={`${type}BlockName`}>Block Name</Label>
                    <Input
                        id={`${type}BlockName`}
                        value={addressData[type].blockName}
                        onChange={(e) => handleInputChange(type, "blockName", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <Label htmlFor={`${type}StreetName`}>Street Name</Label>
                    <Input
                        id={`${type}StreetName`}
                        value={addressData[type].streetName}
                        onChange={(e) => handleInputChange(type, "streetName", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor={`${type}UnitNumber`}>Unit Number</Label>
                    <Input
                        id={`${type}UnitNumber`}
                        value={addressData[type].unitNumber}
                        onChange={(e) => handleInputChange(type, "unitNumber", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <Label htmlFor={`${type}FloorNumber`}>Floor Number</Label>
                    <Input
                        id={`${type}FloorNumber`}
                        value={addressData[type].floorNumber}
                        onChange={(e) => handleInputChange(type, "floorNumber", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor={`${type}PostalCode`}>Postal Code</Label>
                <Input
                    id={`${type}PostalCode`}
                    value={addressData[type].postalCode}
                    onChange={(e) => handleInputChange(type, "postalCode", e.target.value)}
                    disabled={!isEditing}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor={`${type}State`}>State</Label>
                    <Select
                        disabled={!isEditing}
                        value={addressData[type].state}
                        onValueChange={(value) => handleInputChange(type, "state", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="California">California</SelectItem>
                            <SelectItem value="New York">New York</SelectItem>
                            <SelectItem value="Texas">Texas</SelectItem>
                            {/* Add more states as needed */}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor={`${type}Country`}>Country</Label>
                    <Select
                        disabled={!isEditing}
                        value={addressData[type].country}
                        onValueChange={(value) => handleInputChange(type, "country", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            {/* Add more countries as needed */}
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
                        onClick={() => setIsEditing(!isEditing)}
                        variant={isEditing ? "outline" : "default"}
                    >
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                </div>
            </div>
            <Tabs defaultValue="home">
                <TabsList>
                    <TabsTrigger value="home">Home</TabsTrigger>
                    <TabsTrigger value="work">Work</TabsTrigger>
                </TabsList>
                <TabsContent value="home">{renderAddressFields("home")}</TabsContent>
                <TabsContent value="work">{renderAddressFields("work")}</TabsContent>
            </Tabs>
        </div>
    )
}

export default AddressSettings;