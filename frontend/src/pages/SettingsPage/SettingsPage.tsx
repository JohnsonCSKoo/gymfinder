import { useState } from "react"
import { Button } from "@/components/ui/button"
import AccountSettings from "@/components/settings/AccountSettings"
import AddressSettings from "@/components/settings/AddressSettings"
import DeleteAccountModal from "@/components/settings/DeleteAccountModal"
import PasswordSettings from "@/components/Settings/PasswordSettings.tsx";

const SettingsPage: React.FC = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <div className="space-y-8">
                <AccountSettings />
                <PasswordSettings />
                <AddressSettings />
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

