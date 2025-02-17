import { useState } from "react"
import { Search, ThumbsUp, MessageCircle, Share2 } from "lucide-react"
import Header from "../components/Header"

// Mock data
const friends = [
    { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: 2, name: "Jane Smith", avatar: "https://i.pravatar.cc/100?img=2" },
    // Add more friends...
]

const groups = [
    { id: 1, name: "Fitness Enthusiasts" },
    { id: 2, name: "Yoga Lovers" },
    // Add more groups...
]

const recentGyms = [
    { id: 1, name: "PowerFit Gym" },
    { id: 2, name: "Zen Yoga Studio" },
    // Add more gyms...
]

const posts = [
    {
        id: 1,
        author: { name: "John Doe", avatar: "https://i.pravatar.cc/100?img=1" },
        content: "Just finished an amazing workout at PowerFit Gym!",
        image: "https://source.unsplash.com/random/800x600?gym",
        likes: 15,
        comments: [
            { id: 1, author: "Jane Smith", content: "Great job!" },
            // Add more comments...
        ],
    },
    // Add more posts...
]

const events = [
    { id: 1, name: "Yoga in the Park", date: "2023-06-15" },
    { id: 2, name: "Marathon Training", date: "2023-06-20" },
    // Add more events...
]

const HomePage: React.FC = () => {
    const [friendSearch, setFriendSearch] = useState("")

    return (
        <>
            <div className="container mx-auto px-4 py-8 flex">
                {/* Left Sidebar - 20% */}
                <div className="w-1/5 pr-4">
                    <div className="bg-white rounded-lg shadow mb-6 p-4">
                        <div className="flex items-center space-x-4 mb-4">
                            <img src="https://i.pravatar.cc/100?img=1" alt="Your Avatar" className="w-12 h-12 rounded-full" />
                            <div>
                                <h2 className="font-bold">Your Name</h2>
                                <p className="text-sm text-gray-500">@yourusername</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Friends</h3>
                            <div className="relative mb-2">
                                <input
                                    type="text"
                                    placeholder="Search friends..."
                                    className="w-full py-1 px-3 pr-8 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={friendSearch}
                                    onChange={(e) => setFriendSearch(e.target.value)}
                                />
                                <Search className="absolute right-2 top-1.5 h-4 w-4 text-gray-400" />
                            </div>
                            <ul className="space-y-2 max-h-40 overflow-y-auto">
                                {friends
                                    .filter((friend) => friend.name.toLowerCase().includes(friendSearch.toLowerCase()))
                                    .map((friend) => (
                                        <li key={friend.id} className="flex items-center space-x-2">
                                            <img
                                                src={friend.avatar || "/placeholder.svg"}
                                                alt={friend.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span>{friend.name}</span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Group Chats</h3>
                            <ul className="space-y-1">
                                {groups.map((group) => (
                                    <li key={group.id}>{group.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="font-semibold mb-2">Recent Gyms</h3>
                        <ul className="space-y-1">
                            {recentGyms.map((gym) => (
                                <li key={gym.id}>{gym.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content - 60% */}
                <div className="w-3/5 px-4 space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <img
                                    src={post.author.avatar || "/placeholder.svg"}
                                    alt={post.author.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <h3 className="font-semibold">{post.author.name}</h3>
                                    <p className="text-sm text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                            <p className="mb-4">{post.content}</p>
                            {post.image && (
                                <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full rounded-lg mb-4" />
                            )}
                            <div className="flex justify-between items-center">
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-primary">
                                    <ThumbsUp className="h-5 w-5" />
                                    <span>{post.likes}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-primary">
                                    <MessageCircle className="h-5 w-5" />
                                    <span>{post.comments.length} Comments</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-primary">
                                    <Share2 className="h-5 w-5" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Sidebar - 20% */}
                <div className="w-1/5 pl-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="font-semibold mb-4">Upcoming Events</h3>
                        <ul className="space-y-3">
                            {events.map((event) => (
                                <li key={event.id} className="border-b pb-2 last:border-b-0">
                                    <h4 className="font-medium">{event.name}</h4>
                                    <p className="text-sm text-gray-500">{event.date}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;