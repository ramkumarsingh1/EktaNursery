import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import {
    FiX,
    FiShoppingCart,
    FiUser,
    FiHome,
    FiPackage,
    FiInfo,
    FiPhone,
    FiLogOut,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../redux/auth/authSlice";
import { logoutUser } from "../../api/authApi";
export default function MobileDrawer({
    isOpen,
    setIsOpen,
}) {
    const cartItems = useSelector((state) => state.cart.items);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const { user, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logoutUser();

            dispatch(logout());

            setIsOpen(false);

            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };
    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg p-3 transition ${isActive
            ? "bg-green-700 text-white"
            : "hover:bg-green-100"
        }`;
    return (
        <>
            {/* Overlay */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${isOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                    }`}
            />

            {/* Drawer */}
            <div
                className={`fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out ${isOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                    }`}
            >

                {/* Existing drawer content */}
                <div className="flex items-center justify-between border-b p-5">

                    <h2 className="text-2xl font-bold text-green-700">
                        Ekta Nursery
                    </h2>

                    <button onClick={() => setIsOpen(false)}>
                        <FiX size={26} />
                    </button>

                </div>

                {/* User Profile Section */}
                <div className="border-b p-5">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-green-100">

                            {user?.avatar?.url ? (

                                <img
                                    src={user.avatar.url}
                                    alt="User"
                                    className="h-full w-full object-cover"
                                />

                            ) : (

                                <FiUser
                                    size={26}
                                    className="text-green-700"
                                />

                            )}

                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800">
                                {isAuthenticated ? user.name : "Welcome, Guest"}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {isAuthenticated
                                    ? user.email
                                    : "Login to your account"}
                            </p>
                        </div>

                    </div>
                    {!isAuthenticated && (
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="mt-4 block rounded-lg bg-green-700 py-2 text-center text-white hover:bg-green-800"
                        >
                            Login / Register
                        </Link>
                    )}

                </div>

                {/* Baaki nav links waise hi rahenge */}

                <nav className="flex flex-col p-5">

                    <NavLink
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className={navLinkClass}
                    >
                        <FiHome />
                        Home
                    </NavLink>

                    <NavLink
                        to="/shop"
                        onClick={() => setIsOpen(false)}
                        className={navLinkClass}
                    >
                        <FiPackage />
                        Shop
                    </NavLink>

                    {/* Admin Only */}
                    {user?.role === "admin" && (
                        <NavLink
                            to="/admin"
                            onClick={() => setIsOpen(false)}
                            className={navLinkClass}
                        >
                            <FiPackage />
                            Admin Dashboard
                        </NavLink>
                    )}


                    {isAuthenticated && (
                        <>
                            <NavLink
                                to="/profile"
                                onClick={() => setIsOpen(false)}
                                className={navLinkClass}
                            >
                                <FiUser />
                                My Profile
                            </NavLink>

                            <NavLink
                                to="/wishlist"
                                onClick={() => setIsOpen(false)}
                                className={navLinkClass}
                            >
                                <FiHeart />
                                Wishlist
                            </NavLink>

                            <NavLink
                                to="/orders"
                                onClick={() => setIsOpen(false)}
                                className={navLinkClass}
                            >
                                <FiPackage />
                                Orders
                            </NavLink>
                        </>
                    )}

                    <NavLink
                        to="/about"
                        onClick={() => setIsOpen(false)}
                        className={navLinkClass}
                    >
                        <FiInfo />
                        About
                    </NavLink>

                    <NavLink
                        to="/contact"
                        onClick={() => setIsOpen(false)}
                        className={navLinkClass}
                    >
                        <FiPhone />
                        Contact
                    </NavLink>



                    <NavLink
                        to="/cart"
                        onClick={() => setIsOpen(false)}
                        className={navLinkClass}
                    >
                        <div className="flex items-center gap-3">
                            <FiShoppingCart />
                            Cart
                        </div>

                        {cartItems.length > 0 && (
                            <span className="rounded-full bg-white px-2 py-1 text-sm text-green-700">
                                {cartItems.reduce(
                                    (total, item) => total + item.quantity,
                                    0
                                )}
                            </span>
                        )}
                    </NavLink>
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            className="mt-6 flex w-full items-center gap-3 rounded-lg bg-red-500 p-3 text-white transition hover:bg-red-600"
                        >
                            <FiLogOut />
                            Logout
                        </button>
                    )}

                </nav>
            </div>
        </>
    );

}