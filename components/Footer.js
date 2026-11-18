
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-2xl font-bold text-red-500">PizzaHub</h3>
          <p className="mt-3 text-sm">
            Hot and fresh pizza from your favorite local shops, delivered to
            your door.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-red-400">Home</Link></li>
            <li><Link href="/menu" className="hover:text-red-400">Browse Menu</Link></li>
            <li><Link href="/signin" className="hover:text-red-400">Sign In</Link></li>
            <li><Link href="/signup" className="hover:text-red-400">Sign Up</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: support@pizzahub.com</li>
            <li>Phone: +880 1700-000000</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Follow Us</h4>
          <div className="flex items-center gap-4">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="hover:text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-sm hover:text-white">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-sm hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © 2026 PizzaHub. All rights reserved.
      </div>
    </footer>
  );
}