

# Basic Task Management App

## Overview

This project is a simple task management application built with React, Firebase, and Tailwind CSS. Users can register, log in, add tasks, view their task list, and manage their tasks. The app integrates Firebase for authentication and Firestore for database management.

## Features

- User Authentication (Register/Login)
- Task Management (Add/View/Edit/Delete Tasks)
- Responsive design with Tailwind CSS
- Real-time updates with Firebase Firestore

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Firebase**: For authentication and Firestore database.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Router**: For routing between different pages.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn package manager

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Richelle2123/basic-task-manager.git
    cd basic-task-manager
    ```

2. **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3. **Set up Firebase:**

    - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
    - Enable Authentication and Firestore Database in your Firebase project.
    - Create a `.env` file in the root directory and add your Firebase configuration:

    ```env
    VITE_FIREBASE_API_KEY=your-api-key
    VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
    VITE_FIREBASE_PROJECT_ID=your-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    VITE_FIREBASE_APP_ID=your-app-id
    ```

4. **Run the application:**

    Using npm:

    ```bash
    npm start
    ```

    Or using yarn:

    ```bash
    yarn dev
    ```

    The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
│
├── pages/
│   ├── AddTask.js
│   ├── Login.js
│   ├── Register.js
│   └── TaskList.js
│
├── firebaseConfig.js  
├── App.js            
├── index.js           
└── index.css          
```

## Usage

1. **Register** a new user account or **Login** if you already have an account.
2. Once logged in, you'll be redirected to the Task List page where you can view and manage your tasks.
3. Use the **Add Task** page to create new tasks.
4. Tasks can be marked as complete, edited, or deleted.


