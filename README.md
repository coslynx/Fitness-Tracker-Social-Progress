<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
Fitness Tracker
</h1>
<h4 align="center">Empower your fitness journey with a user-friendly web application for tracking progress, setting goals, and connecting with a community.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework: Next.js">
  <img src="https://img.shields.io/badge/Frontend-React-red" alt="Frontend: React">
  <img src="https://img.shields.io/badge/UI-Material_UI-blue" alt="UI: Material UI">
  <img src="https://img.shields.io/badge/State-Context_API-black" alt="State: Context API">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/Fitness-Tracker?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/Fitness-Tracker?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/Fitness-Tracker?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview

The repository houses the Fitness Tracker MVP, a web application built with a focus on user experience, data privacy, and scalability. The application leverages the power of React for a robust front-end, Material UI for a visually appealing interface, and local storage for streamlined user data management. 

## 📦 Features

|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔐 | **Secure Authentication**   | The application implements secure user authentication and registration, allowing users to create accounts and manage their personal fitness data. |
| 🎯 | **Personalized Goal Setting**   | Users can define their fitness goals, including weight loss, distance targets, or muscle gain, and track progress towards achieving them. |
| 📊 | **Progress Tracking**   | Users can track their weight, body measurements, workouts, and other relevant metrics to monitor their progress and stay motivated. |
| 🤝 | **Social Sharing**   | Users can share their achievements and progress with friends and family through social media integration, fostering a sense of community. |
| 🎨 | **Responsive Design**   | The application adapts seamlessly to different screen sizes, ensuring a smooth user experience across desktop, tablet, and mobile devices. |
| 🗃️ | **Data Storage**   | User data, goals, and progress are stored locally using `localForage` for efficient and secure data handling. |
| ⚡ | **Performance Optimization**   | The application is optimized for speed and responsiveness, leveraging Next.js's server-side rendering and code splitting features. |

## 📂 Structure

```text
fitness-tracker/
├── apps/
│   └── web/
│       ├── src/
│       │   ├── components/
│       │   │   ├── LoginForm.jsx
│       │   │   ├── DashboardStats.jsx
│       │   │   ├── GoalList.jsx
│       │   │   ├── Header.jsx
│       │   │   ├── Button.jsx
│       │   │   ├── GoalCreationForm.jsx
│       │   │   └── ...
│       │   ├── pages/
│       │   │   ├── Home.jsx
│       │   │   ├── Dashboard.jsx
│       │   │   ├── Goals.jsx
│       │   │   ├── Profile.jsx
│       │   │   └── ...
│       │   ├── hooks/
│       │   │   ├── useAuth.js
│       │   │   ├── useFetch.js
│       │   │   └── ...
│       │   ├── context/
│       │   │   ├── AuthContext.js
│       │   │   └── ...
│       │   ├── services/
│       │   │   ├── api.js
│       │   │   ├── auth.js
│       │   │   └── ...
│       │   ├── utils/
│       │   │   ├── helpers.js
│       │   │   ├── validators.js
│       │   │   └── ...
│       │   └── styles/
│       │       └── global.css
│       ├── public/
│       │   ├── index.html
│       │   └── favicon.ico
│       └── ...
└── packages/
    └── shared/
        ├── components/
        │   ├── ...
        ├── hooks/
        │   ├── ...
        └── utils/
            ├── ...
            └── localForageService.js
```

## 💻 Installation

### 🔧 Prerequisites

- Node.js v16+
- npm 7+
- A code editor (e.g., VS Code, Sublime Text)

### 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/coslynx/Fitness-Tracker.git
   cd Fitness-Tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   - Update the `.env` file with your desired environment variables, such as the API URL and any external service keys.

## 🏗️ Usage

### 🏃‍♂️ Running the MVP

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Access the application:**
   - Open [http://localhost:3000](http://localhost:3000) in your web browser.

## 🌐 Hosting

### 🚀 Deployment Instructions

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy to a suitable platform:**
   - **Vercel:**  [https://vercel.com/new/git/import](https://vercel.com/new/git/import)
   - **Netlify:** [https://app.netlify.com/start/](https://app.netlify.com/start/) 
   - **GitHub Pages:** [https://pages.github.com/](https://pages.github.com/)

   - For each platform, follow the specific deployment instructions provided in their documentation. 

### 🔑 Environment Variables

- `NEXT_PUBLIC_API_URL`: URL of your API endpoint (if applicable).
  - Example: `http://your-api-endpoint.com`
- [Add any other environment variables specific to your deployment configuration.]

## 📜 API Documentation

### 🔍 Endpoints

- **POST /api/auth/register**
  - Description: Register a new user
  - Body: `{ "username": string, "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`

- **POST /api/auth/login**
  - Description: Log in an existing user
  - Body: `{ "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`

- **POST /api/goals**
  - Description: Create a new fitness goal
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "type": string, "target": number, "deadline": date }`
  - Response: `{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }`

- **GET /api/goals**
  - Description: Get all user goals
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `[ { "id": string, "type": string, "target": number, "deadline": date, "progress": number }, ...]`

- **PUT /api/goals/:id**
  - Description: Update a specific goal
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "type": string, "target": number, "deadline": date }`
  - Response: `{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }`

- **DELETE /api/goals/:id**
  - Description: Delete a specific goal
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `{}` 

- **GET /api/progress**
  - Description: Get user progress data
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `[ { "goalId": string, "value": number, "date": date }, ...]`

- **POST /api/progress**
  - Description: Log progress for a specific goal
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "goalId": string, "value": number, "date": date }`
  - Response: `{}`

- **GET /api/profile**
  - Description: Get user profile information
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `{ "username": string, "email": string, "photoURL": string, "goals": [ ... ], "progress": [ ... ] }`

- **PUT /api/profile**
  - Description: Update user profile information
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "username": string, "email": string, "photoURL": string }`
  - Response: `{ "username": string, "email": string, "photoURL": string }`

### 🔒 Authentication

1. **Register** a new user or **log in** to receive a JWT token.

2. **Include** the token in the `Authorization` header for all protected API requests:

   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

3. The token will expire after a certain time (e.g., 1 hour). You can implement a **token refresh** mechanism if needed.

### 📝 Examples

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "fitnessuser", "email": "user@example.com", "password": "securepass123"}'

# Response
{
  "id": "user123",
  "username": "fitnessuser",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# Create a new goal
curl -X POST http://localhost:3000/api/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"type": "weight_loss", "target": 10, "deadline": "2023-12-31"}'

# Response
{
  "id": "goal123",
  "type": "weight_loss",
  "target": 10,
  "deadline": "2023-12-31",
  "progress": 0
}

# Log progress for a goal
curl -X POST http://localhost:3000/api/progress \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"goalId": "goal123", "value": 2, "date": "2023-06-15"}'

# Update user profile
curl -X PUT http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"username": "updatedusername", "email": "updated@example.com", "photoURL": "https://example.com/profile-pic.jpg"}'
```

## 📜 License & Attribution

### 📄 License

This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP

This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: Fitness Tracker

### 📞 Contact

For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>