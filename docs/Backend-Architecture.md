# Retail Banking Backend

> Enterprise Node.js + Express Backend for the Retail Banking Operations Portal

---

# 1. Overview

## Purpose

The Retail Banking Backend provides secure REST APIs for customer banking operations, employee workflows, and administrative management. The application follows a layered architecture to ensure maintainability, scalability, and separation of concerns.

The backend exposes REST endpoints consumed by the Angular frontend and handles authentication, authorization, business logic, database interactions, and audit logging.

---

# 2. Technology Stack

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| ORM | Prisma |
| Database | PostgreSQL |
| Authentication | JWT |
| Authorization | Role-Based Access Control (RBAC) |
| API Documentation | Swagger |
| Password Encryption | bcrypt |
| Containerization | Docker (Planned) |
| Cloud | AWS (Planned) |

---

# 3. High-Level Architecture

```text
                     Angular Frontend
                            │
                     HTTPS / REST APIs
                            │
                     Express Application
                            │
                    Request Middleware
                            │
                        Route Layer
                            │
                     Controller Layer
                            │
                      Service Layer
                            │
                    Repository Layer
                            │
                      Prisma Client
                            │
                       PostgreSQL
```

The application follows a layered architecture where each layer has a single responsibility.

---

# 4. Request Lifecycle

```text
HTTP Request
      │
      ▼
Express Route
      │
      ▼
Authentication Middleware
      │
      ▼
Role Authorization Middleware
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
Prisma Client
      │
      ▼
PostgreSQL
      │
      ▲
HTTP Response
```

This flow ensures authentication, authorization, validation, business logic, and database access remain independent.

---

# 5. Project Structure

```text
src/

├── config/
├── controllers/
├── middleware/
├── repositories/
├── routes/
├── services/
├── types/
├── utils/
└── server.ts

prisma/

├── schema.prisma
├── migrations/
└── seed.ts
```

### Folder Responsibilities

| Folder | Responsibility |
|----------|----------------|
| config | Application configuration |
| controllers | Handle HTTP requests and responses |
| middleware | Authentication, authorization and request processing |
| repositories | Database access through Prisma |
| routes | API endpoint definitions |
| services | Business logic |
| types | Shared TypeScript types |
| utils | Helper utilities |
| prisma | Database schema, migrations and seeding |

---

# 6. Authentication & Authorization

The application uses JWT-based authentication.

Authentication Flow

```text
Login

↓

Verify Credentials

↓

Generate JWT

↓

Client Stores Token

↓

Authorization Header

↓

JWT Middleware

↓

Protected API
```

Authorization is implemented using Role-Based Access Control (RBAC).

Supported roles include:

- Customer
- Employee
- Administrator

---

# 7. Core Modules

## Authentication

- Login
- Signup
- Change Password
- JWT Authentication

---

## Customer

- Customer Management
- Customer Profile

---

## Accounts

- Create Account
- View Accounts
- Account Details

---

## Transactions

- Deposit
- Withdraw
- Fund Transfer
- Transaction History

---

## Employee

- Employee Management
- Customer Operations

---

## Dashboard

- Dashboard Summary
- Banking Statistics

---

## Notifications

- User Notifications

---

## Support

- Support Tickets

---

## Statements

- Account Statements

---

## Audit Logs

- User Activity
- Banking Operations

---

# 8. Design Decisions

The backend adopts the following architectural principles:

### Layered Architecture

```
Controller

↓

Service

↓

Repository
```

Benefits

- Separation of concerns
- Easier maintenance
- Better testing
- Cleaner codebase

---

### Repository Pattern

Database access is isolated from business logic by using repository classes.

---

### Prisma ORM

Prisma provides:

- Type-safe database access
- Schema-based migrations
- Auto-generated database client

---

### PostgreSQL

Chosen because it provides:

- ACID compliance
- Strong relational modeling
- Excellent performance
- Production readiness

---

# 9. Security

Security mechanisms implemented include:

- JWT Authentication
- Password Hashing (bcrypt)
- RBAC
- Protected Routes
- Request Validation
- Global Error Handling

---

# 10. Future Enhancements

Planned improvements include:

- Refresh Token Authentication
- Redis Caching
- Dockerized Deployment
- GitHub Actions CI/CD
- AWS Deployment
- WebSocket Notifications
- Microservices
- Rate Limiting
- API Versioning
- Distributed Logging

---

# 11. Backend Summary

The Retail Banking Backend is designed as a scalable, modular, and enterprise-oriented REST API following modern backend development practices.

The architecture emphasizes:

- Clean separation of responsibilities
- Secure authentication and authorization
- Modular feature organization
- Type-safe database access
- Maintainable and extensible code structure

The backend serves as the foundation for the Retail Banking Frontend and is designed to support future deployment to cloud infrastructure and enterprise DevOps pipelines.