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

circuit-breaker-demo/
│── service-a/
│ ├── index.js
│ ├── circuitBreaker.js
│── service-b/
│ ├── index.js
│── package.json

---

## 🚀 How to Run & Test

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/circuit-breaker-demo.git
cd circuit-breaker-demo
```

### 2. Start Service B (Flaky Service)

```sh
cd service-b
npm init -y
npm install express
node index.js
```

Service B runs on: [http://localhost:3001](http://localhost:3001)

### 3. Start Service A (With Circuit Breaker)

Open a new terminal:

```sh
cd service-a
npm init -y
npm install express axios
node index.js
```

Service A runs on: [http://localhost:3000](http://localhost:3000)

### 4. Call Service A endpoint

```sh
curl http://localhost:3000/fetch-data
```

---

## 🧪 Expected Behavior

- **Initially**, requests will sometimes succeed, sometimes fail.
- **After 3 consecutive failures**, the breaker will trip and state will become **OPEN**.
- While **OPEN**, all requests fail instantly with:
  ```json
  {
    "state": "OPEN",
    "error": "Circuit breaker is OPEN"
  }
  ```
- **Wait 5 seconds**, the breaker goes **HALF-OPEN**.
- If **2 consecutive successes** occur, breaker returns to **CLOSED**.

---
