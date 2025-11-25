# 📝 WeFund Frontend

<!-- Tech badges -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&labelColor=20232a)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-DB7093)


WeFund is a crowdfunding platform where users can create campaigns, donate securely, and track fundraising progress.This repository contains the **frontend (React)** codebase. This connects with the backend (Node.js + Express + MongoDB) to provide a seamless task management experience.

---

## 🚀 Features

- User authentication (login/signup with JWT & cookies)
- Create, view, and manage crowdfunding campaigns
- Give donation to any campaign with your balance
- Campaign progress tracking with live updates
- Responsive, modern UI built with React & Tailwind CSS

## 🛠️ Tech Stack
- **React.js** (Frontend framework)
- **Vite** (Build tool)
- **React Router** (Navigation)
- **Axios** (API calls)
- **Tailwind CSS** (Styling)
- **Context API**

## 📂 Project Structure
```
frontend/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── assets/             # Images & logos
│   ├── components/         # Reusable UI components         
│   ├── pages/              # Main pages (Home, Login, Register)
│   ├── SubComponents       # Small UI Components
│   ├── App.jsx             # Main App component
│   ├── AppWrapper.jsx      # Wrapper with context
│   ├── config.js           # Define the backend URL
│   ├── context.js          # Auth context provider
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── .env.development        # Environment variables (Dev)
├── .env.production         # Environment variables (Prod)
├── vite.config.js          # Vite config
├── package.json
└── README.md


```

## ⚙️ Setup

1. Clone the repository
```
git clone https://github.com/shaileshadole/WeFund-frontend
cd WeFund-frontend
```

2. Install dependencies
```
npm install
```

3. Configure environment variables

Create .env.development and .env.production files in the root:

For development (locally)
```
VITE_SERVER_URL=http://localhost:4000/api/v1
```

For production (on Vercel):
```
VITE_SERVER_URL=https://wefund.onrender.com/api/v1
```

4. Run the development server
```
npm run dev
```

5. Build for production
```
npm run build
```

## 🚀 Deployment on Vercel

Push your project to GitHub.

Go to Vercel
 → Import Project → Select your repo.

Add your environment variables (VITE_API_URL).

## 🧑‍💻 Author

**Shailesh Adole**  
GitHub: [shaileshadole](https://github.com/shaileshadole)

---
## 🔗 Related Repositories

[WeFund Backend](https://github.com/shaileshadole/WeFund)

---

## 🚀 Let's Connect

- 🌐 [LinkedIn](https://www.linkedin.com/in/shailesh-adole-01306a303/)
- ✉️ [Email](adoleshailesh2@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).