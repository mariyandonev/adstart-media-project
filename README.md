# Adstart Project

A full-stack web application featuring **authentication**, built with a **React + TypeScript (Vite)** frontend and a **Node.js + Express + MySQL** backend.
The project includes environment variable support, database migration, and unit tests with **JEST**.

---
## Description

The project has a homepage with two options - admin page and get quote.
For the admin page you need credentials - username and password. The getting quote part of the project is a form (wizard) with four steps, the first three steps has different data that would be submitted from the last step to a mysql db.
The admin page is a page where the administrator can see the data from the db.

### 📁 Project Structure

# BACKEND - .\api\

**Tech Stack:**

- Node.js
- Express
- dotenv (environment variables)
- MySQL
- Basic Authentication - username + password
- Migration script using schema.sql

  **Start Backend**
  - cd .\api\
  - npm install
  - npm run setup-db
  - npm start

# FRONTEND - .\src\

**Tech Stack:**

- Vite
- React
- TypeScript

**Start Frontend**
- npm install
- npm run dev

**Start Tests**
- npm test
or
- npm test:watch
# adstart-media
