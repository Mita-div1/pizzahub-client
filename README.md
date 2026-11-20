
# PizzaHub — Client

PizzaHub is a pizza ordering and delivery platform where **customers** browse and order pizzas, **vendors** manage their menu and orders, and **admins** moderate the whole platform. This repository is the **Next.js frontend**.

## Links

| | Link |
|---|---|
| Live site | https://pizzahub-client-gules.vercel.app |
| Live API | https://pizzahub-server-snowy.vercel.app |
| Client repo | https://github.com/Mita-div1/pizzahub-client |
| Server repo | https://github.com/Mita-div1/pizzahub-server |

## Features

**Public**
- Home page with banner, categories, featured items, "Why Choose Us" and "How It Works"
- Menu page with search, category filter, location filter, price sorting and limit
- Item details page with vendor info
- Responsive Navbar and Footer, custom 404 page

**Customer**
- Sign up / Sign in (Better Auth)
- Place orders (delivery address, phone, date, quantity)
- My Orders with status tracking; cancel while still pending
- Duplicate order prevention

**Vendor**
- Add menu items with image upload (ImgBB)
- Manage own menu items and incoming orders (accept / reject)
- Premium subscription via Stripe Checkout (test mode)

**Admin**
- Platform statistics
- Manage users (search, role filter, block / unblock)
- Approve / reject / delete menu items
- View all payment transactions (read-only)

**Security**
- Role-based dashboards (customer / vendor / admin)
- JWT token sent with every protected API request
- Role and subscription fields cannot be changed from the client

## Tech Stack

- **Next.js 16** (App Router, JavaScript), **React**
- **Tailwind CSS v4**, **shadcn/ui**, `tw-animate-css`
- **framer-motion** (animations), **sonner** (toasts), **next-themes**
- **Better Auth** with MongoDB adapter and JWT plugin
- **MongoDB** (Atlas)
- **ImgBB** for image uploads
- Deployed on **Vercel**





## Environment Variables

Create a `.env.local` file in the project root. Only variable **names** are listed here:


MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_IMGBB_KEY=


- `BETTER_AUTH_URL` — the client URL (`http://localhost:3000` locally)
- `NEXT_PUBLIC_API_URL` — the server URL (`http://localhost:5000` locally)

## Run Locally

```bash
npm run dev


Open http://localhost:3000. Make sure the [server](https://github.com/Mita-div1/pizzahub-server) is running too.

Production build:

```bash
npm run build
npm start
```

## Challenge Implementation

**1. Search & Sort (menu page)**
The menu page sends query parameters to the server's `GET /menu-items`:

| Param | Example | Meaning |
|---|---|---|
| `search` | `?search=margherita` | Match by name |
| `category` | `?category=Veg` | Filter by category |
| `location` | `?location=Dhaka` | Filter by location |
| `sort` | `?sort=price_asc` / `price_desc` | Sort by price |
| `limit` | `?limit=6` | Number of items |

**2. JWT-protected requests**
1. User signs in with Better Auth.
2. `authClient.token()` returns a JWT containing `id`, `email` and `role`.
3. `lib/api.js` attaches it as `Authorization: Bearer <token>` on every protected call.
4. The server verifies the token and checks the role before responding.

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@pizzahub.com | Admin123 |
| Vendor | vendor@pizzahub.com | Vendor123 |

Stripe test card: `4242 4242 4242 4242`, any future date, CVC `123`.

## Author

Moumita Bala