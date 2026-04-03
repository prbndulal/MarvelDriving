# Deployment Guide - Marvel Driving

This guide explains how to host your Next.js website on **Vercel** with a **Render PostgreSQL** database.

## 1. Prerequisites
- A GitHub account.
- A Vercel account (sign up at [vercel.com](https://vercel.com)).
- A Render account (for PostgreSQL) or any other managed Postgres provider.
- Your code pushed to a GitHub repository.

## 2. Database Setup (PostgreSQL)
1.  **Create a New Database on Render**:
    - Select **New** -> **PostgreSQL**.
    - Region: Choose one close to your users (e.g., Sydney, Australia, if available).
    - Database Name: `marvel_driving`
2.  **Get Your Connection String**:
    - Once the database is created, copy the **Internal Database URL** or **External Database URL**.
    - It should look like this: `postgresql://user:password@hostname:5432/dbname?sslmode=require`.

## 3. Deploy to Vercel
1.  **Import Your Project**:
    - Connect your GitHub and import the `eternal-gravity` repository.
2.  **Configure Environment Variables**:
    - Add these critical variables:
        - `DATABASE_URL`: Your Render PostgreSQL connection string.
        - `NEXTAUTH_SECRET`: A long random string (e.g., `openssl rand -base64 32`).
        - `NEXTAUTH_URL`: Your Vercel production URL (e.g., `https://your-app.vercel.app`).
        - `STRIPE_SECRET_KEY`: Your Stripe secret key.
        - `NEXT_PUBLIC_BASE_URL`: Your primary domain URL.
3.  **Deploy**:
    - Vercel will build your project. During build, it will run `npx prisma generate` automatically if configured.

## 4. Run Database Migrations
To ensure your database tables are created:
1.  Locally, run:
    ```bash
    npx prisma db push
    ```
    This syncs your `schema.prisma` with the live database.

## 5. Stripe Webhooks
1.  Go to **Stripe Dashboard** -> **Developers** -> **Webhooks**.
2.  Add an endpoint pointing to `https://your-app.vercel.app/api/webhooks/stripe`.
3.  Copy the **Webhook Secret** and add it to Vercel as `STRIPE_WEBHOOK_SECRET`.

---
**Your website is now hosted and secure!**
