"use client"

import { useState } from "react"
import {Link} from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Dummy data for search results
const dummySearchResults = ["24 Hour Fitness", "Gold's Gym", "Planet Fitness", "LA Fitness", "Equinox"]

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<string[]>([])
    const [isLoggedIn, setIsLoggedIn] = useState(false) // For demo purposes

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        if (query.length > 0) {
            setSearchResults(dummySearchResults.filter((item) => item.toLowerCase().includes(query.toLowerCase())))
        } else {
            setSearchResults([])
        }
    }

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-primary">
                    GymFinder
                </Link>

                <div className="relative w-1/3">
                    <Input
                        type="search"
                        placeholder="Search gyms..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full"
                    />
                    {searchResults.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                            {searchResults.slice(0, 5).map((result, index) => (
                                <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                                    {result}
                                </div>
                            ))}
                            <Link to="/search" className="block p-2 text-center text-primary hover:bg-gray-100">
                                Show all results
                            </Link>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Link to="/home">Home</Link>
                            <Link to="/gyms">Gyms</Link>
                            <Button variant="outline">New Post</Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/avatars/01.png" alt="@username" />
                                            <AvatarFallback>UN</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuItem>
                                        <Link to="/account">Account</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Button variant="ghost" onClick={() => setIsLoggedIn(false)}>
                                            Sign out
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" onClick={() => setIsLoggedIn(true)}>
                                Sign In
                            </Button>
                            <Button>Sign Up</Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;