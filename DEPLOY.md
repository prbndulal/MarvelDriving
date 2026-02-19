# Deployment Guide - Eternal Gravity

This guide explains how to host your Next.js website on **Vercel**, the recommended platform for Next.js.

## 1. Prerequisites
- A GitHub account.
- A Vercel account (sign up at [vercel.com](https://vercel.com)).
- Your code pushed to a GitHub repository.

## 2. Deploy to Vercel
1.  **Log in to Vercel**.
2.  Click **"Add New..."** -> **"Project"**.
3.  **Import Git Repository**:
    - Select your GitHub account.
    - Find the `eternal-gravity` repository and click **"Import"**.
4.  **Configure Project**:
    - **Framework Preset**: Next.js (should be auto-detected).
    - **Root Directory**: `./` (default).
    - **Environment Variables**:
        - You will need to add Supabase variables later (see Section 3).
        - For now, you can leave them empty or add placeholders.
5.  Click **"Deploy"**.

Vercel will build your project and verify it. Once complete, you will get a live URL (e.g., `eternal-gravity.vercel.app`).

## 3. Database Setup (Supabase)
To enable bookings and the admin panel, you need a database.

1.  Go to [supabase.com](https://supabase.com) and sign up.
2.  **Create a New Project**:
    - Name: `Eternal Gravity`
    - Region: Choose one close to your users (e.g., Sydney, Australia).
    - Database Password: Generate a strong password and save it.
3.  **Get API Keys**:
    - Go to **Project Settings** -> **API**.
    - Copy the `Project URL` and `anon public` key.
4.  **Add to Vercel**:
    - Go to your Vercel project dashboard -> **Settings** -> **Environment Variables**.
    - Add:
        - `NEXT_PUBLIC_SUPABASE_URL`: Your Project URL
        - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anon public key
    - Redeploy your project for changes to take effect (Go to **Deployments** -> Redeploy).

## 4. Run Database Schema
1.  In Supabase Dashboard, go to **SQL Editor**.
2.  Copy the content of `supabase/schema.sql` (found in your project code).
3.  Paste it into the SQL Editor and click **Run**.
    - This will create the necessary tables for bookings, enquiries, and profiles.

## 5. Stripe Setup (Coming Soon)
For payments, you will need to add Stripe keys:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`

---
**Your website is now hosted!**
