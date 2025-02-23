import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SearchSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className={`bg-white shadow-md transition-all duration-300 ${isCollapsed ? "w-12" : "w-80"}`}>
            <Button variant="ghost" className="w-full text-left p-4" onClick={() => setIsCollapsed(!isCollapsed)}>
                {isCollapsed ? ">" : "Filters <"}
            </Button>
            {!isCollapsed && (
                <div className="p-4 space-y-6">
                    <div>
                        <Label htmlFor="search-query">Search Query</Label>
                        <Input id="search-query" placeholder="Enter keywords..." />
                    </div>

                    <div>
                        <Label htmlFor="distance">Distance</Label>
                        <Select>
                            <SelectTrigger id="distance">
                                <SelectValue placeholder="Select distance" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="500m">{"<"}500m</SelectItem>
                                <SelectItem value="1km">{"<"}1km</SelectItem>
                                <SelectItem value="2km">{"<"}2km</SelectItem>
                                <SelectItem value="5km">{"<"}5km</SelectItem>
                                <SelectItem value="none">No limit</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Price Range</Label>
                        <Slider defaultValue={[20, 80]} max={100} step={1} />
                        <div className="flex justify-between mt-2">
                            <Input type="number" placeholder="Min" className="w-20" />
                            <Input type="number" placeholder="Max" className="w-20" />
                        </div>
                    </div>

                    <div>
                        <Label>Opening Hours</Label>
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                            <div key={day} className="flex items-center space-x-2">
                                <Checkbox id={`day-${day}`} />
                                <Label htmlFor={`day-${day}`}>{day}</Label>
                            </div>
                        ))}
                        <Input type="time" className="mt-2" />
                    </div>

                    <div>
                        <Label>Facilities</Label>
                        {["Pool", "Sauna", "Parking", "Lockers"].map((facility) => (
                            <div key={facility} className="flex items-center space-x-2">
                                <Checkbox id={`facility-${facility}`} />
                                <Label htmlFor={`facility-${facility}`}>{facility}</Label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <Label>Equipment</Label>
                        {["Treadmills", "Weights", "Yoga Mats", "Bikes"].map((equipment) => (
                            <div key={equipment} className="flex items-center space-x-2">
                                <Checkbox id={`equipment-${equipment}`} />
                                <Label htmlFor={`equipment-${equipment}`}>{equipment}</Label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <Label>Services</Label>
                        {["Personal Training", "Group Classes", "Nutrition Advice"].map((service) => (
                            <div key={service} className="flex items-center space-x-2">
                                <Checkbox id={`service-${service}`} />
                                <Label htmlFor={`service-${service}`}>{service}</Label>
                            </div>
                        ))}
                    </div>

                    <Button className="w-full">Search</Button>
                </div>
            )}
        </div>
    )
}

export default SearchSidebar;