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
        <footer className="mt-10 bg-green-900 text-white sm:mt-16">

            <Container>

                {/* Main Footer */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-8 sm:gap-8 sm:py-10 md:grid-cols-2 lg:grid-cols-5">

                    {/* Logo */}
                    <div className="col-span-2 lg:col-span-1">

                        <h2 className="text-2xl font-bold sm:text-3xl">
                            Ekta Nursery
                        </h2>

                        <p className="mt-2 max-w-sm text-xs leading-5 text-green-100 sm:mt-3 sm:text-sm sm:leading-6">
                            Premium quality plants, pots, seeds and gardening
                            essentials delivered to your doorstep.
                        </p>

                    </div>

                    {/* Categories */}
                    <div>

                        <h3 className="mb-3 text-sm font-semibold sm:text-base">
                            Categories
                        </h3>

                        <ul className="space-y-2 text-xs text-green-100 sm:text-sm">

                            <li>
                                <Link
                                    to="/shop"
                                    className="transition hover:text-white"
                                >
                                    Plants
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shop"
                                    className="transition hover:text-white"
                                >
                                    Pots
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shop"
                                    className="transition hover:text-white"
                                >
                                    Seeds
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shop"
                                    className="transition hover:text-white"
                                >
                                    Fertilizers
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Quick Links */}
                    <div>

                        <h3 className="mb-3 text-sm font-semibold sm:text-base">
                            Quick Links
                        </h3>

                        <ul className="space-y-2 text-xs text-green-100 sm:text-sm">

                            <li>
                                <Link
                                    to="/"
                                    className="transition hover:text-white"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/shop"
                                    className="transition hover:text-white"
                                >
                                    Shop
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/about"
                                    className="transition hover:text-white"
                                >
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/contact"
                                    className="transition hover:text-white"
                                >
                                    Contact
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Support */}
                    <div>

                        <h3 className="mb-3 text-sm font-semibold sm:text-base">
                            Support
                        </h3>

                        <ul className="space-y-2 text-xs text-green-100 sm:text-sm">

                            <li>FAQs</li>
                            <li>Privacy Policy</li>
                            <li>Terms & Conditions</li>
                            <li>Shipping Policy</li>

                        </ul>

                    </div>

                    {/* Newsletter */}
                    <div className="col-span-2 lg:col-span-1">

                        <h3 className="mb-3 text-sm font-semibold sm:text-base">
                            Newsletter
                        </h3>

                        <div className="flex h-10 overflow-hidden rounded-lg bg-white sm:h-11">

                            <input
                                type="email"
                                placeholder="Your Email"
                                className="min-w-0 flex-1 px-3 text-sm text-black outline-none"
                            />

                            <button
                                type="button"
                                className="flex w-11 items-center justify-center bg-green-700 transition hover:bg-green-800"
                            >
                                <FiMail size={18} />
                            </button>

                        </div>

                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-green-700 py-4 sm:py-5 md:flex-row">

                    <p className="text-center text-[11px] text-green-100 sm:text-sm">
                        © 2026 Ekta Nursery. All Rights Reserved.
                    </p>

                    <div className="flex gap-4 sm:gap-5">

                        <FiFacebook
                            size={18}
                            className="cursor-pointer transition hover:scale-110"
                        />

                        <FiInstagram
                            size={18}
                            className="cursor-pointer transition hover:scale-110"
                        />

                        <FiLinkedin
                            size={18}
                            className="cursor-pointer transition hover:scale-110"
                        />

                        <FiGithub
                            size={18}
                            className="cursor-pointer transition hover:scale-110"
                        />

                    </div>

                </div>

            </Container>

        </footer>
    );
}