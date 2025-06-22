# 🌤️ Next.js Weather App – Developer Test

This project is a **production-grade Weather App** built using **Next.js (React + TypeScript)**, created as part of a developer assignment. It demonstrates a clean architecture, high-concurrency handling, modern frontend engineering practices, and matches a provided **Figma design**.

---

## 📌 Objective

- Clean architecture
- High concurrency (100k+ users)
- Security-first approach
- Performance optimization
- Testing coverage
- Pixel-perfect UI from Figma

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js (latest stable) + TypeScript
- **State Management**: Redux Toolkit / Zustand / Context API
- **Data Fetching**: React Query or Axios
- **Rendering**: SSR / SSG based on page context
- **Styling**: Tailwind CSS
- **Encryption**: Custom 64-bit API encryption
- **Containerization**: Docker
- **Concurrency**: CDN caching + load balancing
- **Modular**: Code splitting & lazy loading

---

## 🎨 UI Implementation

- Fully responsive layout based on [Figma Design](https://www.figma.com/design/8xkKX6XwnzgVEhOkz2oKLo/TEST?node-id=0-1&t=COxgz4KeOdqiAe9G-1)
- Reusable components: Cards, Search Bar, Weather Details, Favorites
- Theming: Light/Dark Mode (if in design)

---

## 🔍 Core Features

### 🏠 Home Page
- Auto-detect user location (Geolocation API)
- Weather details: Temperature, Wind, Humidity, Condition
- Offline caching (IndexedDB or localStorage)

### 🌆 City Search
- Fuzzy city search
- Dynamic weather details

### ⭐ Favorites
- JWT-based authentication
- Save & retrieve favorite cities
- Favorites summary view

---

## 🔐 Security

- Custom 64-bit encryption for all API responses
- JWT authentication
- HTTPS enforced + secure HTTP headers

---

## ⚡ Performance & Scalability

- CDN caching (e.g. Cloudflare)
- SSR/SSG for optimal load times
- Lighthouse/Web Vitals for performance tracking

---

## 🧪 Testing

- **Unit Testing**: Jest + React Testing Library
- **E2E Testing**: Cypress or Playwright
- **Coverage**: ≥ 85% with detailed reports

---

## 🎁 Bonus Features

- PWA support for offline access
- Optional GraphQL support
- CI/CD pipeline via GitHub Actions
- Load
