# 📝 React Form Validation App

A modern, user-friendly form built with **React** and **Tailwind CSS**, featuring real-time validation, password strength checking, and dynamic UI updates. Upon successful submission, user data is displayed on a separate success page using React Router.

## 🔧 Features

- Validations for:
  - Email, phone number, PAN, Aadhar
  - Password strength (live feedback)
  - Required fields
- Toggle show/hide password
- Dynamic city dropdown based on selected country
- Disabled submit button until form is valid
- Clean success page displaying all form data


## 🧠 How It Works

### FormComponent.jsx

- Uses `useState` and `useEffect` for state and real-time validation.
- Contains custom validators:
  - `emailValidator`
  - `phoneValidator`
  - `panValidator`
  - `aadharValidator`
  - `checkPasswordStrength()` for live password score
- Password field includes:
  - Toggle visibility (eye icon)
  - Visual strength meter
- Dynamic dropdowns:
  - Cities change based on selected country
- Form is only submittable when all validations pass.
- On submit, data is passed to `/success` using React Router’s `navigate`.

### SuccessComponent.jsx

- Uses `useLocation()` to retrieve form data.
- Displays submitted values in a clean card layout.
- Ignores unnecessary data like `showPassword`.

## 🚀 Getting Started

Follow these steps to clone and run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/Annibadakh/CSI-Assignment1
cd CSI-Assignment1
```

### 2. Install dependencies

```bash
npm install
# or
yarn install

```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

### 4. Open in browser
Visit: http://localhost:5173