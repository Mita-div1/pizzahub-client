
export const metadata = { title: "Privacy Policy | PizzaHub" };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        PizzaHub is a pizza ordering and delivery platform built as a learning
        project. This page explains what information we collect and how we use it.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information we collect</h2>
      <p className="mb-4">
        When you sign up or sign in (with email and password, or with Google),
        we store your name, email address and profile picture. When you place an
        order, we store your order details and delivery address.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">How we use it</h2>
      <p className="mb-4">
        We use your information only to create your account, sign you in,
        process your orders and show your dashboard. We do not sell or share
        your data with third parties, except payment processing through Stripe.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Google sign-in</h2>
      <p className="mb-4">
        If you use Google sign-in, we only receive your name, email address and
        profile picture from Google.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p>For questions, contact: abmoumitabala12@gmail.com</p>
    </div>
  );
}