
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful</h1>
      <p className="mt-3 text-gray-600">
        Thank you! Your Premium plan will be activated once the payment is confirmed.
      </p>
      <Link href="/dashboard/vendor/subscription" className="mt-6 inline-block text-red-600 underline">
        Back to Subscription
      </Link>
    </div>
  );
}