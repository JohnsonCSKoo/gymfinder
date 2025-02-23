import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface UserTypeSwitchProps {
    isGymOwner: boolean
    setIsGymOwner: (value: boolean) => void
}

const UserTypeSwitch: React.FC<UserTypeSwitchProps> = ({ isGymOwner, setIsGymOwner }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label htmlFor="user-type" className="text-base font-semibold">
                    I am a:
                </Label>
                <div className="flex items-center space-x-2">
                    <span className={`text-sm ${!isGymOwner ? "font-bold" : ""}`}>User</span>
                    <Switch id="user-type" checked={isGymOwner} onCheckedChange={setIsGymOwner} className="text-[0px]" />
                    <span className={`text-sm ${isGymOwner ? "font-bold" : ""}`}>Gym Owner</span>
                </div>
            </div>
            <div className="text-sm text-muted-foreground">
                {isGymOwner ? (
                    <p>As a Gym Owner, you'll be able to manage your gym and connect with members.</p>
                ) : (
                    <p>As a User, you'll be able to discover gyms and connect with the community.</p>
                )}
            </div>
        </div>
    )
}

export default UserTypeSwitch;
