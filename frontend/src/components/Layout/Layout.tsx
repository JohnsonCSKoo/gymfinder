import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
import OldHeader from "./OldHeader.tsx"
import Footer from "./Footer"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//     title: "GymFinder",
//     description: "Find your perfect gym",
// }

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <html lang="en">
        <body>
        <div className="flex flex-col min-h-screen">
            <OldHeader />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
        </body>
        </html>
    )
};

export default Layout;