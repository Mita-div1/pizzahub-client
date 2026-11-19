
import Link from "next/link";

export default function PaymentCancel() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>
      <p className="mt-3 text-gray-600">No charge was made.</p>
      <Link href="/dashboard/vendor/subscription" className="mt-6 inline-block text-red-600 underline">
        Try Again
      </Link>
    </div>
  );
}