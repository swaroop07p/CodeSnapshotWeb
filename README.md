# Visual Code Synthesis 🚀
A professional snippet-to-image utility built for developers.

## ✨ Features
- **Instant Export**: Generate high-quality PNGs of your code.
- **Custom Themes**: Beautiful gradients and macOS-style window frames.
- **Auth System**: Secure Login/Signup to save your history.
- **Recent History**: Automatically tracks your last 5 generated snippets via MongoDB.

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Auth**: JWT (JSON Web Tokens)

## 🏁 Quick Start
1. Clone the repo.
2. Run `npm install` in both `frontend` and `backend` folders.
3. Add your `MONGO_URI` to `backend/.env`.
4. Run `node server.js` in backend and `npm run dev` in frontend.