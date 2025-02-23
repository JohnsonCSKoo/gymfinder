import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import {Bell, Search, PlusCircle, LogOut, Settings} from "lucide-react"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button.tsx";
import { useDispatch } from "react-redux";
import { logout } from "@/state/authSlice.ts";

// Dummy data for search results
const dummySearchResults = ["24 Hour Fitness", "Gold's Gym", "Planet Fitness", "LA Fitness", "Equinox"]

const Header: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<string[]>([])
    const [isLoggedIn, setIsLoggedIn] = useState(false) // For demo purposes
    const [notifications, setNotifications] = useState(3) // Example notification count

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        if (query.length > 0) {
            setSearchResults(dummySearchResults.filter((item) => item.toLowerCase().includes(query.toLowerCase())))
        } else {
            setSearchResults([])
        }
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        GymFinder
                    </Link>
                    <nav className="hidden md:flex space-x-4">
                        <Link to="/browse" className="text-gray-600 hover:text-primary">
                            Browse
                        </Link>
                        <Link to="/profile" className="text-gray-600 hover:text-primary">
                            Profile
                        </Link>
                    </nav>
                </div>


                <div className="relative w-1/3">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search gyms..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-10"
                    />
                    {searchResults.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                            {searchResults.slice(0, 5).map((result, index) => (
                                <div key={index} className="p-2 pl-4 hover:bg-gray-100 cursor-pointer">
                                    {result}
                                </div>
                            ))}
                            <Link href="/search" className="block p-2 text-center text-primary hover:bg-gray-100">
                                Show all results
                            </Link>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        className="relative p-2 text-gray-600 hover:text-primary">
                        <Bell className="h-6 w-6" />
                        {notifications > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                                {notifications}
                            </span>
                        )}
                    </Button>
                    <Button
                        onClick={() => navigate("/settings")}
                        variant="ghost"
                        className="relative p-2 text-gray-600 hover:text-primary">
                        <Settings className="h-6 w-6" />
                    </Button>
                    <Button
                        onClick={() => navigate("/post")}
                        variant="outline"
                        className="flex items-center space-x-1">
                        <PlusCircle className="h-5 w-5" />
                        <span>New Post</span>
                    </Button>
                    <Button
                        variant="default"
                        className="flex items-center space-x-1"
                        onClick={handleLogout}>
                        <LogOut className="h-5 w-5" />
                        <span>Sign out</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header;