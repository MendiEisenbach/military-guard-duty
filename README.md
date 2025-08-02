# 🛡️ Military Guard Duty System

A full-featured **Guard Duty Management System** built with **NestJS**, designed for army bases.  
It allows commanders to create shifts, assign soldiers, and enables soldiers to view their own assignments.  
The system includes **JWT authentication**, **role-based access**, and **MySQL persistence** with **TypeORM**.

---

## 📁 Project Structure

```plaintext
military-guard-duty/
├── src/
│   ├── auth/           # Login, registration, JWT
│   ├── users/          # User logic and roles
│   ├── shifts/         # Guard shifts
│   ├── assignments/    # Assignments of soldiers to shifts
│   └── common/         # Role decorators and guards
├── .env                # Environment variables
├── package.json        # Project dependencies and scripts
└── README.md           # System documentation
```

---

## 🧠 Features

- Secure registration and login with hashed passwords (`bcrypt`)
- JWT token generation with embedded `role` and `user ID`
- Shift creation restricted to `commander` role
- Soldiers can view only their own assignments
- Role-based access using custom `@Roles` decorator and guards
- All data is stored in **MySQL** using **TypeORM**
- Environment configuration via `.env`

---

## 🧭 Flow Diagram

```plaintext
[Client] 
   ↓ 
[HTTP Request: login / register / shifts / assignments] 
   ↓
[Controllers] → [Services] → [Guards / Roles] → [MySQL DB via TypeORM]
```

---

## 🗂️ Database Entities

| Entity       | Main Fields                                      |
|--------------|--------------------------------------------------|
| **User**     | `id`, `name`, `email`, `password`, `role`        |
| **Shift**    | `id`, `startTime`, `endTime`, `location`         |
| **Assignment** | `id`, `userId`, `shiftId`                      |

---

## ⚙️ Installation & Running

1. Start your MySQL server (e.g., via **XAMPP**)
2. Create a database named according to your `.env` (e.g., `military_guard`)
3. Install dependencies:

```bash
npm install
```

4. Run the server in dev mode:

```bash
npm run start:dev
```

---

## 📄 Sample `.env` file

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=military_guard

JWT_SECRET=superSecretJwtKey
JWT_EXPIRES=3600s
```

---

## 🔐 Example Usage with `curl`

```bash
# Register a new soldier
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Dan Soldier",
  "email": "dan@example.com",
  "password": "123456",
  "role": "soldier"
}'

# Login to get JWT token
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "dan@example.com",
  "password": "123456"
}'

# Create a shift (commander only)
curl -X POST http://localhost:3000/shifts \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <ACCESS_TOKEN>" \
-d '{
  "startTime": "08:00",
  "endTime": "12:00",
  "location": "Gate A"
}'

# Assign a soldier to a shift
curl -X POST http://localhost:3000/assignments \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <ACCESS_TOKEN>" \
-d '{
  "userId": 2,
  "shiftId": 1
}'
```

## 📌 Notes

- Written in **TypeScript**, using a modular **NestJS** structure.
- Can be extended easily to support presence tracking, shift changes, alerts, etc.
- Designed with clarity, separation of concerns, and security in mind.

---
