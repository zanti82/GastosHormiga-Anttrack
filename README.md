# 💸 Expenditure Tracker

A full-stack personal finance application to track and manage your daily expenses. Built with a **Spring Boot** REST API and a **React** frontend, backed by **PostgreSQL** and hosted on **AWS**.

---

## 🚀 Live Demo

> 🔗 [Frontend App](https://your-frontend-url.com) · [API Base URL](http://3.134.93.54:8080/anttrackapi/v1)]

---

## 📸 Screenshots

> *(Add screenshots or a GIF of the app here)*

---

## 🧱 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Java + Spring Boot | REST API |
| Spring Data JPA | ORM & DB access |
| PostgreSQL | Relational database |
| Spring Security | Authentication & authorization |
| AWS EC2 | API hosting |
| AWS RDS | Managed PostgreSQL instance |

### Frontend
| Technology | Purpose |
|---|---|
| React | UI framework |
| React Router | Client-side routing |
| State management |
| CSS Modules / Tailwind | Styling |

---

## ✨ Features

- 📊 **Dashboard** — visual summary of expenses by category and date range
- ➕ **Add / Edit / Delete** expenditures with amount, category, date, and notes
- 🗂️ **Category management** — organize spending by custom categories
- 📅 **Date filtering** — view expenses by day, week, or month
- 🔐 **User authentication** — secure login with JWT tokens
- 📱 **Responsive design** — works on desktop and mobile

---

## 🗂️ Project Structure

```
expenditure-tracker/
├── backend/                  # Spring Boot API
│   ├── src/
│   │   ├── main/java/
│   │   │   ├── controller/   # REST controllers
│   │   │   ├── service/      # Business logic
│   │   │   ├── repository/   # JPA repositories
│   │   │   ├── model/        # Entity classes
│   │   │   └── dto/          # Data transfer objects
│   │   └── resources/
│   │       └── application.properties
│   └── pom.xml
│
└── frontend/                 # React app
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── pages/            # Route-level pages
    │   ├── services/         # API calls (Axios)
    │   ├── context/          # Global state
    │   └── App.jsx
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Maven

---

### Backend Setup



API will be available at `(http://3.134.93.54:8080/anttrackapi/v1)`

---

### Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

Create a `.env` file:


App will be available at `http://localhost:5173`

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `GET` | `/api/expenditures` | Get all expenditures |
| `POST` | `/api/expenditures` | Create a new expenditure |
| `PUT` | `/api/expenditures/{id}` | Update an expenditure |
| `DELETE` | `/api/expenditures/{id}` | Delete an expenditure |
| `GET` | `/api/categories` | Get all categories |

> Full API documentation: *(link to Swagger/Postman collection if available)*

---

## ☁️ AWS Infrastructure

```
User → React App (S3 + CloudFront or Amplify)
          ↓
    Spring Boot API (EC2)
          ↓
    PostgreSQL (RDS)
```

- **EC2** — hosts the Spring Boot JAR as a background service
- **RDS** — managed PostgreSQL with automated backups
- **Security Groups** — API only accepts traffic from allowed origins; DB only accessible from EC2

---

## 🔒 Environment Variables

Never commit secrets. Use these templates:

**Backend** (`application.properties.example`):
```properties
spring.datasource.url=jdbc:postgresql://<host>:5432/<db>
spring.datasource.username=<user>
spring.datasource.password=<password>
jwt.secret=<secret>
```

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 👤 Author

**Your Name**
- GitHub: (https://github.com/zanti82/)
- LinkedIn: (https://www.linkedin.com/in/santiago-a-ramirez-h/)
- Portfolio: (https://www.linkedin.com/in/santiago-a-ramirez-h/)
