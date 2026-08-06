import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-2">Page Not Found</p>

      <Link
        to="/"
        className="mt-5 text-green-700 font-semibold"
      >
        Go Home
      </Link>
    </div>
  );
}