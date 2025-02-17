import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold mb-4">About</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
                            <li>
                                <Link to="/careers">Careers</Link>
                            </li>
                            <li>
                                <Link to="/press">Press</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/help">Help Center</Link>
                            </li>
                            <li>
                                <Link to="/safety">Safety Information</Link>
                            </li>
                            <li>
                                <Link to="/cancellation">Cancellation Options</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/terms">Terms of Service</Link>
                            </li>
                            <li>
                                <Link to="/privacy">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="/cookie">Cookie Policy</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Follow Us</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://facebook.com">Facebook</a>
                            </li>
                            <li>
                                <a href="https://twitter.com">Twitter</a>
                            </li>
                            <li>
                                <a href="https://instagram.com">Instagram</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm text-gray-500">© 2023 GymFinder. All rights reserved.</div>
            </div>
        </footer>
    )
}

export default Footer;

