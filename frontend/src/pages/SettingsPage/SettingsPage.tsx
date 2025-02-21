import {useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import AccountSettings from "@/components/settings/AccountSettings"
import AddressSettings from "@/components/settings/AddressSettings"
import DeleteAccountModal from "@/components/settings/DeleteAccountModal"
import PasswordSettings from "@/components/Settings/PasswordSettings.tsx";
import { getUser } from "@/api/userApi.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store.ts";
import {UserSettings} from "@/@types/user";
import {UserAddressSettings} from "@/@types/address";
import {AddressType} from "@/@types/enums/addressType.ts";
import {State} from "@/@types/enums/state.ts";
import {Country} from "@/@types/enums/country.ts";
import {Gender} from "@/@types/enums/gender.ts";

const SettingsPage: React.FC = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userData, setUserData] = useState<UserSettings>({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            username: "",
            gender: "" as Gender
        });
    const [userAddressData, setUserAddressData] = useState<UserAddressSettings>({
        [AddressType.HOME]: {
            blockName: "",
            streetName: "",
            unitNo: "",
            floorNo: "",
            postalCode: "",
            state: State.SINGAPORE,
            country: Country.SINGAPORE,
        },
        [AddressType.WORK]: {
            blockName: "",
            streetName: "",
            unitNo: "",
            floorNo: "",
            postalCode: "",
            state: State.SINGAPORE,
            country: Country.SINGAPORE,
        },
        hasWorkAddress: true
    });

    const { id } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                await getUser(id!).then((response) => {
                    setUserData({
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        phone: response.data.phoneNumber,
                        username: response.data.userTag,
                        email: response.data.email,
                        gender: response.data.gender
                    });

                    setUserAddressData({
                        [AddressType.HOME]: response.data.homeAddress,
                        [AddressType.WORK]: response.data.workAddress,
                        hasWorkAddress: response.data.workAddress !== null
                    });
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <div className="space-y-8">
                <AccountSettings userData={userData} userId={id} />
                <AddressSettings addressData={userAddressData} userId={id} />
                <PasswordSettings />
                <div>
                    <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
                        Delete Account
                    </Button>
                </div>
            </div>
            <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
        </div>
    )
}

export default SettingsPage;

