
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-6xl font-extrabold text-red-600">404</h1>
      <p className="mt-3 text-lg text-gray-700">Oops! This page could not be found.</p>
      <Link href="/" className="mt-6 inline-block rounded-md bg-red-600 px-6 py-3 text-white hover:bg-red-700">
        Back to Home
      </Link>
    </div>
  );
}