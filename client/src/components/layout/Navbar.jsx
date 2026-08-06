import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import Container from "./Container";
import { navLinks } from "../../constants/navLinks";
import { useSelector } from "react-redux";
import MobileDrawer from "./MobileDrawer";
import SearchOverlay from "./SearchOverlay";
import { FiHeart } from "react-icons/fi";
import { logout } from "../../redux/auth/authSlice";
import { logoutUser } from "../../api/authApi";
import { useDispatch } from "react-redux";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navLinkClass = ({ isActive }) =>
    `transition-colors ${isActive
      ? "font-semibold text-green-700"
      : "font-medium text-gray-700 hover:text-green-700"
    }`;
  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logout());

      setIsUserMenuOpen(false);

      alert("Logout Successful");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Logout Failed"
      );
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-green-700"
          >
            Ekta Nursery
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                className={navLinkClass}
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Search */}
            <div className="relative">

              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />

              <input
                type="text"
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    keyword.trim()
                  ) {
                    navigate(
                      `/shop?search=${encodeURIComponent(keyword)}`
                    );
                  }
                }}
                placeholder="Search plants..."
                className="w-72 rounded-full border border-gray-300 py-2 pl-10 pr-4 outline-none transition focus:border-green-700"
              />

            </div>

            <Link
              to="/wishlist"
              className="relative cursor-pointer"
            >
              <FiHeart size={22} />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative"
            >
              <FiShoppingCart size={22} />

              {cartItems.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              )}
            </Link>

            {/* User */}
            {/* User */}
            <div className="relative">

              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt="User"
                    className="h-10 w-10 rounded-full border-2 border-green-600 object-cover"
                  />
                ) : (
                  <FiUser size={22} />
                )}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border bg-white shadow-xl">

                  {!isAuthenticated ? (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-5 py-3 hover:bg-gray-100"
                      >
                        Login
                      </Link>

                      <Link
                        to="/register"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-5 py-3 hover:bg-gray-100"
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 border-b p-4">

                        {user?.avatar?.url ? (

                          <img
                            src={user.avatar.url}
                            alt="User"
                            className="h-12 w-12 rounded-full object-cover"
                          />

                        ) : (

                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <FiUser className="text-green-700" />
                          </div>

                        )}

                        <div>

                          <h3 className="font-semibold">
                            {user?.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {user?.email}
                          </p>

                        </div>

                      </div>

                      {user?.role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-5 py-3 hover:bg-gray-100"
                        >
                          Admin Dashboard
                        </Link>
                      )}

                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-5 py-3 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-5 py-3 hover:bg-gray-100"
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-5 py-3 hover:bg-gray-100"
                      >
                        Wishlist
                      </Link>

                      <div className="border-t">

                        <button
                          onClick={handleLogout}
                          className="w-full px-5 py-3 text-left text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>

                      </div>
                    </>
                  )}

                </div>
              )}

            </div>

          </div>

          {/* Mobile Menu */}
          {/* Mobile Right Icons */}
          <div className="flex items-center gap-4 lg:hidden">

            <button onClick={() => setIsSearchOpen(true)}>
              <FiSearch size={22} />
            </button>

            <Link
              to="/cart"
              className="relative"
            >
              <FiShoppingCart size={22} />

              {cartItems.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(true)}
            >
              <FiMenu size={28} />
            </button>

          </div>

        </div>
      </Container>
      <SearchOverlay
        isOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />

      <MobileDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </header>
  );
}
