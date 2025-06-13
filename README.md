# Investment Website Write-Up for Front-End Development

## Overview

This document outlines the requirements and specifications for developing the front-end of an investment website using React. The back-end is developed with Node.js, and the front-end developer should integrate with the provided APIs to deliver a user-friendly, responsive, and secure interface. The website allows users to create accounts, log in, manage their wallets, purchase investment packages, fund their wallets using USDT (BEP-20), and view their earnings history. The goal is to create a modern, intuitive, and visually appealing interface that enhances user experience.

---

## Features and User Flow

### 1. User Registration

**Purpose:** Allow new users to create an account.

**Fields:**

- Full Name (text, required)
- Phone Number (text, required, with country code picker)
- Email Address (email, required, validated format)
- Password (password, required, min 8 characters, with strength indicator)
- Country (dropdown, required, populated with country list)

**UI Components:**

- Form with input fields and labels.
- Country code picker for phone (e.g., using a library like `react-phone-input-2`).
- Password strength meter (visual feedback).
- Submit button ("Sign Up").
- Link to Login page ("Already have an account? Log in").

**Validation:**

- Client-side validation for required fields, email format, password strength.
- Display error messages below fields for invalid inputs.

**API Integration:**

- `POST /api/register` with payload `{ fullName, phone, email, password, country }`.
- Handle success (redirect to Login page with success message).
- Handle errors (display error messages, e.g., "Email already exists").

**Design Notes:**

- Responsive form layout (mobile and desktop).
- Clean, modern design with Tailwind CSS for styling.
- Include a subtle background image or gradient.

---

### 2. User Login

**Purpose:** Allow registered users to access their dashboard.

**Fields:**

- Email Address (email, required)
- Password (password, required)

**UI Components:**

- Form with input fields and labels.
- "Show/Hide" password toggle.
- Submit button ("Log In").
- Link to Register page ("Don't have an account? Sign Up").
- "Forgot Password" link (future feature, can be a placeholder).

**Validation:**

- Client-side validation for required fields and email format.
- Display error messages for invalid inputs.

**API Integration:**

- `POST /api/login` with payload `{ email, password }`.
- On success, store JWT token in localStorage and redirect to Dashboard.
- On error, display message (e.g., "Invalid credentials").

**Design Notes:**

- Centered form with minimalistic design.
- Add a loading spinner on submit.

---

### 3. User Dashboard

**Purpose:** Central hub for users to view and manage their investment activities.

**Components:**

- **Header:** User’s name, logout button, and navigation menu (Dashboard, Wallet, Packages, Earnings History, Profile).
- **Wallet Overview:**
  - Display wallet balance (in USDT).
  - "Fund Wallet" button (opens modal for funding).
  - "Withdraw" button (placeholder for future feature).
- **Investment Summary:**
  - Total Invested Amount.
  - Total Earnings to Date.
  - Active Packages (list with package name and status).
- **Quick Actions:**
  - Button to "Buy Package" (redirects to Packages page).
  - Button to view "Earnings History" (redirects to Earnings History page).

**API Integration:**

- `GET /api/user/dashboard` to fetch wallet balance, total invested, total earnings, and active packages.
- Handle loading states and errors (e.g., "Failed to load data").

**Design Notes:**

- Card-based layout for each section (Wallet, Investment Summary, Quick Actions).
- Use charts (e.g., `react-chartjs-2`) for visualizing earnings trends.
- Responsive grid layout for cards.

---

### 4. Wallet Funding

**Purpose:** Allow users to fund their wallet using USDT (BEP-20).

**Modal Components:**

- Display unique wallet address (BEP-20) for the user to send USDT.
- QR code for wallet address (use `qrcode.react`).
- Copy button for wallet address.
- Instructions: "Send USDT (BEP-20) to this address. Funds will reflect after 3 confirmations."
- Transaction status checker (input field for TXID, button to verify).

**API Integration:**

- `GET /api/wallet/address` to fetch user’s BEP-20 wallet address.
- `POST /api/wallet/verify` with payload `{ txid }` to check transaction status.
- On success, update wallet balance and show confirmation message.

**Design Notes:**

- Modal with clean design, centered content.
- Ensure QR code is scannable on mobile devices.

---

### 5. Investment Packages

**Purpose:** Allow users to purchase investment packages with different ROI rates.

**Packages:**

- Package 1: 2% ROI, $100 subscription fee.
- Package 2: 5% ROI, $500 subscription fee.
- Package 3: 9% ROI, $1000 subscription fee.

**UI Components:**

- Package cards displaying:
  - Package name (e.g., "Starter", "Pro", "Elite").
  - ROI percentage.
  - Subscription amount.
  - "Buy Now" button.
- Confirmation modal on "Buy Now":
  - Show package details and wallet balance.
  - Confirm button to proceed with purchase.

**API Integration:**

- `GET /api/packages` to fetch package details (optional, if dynamic).
- `POST /api/packages/buy` with payload `{ packageId }`.
- Handle success (show confirmation, refresh dashboard).
- Handle errors (e.g., "Insufficient wallet balance").

**Design Notes:**

- Highlight the most popular package (e.g., Package 2) with a badge.
- Use a grid layout for package cards.

---

### 6. Earnings History

**Purpose:** Display a history of user earnings from purchased packages.

**UI Components:**

- Table with columns: Date, Package Name, Earnings Amount, Status (e.g., Credited).
- Pagination controls (if many records).
- Filter by date range (optional, using `react-datepicker`).

**API Integration:**

- `GET /api/earnings` with query params `{ page, limit, startDate, endDate }`.
- Handle loading states and empty data (e.g., "No earnings yet").

**Design Notes:**

- Responsive table with mobile-friendly design (stacked rows on small screens).
- Export button (future feature, placeholder).

---

### 7. User Profile

**Purpose:** Allow users to view and update their account details.

**Fields:**

- Full Name (editable).
- Phone Number (editable).
- Email Address (read-only).
- Country (editable, dropdown).
- Password (button to change, opens modal with old/new password fields).

**API Integration:**

- `GET /api/user/profile` to fetch user details.
- `PATCH /api/user/profile` with payload `{ fullName, phone, country }`.
- `POST /api/user/password` with payload `{ oldPassword, newPassword }`.

**Design Notes:**

- Form layout similar to Registration page.
- Success/error messages for updates.

---

### 8. Logout

**Purpose:** Allow users to log out securely.

**UI Component:** Logout button in header.

**API Integration:**

- `POST /api/logout` (optional, for server-side token invalidation).
- Clear localStorage and redirect to Login page.

---

## Technical Requirements

### Framework and Libraries

- **React:** Use create-react-app or Vite for setup.
- **Routing:** `react-router-dom` for navigation between pages.
- **State Management:** React Context or Redux for managing user auth and data.
- **HTTP Client:** axios for API requests.
- **Styling:** Tailwind CSS via CDN (`https://cdn.tailwindcss.com`).
- **Additional Libraries:**
  - `react-phone-input-2` for phone input.
  - `qrcode.react` for wallet address QR code.
  - `react-chartjs-2` and `chart.js` for charts.
  - `react-datepicker` for date filters.
  - `react-hot-toast` for toast notifications.

---

### API Integration

- **Base URL:** Provided by back-end team (e.g., `https://api.investmentwebsite.com`).
- **Authentication:** Include JWT token in `Authorization: Bearer <token>` header for protected routes.
- **Error Handling:** Display user-friendly messages for 400, 401, 403, 500 errors.
- **Loading States:** Show spinners or skeletons during API calls.

---

### Security

- Store JWT token in localStorage or httpOnly cookies (coordinate with back-end).
- Sanitize user inputs to prevent XSS (use libraries like dompurify if needed).
- Use HTTPS for all API calls.
- Implement CSRF protection if required by back-end.

---

### Responsive Design

- Use Tailwind CSS for responsive layouts.
- Test on mobile (320px+), tablet (768px+), and desktop (1024px+).
- Ensure buttons and inputs are touch-friendly.

---

### Performance

- Lazy-load components for non-critical pages (e.g., Earnings History).
- Optimize images (if used) with next/image or similar.
- Minimize re-renders using React.memo and useCallback.

---

## Sample Page Structure

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Investment Platform</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Packages from './pages/Packages';
import EarningsHistory from './pages/EarningsHistory';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/earnings" element={<EarningsHistory />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## Development Guidelines

**Code Structure:**

- Organize components in `src/components` (e.g., Header, PackageCard).
- Place pages in `src/pages` (e.g., Register.jsx, Dashboard.jsx).
- Use `src/utils` for helpers (e.g., API client, formatters).

**Version Control:** Use Git with meaningful commit messages.

**Testing:**

- Test UI components with react-testing-library.
- Test API integrations with mock responses.

**Deployment:**

- Build with `npm run build`.
- Host on static hosting (e.g., Netlify, Vercel) with API proxy to Node.js back-end.

---

## Deliverables

- Fully functional React application with all features implemented.
- Documentation for setup, build, and deployment.
- List of dependencies and their versions.
- Test report for critical user flows (Registration, Login, Package Purchase, Wallet Funding).

---

## Notes for Front-End Developer

- Request API documentation and test endpoints from back-end team early.
- Mock API responses for development if back-end is not ready.
- Coordinate with back-end for wallet address format and transaction confirmation logic.
- Use placeholder data for features marked as "future" (e.g., Withdraw, Export).
- Ensure accessibility (e.g., ARIA labels, keyboard navigation).

---

This write-up ensures a clear roadmap for the front-end developer to build a robust investment website. Please provide the API base URL and any specific design preferences (e.g., color scheme, logo) to streamline the process.
