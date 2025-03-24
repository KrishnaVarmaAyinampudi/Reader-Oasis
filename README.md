# Project: ReaderOasis

## About Me
We are Team GeekyTechies, a group of passionate software engineers dedicated to building efficient and user-friendly solutions. Our team members are:
- Sasanka Varma Kucharlapati
- Abinay Goud Karnam
- Sukanya Manukonda
- Krishna Varma
- Poojita Sai Sukanya Pondari
- Dhondi Ashutosh Varma (Scrum Master)

## Project Title
**ReaderOasis**

## Description
ReaderOasis is an enhanced library management system designed to allow readers to reserve books online and collect them from the library. The system provides essential book details, search and filter functionalities, and librarian authentication for inventory management.

## Problem Statement
Traditional library management systems often lack efficient online reservation and real-time book availability tracking. This project aims to bridge that gap by providing a seamless experience for both librarians and users, integrating features like book reservations, notifications, and feedback management.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** MongoDB
- **Deployment:** AWS (EC2 instances for dev, staging, and production)
- **Authentication:** JWT-based authentication
- **APIs:** RESTful API services
- **DevOps:** CI/CD pipelines with AWS CodeDeploy

## Planned Features
- Book reservation and availability tracking
- Due date reminders for users
- User-proposed book suggestions
- Fine management for overdue books
- API integration for library automation
- Deployment scripts for seamless CI/CD integration

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/KrishnaVarmaAyinampudi/Reader-Oasis.git
   cd SE-Project
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (create a `.env` file and configure required keys):
   ```sh
   NODE_ENV=development
   DB_CONNECTION=<your_database_url>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Run the project:
   ```sh
   npm start
   ```
5. For deployment, use the provided AWS EC2 instances and CI/CD pipeline setup.

## Repository URL[
[GitHub Repository](https://github.com/KrishnaVarmaAyinampudi/Reader-Oasis.git)]

---
This README provides an overview of the ReaderOasis project, its purpose, and setup instructions for contributors and users.
