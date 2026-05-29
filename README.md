# Freelancing Platform - Serverless Firebase Migration

This project has been migrated to a modern, fully serverless Firebase architecture. The custom Node/Express, MongoDB (Mongoose), and JWT authentication backend is now completely optional, and the frontend React application communicates directly with **Firebase Authentication** and **Cloud Firestore** for all database and identity management.

## 🚀 Key Advantages

- **No Server Infrastructure Required**: Runs completely in the browser, dramatically reducing server costs and operational complexity.
- **Real-Time Synchronisation**: Dynamic state propagation for client portfolios, library items, and requirements.
- **Enterprise Identity Management**: Secured via Firebase Authentication.
- **Zero-Config Seeder**: Self-bootstrapping library data button directly in the administrative control panel.

---

## 🛠️ Configuration & Setup

### 1. Firebase Project Creation
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and follow the prompt.
3. In the project dashboard, enable:
   - **Authentication**: Enable the **Email/Password** sign-in provider.
   - **Firestore Database**: Create database in test mode (or production mode with read/write rules enabled).

### 2. Environment Configuration
Create a `.env` file in the `frontend/` directory with your Firebase Web App credentials (see `frontend/.env.example`):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Local Development
To run the React application locally:

```bash
cd frontend
npm install
npm run dev
```

The app will start at `http://localhost:3000`.

---

## 🔒 Administrative Control & Seeding

### Seeding Sample Projects
To instantly populate your Firestore database with the standard e-commerce, AI, blockchain, and cybersecurity architectures:
1. Log in to the application as an administrator.
2. Navigate to `/admin`.
3. Click the **Seed Sample Data** button at the top right of the "Active Library" card.
4. Click **OK** to automatically write the production catalog datasets directly to your Firestore database.

### Setting Up a Custom Admin User
To designate any registered user as a system administrator:
1. Register a new account through the `/register` page in the application.
2. Open your [Firebase Console](https://console.firebase.google.com/).
3. Navigate to **Firestore Database** -> `users` collection.
4. Select the document corresponding to your user UID.
5. Add or change the field: `isAdmin` to `true` (Boolean).
6. That user now has complete administrative privileges!

---

## 📁 Project Structure

```
├── frontend
│   ├── src
│   │   ├── config
│   │   │   └── firebase.js     # Firebase SDK initialization
│   │   ├── context
│   │   │   └── AuthContext.jsx # Firebase Auth & Firestore sync
│   │   ├── pages
│   │   │   ├── Admin.jsx       # Direct-to-Firestore admin library management
│   │   │   ├── Marketplace.jsx # Direct-to-Firestore project catalog
│   │   │   ├── Dashboard.jsx   # Direct-to-Firestore client portfolio view
│   │   │   └── ProjectDetail.jsx
│   │   └── ...
│   ├── .env.example            # Environment template config
│   └── ...
```
