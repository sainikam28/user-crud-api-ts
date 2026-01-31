# User CRUD API (Node.js + TypeScript)

Simple CRUD backend API built using Node.js, Express, MongoDB, and TypeScript.

## Features
- CRUD operations for users
- Centralized error handling
- Clean architecture

## Run locally
npm install
npm run dev

| Operation | Auth | RBAC         | Response | Secure |
| --------- | ---- | ------------ | -------- | ------ |
| Create    | ✅    | ADMIN        | ✅        | ✅      |
| Get all   | ✅    | ADMIN        | ✅        | ✅      |
| Get one   | ✅    | SELF / ADMIN | ✅        | ✅      |
| Update    | ✅    | SELF / ADMIN | ✅        | ✅      |
| Delete    | ✅    | ADMIN        | ✅        | ✅      |
