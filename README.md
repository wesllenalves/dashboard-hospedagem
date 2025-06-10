# Hosting Dashboard

This repository is organized into two main folders:

- `backend` – the NestJS API and related configuration.
- `frontend` – contains a React project for the dashboard UI.

The backend folder still contains all previous project files. Move into that directory to run the API as before:

```bash
cd backend
npm install
npm run start:dev
```

## Environment variables

The API expects some configuration through environment variables. Create a `.env` file in the `backend` directory and define at least:

```bash
DATABASE_URL=postgresql://dashboard_user:dashboard_pass@localhost:5432/dashboard_db
JWT_SECRET=your_secret_key
```

You can use `backend/.env.local` as an example. This file is ignored by Git so your secrets remain private.

## Running PostgreSQL with Docker

The `backend/docker-compose.yml` file sets up a PostgreSQL container. Run the following command from the `backend` folder to start it:

```bash
docker-compose up -d
```

