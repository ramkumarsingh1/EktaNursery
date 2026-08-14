import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiLogOut,
  FiUsers,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";
import { logoutUser } from "../../api/authApi";
const menu = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <FiGrid />,
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: <FiPackage />,
  },
  {
    title: "Orders",
    path: "/admin/orders",
    icon: <FiShoppingBag />,
  },
  {
    title:"Customers",
    path:"/admin/customers",
    icon: <FiUsers />,
  }
];

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logout());

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
    <aside className="w-64 bg-green-700 text-white">

      <div className="border-b border-green-600 p-6">
        <h2 className="text-2xl font-bold">
          Admin Panel
        </h2>
      </div>

      <nav className="mt-6">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `mx-3 mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${isActive
                ? "bg-white text-green-700"
                : "hover:bg-green-600"
              }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}

      </nav>

      <button
        onClick={handleLogout}
        className="mx-3 mt-10 flex w-[calc(100%-24px)] items-center gap-3 rounded-lg bg-red-500 px-4 py-3 hover:bg-red-600"
      >        <FiLogOut />
        Logout
      </button>

    </aside>
  );
}