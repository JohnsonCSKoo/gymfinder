import type React from "react";
import Header from "@/components/Layout/Header.tsx";
import {useLocation} from "react-router-dom";


interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {

    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen">
            {location.pathname === "/login" || location.pathname === "/register" ?
                <></>
                : <Header />}
            <main className="flex-grow">{children}</main>
        </div>
    )
};

export default Layout;