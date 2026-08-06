import { FiUser } from "react-icons/fi";

export default function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">

      <h1 className="text-2xl font-bold">
        Ekta Nursery Admin
      </h1>

      <div className="flex items-center gap-3">
        <FiUser size={22} />
        <span className="font-medium">
          Admin
        </span>
      </div>

    </header>
  );
}