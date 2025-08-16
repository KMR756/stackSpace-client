# 🖥 Stack Space Forum

A modern Forum Web Application built with the **MERN stack** (MongoDB, Express, React, Node.js), offering a scalable and interactive platform for users to post, comment, vote, and engage in conversations. Designed with performance, responsiveness, and user experience in mind.

live link : https://stack-space-2daaf.web.app/

🔹 Features
User Authentication & Profiles

  * Sign up / Login with email & password
  * Profile pages with membership badges
  * Firebase Authentication for secure login

Forum Features

  * Create, edit, and delete posts
  * Upvote / Downvote posts (mutually exclusive)
  * Comment on posts and view all interactions
  * Filter posts by technology or category

Membership System

  * Free users: Limited posting (5 posts)
  * Gold Membership: Unlimited posting via Stripe payment
  * Display membership badge on profile

Admin Dashboard

  * View all users and their membership status
  * Promote users to admin
  * Manage reported comments
  * Make announcements

Responsive UI

  * Fully responsive layout for desktop, tablet, and mobile
  * Interactive cards with hover effects
  * Lightweight animations with Framer Motion

Tech Stack

  * **Frontend:** React, TailwindCSS, Flowbite, Framer Motion, React Query
  * **Backend:** Node.js, Express
  * **Database:** MongoDB
  * **Authentication:** Firebase Auth
  * **Payment:** Stripe (React Stripe.js)
  * **Charts & Analytics:** Recharts, Chart.js
  * **Notifications:** React Hot Toast, SweetAlert2
  * **Icons:** React Icons, Lucide React

---

Folder Structure

```
stack-space-forum/
├─ client/               # React frontend
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ layouts/
│  │  ├─ pages/
│  │  ├─ routes/
│  │  └─ App.jsx
├─ server/               # Node.js backend
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ utils/
│  └─ server.js
├─ package.json
└─ README.md
```

---

🔹 Installation

1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/stack-space-forum.git
cd stack-space-forum
```

2️⃣ Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3️⃣ Environment Variables

Create a `.env` file in both `client` and `server` directories:

*Server (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Client (.env)

```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4️⃣ Run the Application

```bash
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev
```

Frontend will run on `http://localhost:5173` by default.

## 🔹 Key Libraries

| Library                       | Purpose                      |
| ----------------------------- | ---------------------------- |
| React & React Router          | Frontend framework & routing |
| TailwindCSS & Flowbite        | Styling & UI components      |
| Firebase                      | Authentication               |
| Axios & React Query           | API handling & caching       |
| Stripe                        | Payment integration          |
| Framer Motion                 | Animations                   |
| Recharts / Chart.js           | Data visualization           |
| SweetAlert2 / React Hot Toast | Notifications & alerts       |

---





KM Rejoan Tanjim

* Email: [kmrejoantanjim@gmail.com](mailto:kmrejoantanjim@gmail.com)
* LinkedIn: [linkedin.com/in/kmrejoantanjim](https://www.linkedin.com/in/kmrejoantanjim/)


