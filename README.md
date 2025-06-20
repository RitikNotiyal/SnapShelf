# SnapShelf

# 🛒 SnapShelf - Full Stack Ecommerce Backend

SnapShelf is a secure and scalable **Node.js + Express** based backend application designed for an e-commerce platform. It supports **user authentication**, **admin features**, **JWT-based session management**, and much more — built with **production-grade best practices**.

---

## 📌 Features

### ✅ User Features
- Register new users with avatar auto-generation (`ui-avatars`)
- Login with JWT access and refresh tokens
- Encrypted password storage with `bcrypt`
- Cookie-based token management (HTTP-only, secure flags)
- Validation using `Joi` and Mongoose validators
- Shopping cart management
- Order placeholder setup

### ✅ Admin Features
- Admin registration (with GST validation)
- Auto-generated admin avatar
- Admin product reference and management (expandable)
- Admin deletion functionality

### ✅ Security & Error Handling
- Input validation using Joi & RegEx
- Secure cookies (`httpOnly`, `secure`, `sameSite`)
- Centralized error handling
- Environment configuration with `.env`

---

## 🗃️ Tech Stack

| Tech           | Usage                        |
|----------------|------------------------------|
| Node.js        | Server runtime               |
| Express        | API framework                |
| MongoDB        | Database                     |
| Mongoose       | ODM for MongoDB              |
| JWT            | Authentication (Access + Refresh) |
| bcrypt         | Password encryption          |
| cookie-parser  | Token handling in cookies    |
| dotenv         | Environment variable handling |
| Joi            | Input validation             |
