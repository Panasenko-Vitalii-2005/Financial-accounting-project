# Система «Особистий бюджет»

Повнофункціональний застосунок для ведення особистого бюджету. Стек: **NestJS + Prisma + PostgreSQL** (бекенд) та **React + TypeScript + Vite + TailwindCSS** (фронтенд).

## Функціонал

- 🔐 Аутентифікація (JWT): реєстрація, вхід, захист маршрутів
- 📁 Управління категоріями (доходи/витрати, перенос транзакцій при видаленні)
- 💳 Транзакції: CRUD, фільтрація, сортування
- 📊 Звіти: баланс, кругова діаграма по категоріях, лінійний графік динаміки, топ витрат
- 📥 Експорт транзакцій у CSV
- 🌐 Swagger API документація (`/api/docs`)

## Технологічний стек

| Рівень | Технологія |
|--------|-----------|
| Backend | NestJS + TypeScript |
| ORM | Prisma |
| База даних | PostgreSQL |
| Frontend | React 18 + TypeScript |
| Збірка | Vite |
| Стилі | TailwindCSS |
| Графіки | Chart.js + react-chartjs-2 |
| Auth | JWT + bcrypt |

## Структура проекту

```
├── backend/          # NestJS API
│   ├── src/
│   │   ├── modules/  # auth, users, categories, transactions, reports
│   │   ├── prisma/   # PrismaService
│   │   └── common/   # decorators, filters
│   └── prisma/       # schema.prisma, seed.ts
└── frontend/         # React + Vite
    └── src/
        ├── pages/    # Dashboard, Transactions, Categories, Reports
        ├── components/
        ├── services/ # Axios API clients
        ├── context/  # AuthContext
        └── hooks/    # useToast
```

## Запуск

### Вимоги
- Node.js 20+
- PostgreSQL

### Бекенд

```bash
cd backend
cp .env.example .env
# Відредагуйте .env: DATABASE_URL, JWT_SECRET
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run start:dev
```

API доступне на `http://localhost:3000`  
Swagger: `http://localhost:3000/api/docs`

### Фронтенд

```bash
cd frontend
npm install
npm run dev
```

Застосунок доступний на `http://localhost:5173`

> Проксі Vite автоматично пересилає запити `/api/*` на `http://localhost:3000`

### Тестові дані (seed)

```bash
cd backend
npm run prisma:seed
```

Створює демо-користувача: `demo@example.com` / `password123`

## Модель даних

```
User ──< Category ──< Transaction
User ──< Transaction
```

- **User**: id, email, username, passwordHash
- **Category**: id, name, type (INCOME/EXPENSE), userId
- **Transaction**: id, amount, date, description, userId, categoryId

## API ендпоінти

| Метод | Маршрут | Опис |
|-------|---------|------|
| POST | /auth/register | Реєстрація |
| POST | /auth/login | Вхід |
| GET | /users/me | Профіль |
| GET | /categories | Список категорій |
| POST | /categories | Створити категорію |
| PATCH | /categories/:id | Оновити категорію |
| DELETE | /categories/:id | Видалити категорію |
| GET | /transactions | Список транзакцій (з фільтрами) |
| POST | /transactions | Створити транзакцію |
| PATCH | /transactions/:id | Оновити транзакцію |
| DELETE | /transactions/:id | Видалити транзакцію |
| GET | /transactions/export/csv | Експорт CSV |
| GET | /reports/balance | Баланс |
| GET | /reports/categories | Звіт по категоріях |
| GET | /reports/timeline | Динаміка за часом |
| GET | /reports/top-expenses | Топ витрат |
| GET | /reports/detailed | Детальний звіт |