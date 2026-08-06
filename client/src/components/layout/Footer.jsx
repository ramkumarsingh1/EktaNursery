import { Link } from "react-router-dom";
import Container from "./Container";
import {
    FiFacebook,
    FiInstagram,
    FiLinkedin,
    FiGithub,
    FiMail,
} from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="mt-20 bg-green-900 text-white">

            <Container>

                <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">

                    {/* Logo */}
                    <div>

                        <h2 className="text-3xl font-bold">
                            Ekta Nursery
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-green-100">
                            Premium quality plants, pots, seeds and gardening
                            essentials delivered to your doorstep.
                        </p>

                    </div>

                    {/* Categories */}
                    <div>

                        <h3 className="mb-4 text-lg font-semibold">
                            Categories
                        </h3>

                        <ul className="space-y-3 text-green-100">

                            <li>Plants</li>
                            <li>Pots</li>
                            <li>Seeds</li>
                            <li>Fertilizers</li>

                        </ul>

                    </div>

                    {/* Quick Links */}
                    <div>

                        <h3 className="mb-4 text-lg font-semibold">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link to="/">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/shop">
                                    Shop
                                </Link>
                            </li>

                            <li>
                                <Link to="/about">
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link to="/contact">
                                    Contact
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Support */}
                    <div>

                        <h3 className="mb-4 text-lg font-semibold">
                            Support
                        </h3>

                        <ul className="space-y-3 text-green-100">

                            <li>FAQs</li>
                            <li>Privacy Policy</li>
                            <li>Terms & Conditions</li>
                            <li>Shipping Policy</li>

                        </ul>

                    </div>

                    {/* Newsletter */}
                    <div>

                        <h3 className="mb-4 text-lg font-semibold">
                            Newsletter
                        </h3>

                        <div className="flex rounded-lg bg-white overflow-hidden">

                            <input
                                type="email"
                                placeholder="Your Email"
                                className="flex-1 px-4 py-3 text-black outline-none"
                            />

                            <button className="bg-green-700 px-5">

                                <FiMail size={20} />

                            </button>

                        </div>

                    </div>

                </div>

                <div className="flex flex-col items-center justify-between gap-5 border-t border-green-700 py-6 md:flex-row">

                    <p className="text-sm text-green-100">
                        © 2026 Ekta Nursery. All Rights Reserved.
                    </p>

                    <div className="flex gap-5">

                        <FiFacebook size={22} />
                        <FiInstagram size={22} />
                        <FiLinkedin size={22} />
                        <FiGithub size={22} />

                    </div>

                </div>

            </Container>

        </footer>
    );
}