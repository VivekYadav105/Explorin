# Plune Healthcare - Internship Task

This repository contains the project developed during my internship at **Plune Healthcare**. It includes a **React - Vite** frontend and a **Node.js - Express** backend.

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Scripts](#scripts)

## Project Structure

The project is divided into two main folders:<br/> 
  - ├── client/ # Frontend (React + Vite) <br/>
  - └── server/ # Backend (Node.js + Express)

### Client (Frontend)

The frontend is built using **React** with **Vite** for faster builds and hot module replacement. It is located in the `client/` folder.

### Server (Backend)

The backend is built using **Node.js** and **Express**. It is located in the `server/` folder and serves as the API for the application.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, CSS, Recharts
- **Backend**: Node.js, Express
- **Database**: MONGODB

## Getting Started

Follow the steps below to set up both the frontend and backend locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Vite](https://vitejs.dev/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Frontend Setup

1. Navigate to the `client/` directory:
   ```bash
   cd client
   ```
   
2. Install dependencies:
   ```bash
   npm i
   ```
3. Create a .env file in the client/ directory with the required environment variables:
   ```bash
      VITE_BACKEND_URI = Your backend url
      VITE_DUMMY_USERID = dummy user cred
      VITE_DUMMY_MOBILE = dummy user cred
      VITE_DUMMY_PASS = dummy user cred
   ```
**Note: The dummy user credentials are also being checked in database**

4. Start the frontend development server:
   
   ```bash
      npm run dev
   ```
## Backend Setup

1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
   
2. Install dependencies:
   ```bash
   npm i
   ```
3. Create a .env file in the client/ directory with the required environment variables:
   ```bash
      JWT_SECRET_MAIN = for main login token
      JWT_SECRET_TEMP = for reset and verify tokens
      MONGO_URI = uri of mongodb atlas for cloud storage
      API_KEY = for vonage api -- optional 
      API_SECRET = for vonage -- optional
   ```
**Note: The dummy user credentials are also being checked in database**

4. Start the Backend development server:
   
   ```bash
      nodemon start or node index.js
   ```
### Scripts
- Frontend (client)
  1. npm run dev: Starts the Vite development server.
  2. npm run build: Builds the frontend for production.
 - Backend (server)
    1. node index.js: Starts the Express server.
