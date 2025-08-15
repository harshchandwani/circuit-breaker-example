# Circuit Breaker Microservices Example (Node.js)

## 📌 Overview

This project demonstrates how to implement a **Circuit Breaker pattern** in a microservices architecture using **Node.js + Express** without relying on heavy paid libraries.  
The **Circuit Breaker** protects your service from continuously calling a failing dependency, avoiding cascading failures.

---

## 🧠 What is a Circuit Breaker?

A **Circuit Breaker** works like an electrical fuse:

- If too many failures happen consecutively, it **trips** and stops sending requests for a while.
- This prevents your application from wasting resources on calls that will likely fail.
- After a cooldown, it **tests** the dependency with a few requests before going back to normal.

**States:**

1. **Closed** – Everything is normal, requests go through.
2. **Open** – Requests are blocked immediately (fail fast).
3. **Half-Open** – Allow limited test requests; if they succeed, close the breaker.

---

## 🏗 Project Structure
