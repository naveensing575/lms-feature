# Contour LMS Feature Demo

A simplified LMS feature built with **Next.js (App Router)**, **TypeScript**, **Supabase**, and **shadcn/ui**.  
The goal of this project is to demonstrate architecture choices, tradeoffs, and structure rather than shipping a production-ready app.

---

## ✨ Features
- 🔐 User login & logout with Supabase Auth
- 📊 Protected dashboard for authenticated users
- 📅 Fetch upcoming lessons from Supabase
- ✅ Mark lessons as complete (with optimistic UI updates)
- 🎨 Consistent UI with shadcn/ui and Tailwind v4 theme tokens

---

## 🛠️ Tech Stack
- **Next.js 15** (App Router, Server/Client Components)
- **TypeScript**
- **Supabase** (Postgres + Auth)
- **shadcn/ui** (Radix + Tailwind v4 tokens)

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/lms-feature.git
cd lms-feature
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` → `.env.local` and fill with your Supabase project values:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Database Setup
Run the schema and seed data from `/src/db/` in your Supabase SQL Editor:

```sql
-- lessons table
create table lessons (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references auth.users(id) on delete cascade,
  title text not null,
  date timestamptz not null,
  completed boolean default false
);
```

Create a test user in Supabase Auth and insert lessons linked to that user.

### Seeding Data
1. Create a test user via the Login page or Supabase Dashboard.
2. Copy that user’s `id` from Supabase → Authentication → Users.
3. Replace `<PASTE-YOUR-USER-ID-HERE>` in `seed.sql` with the actual ID.
4. Run the script in Supabase SQL Editor.

```
-- Replace with your test user's actual UUID from Supabase Auth
-- Find this under Supabase → Authentication → Users

insert into lessons (student_id, title, date, completed)
values
  ('<PASTE-YOUR-USER-ID-HERE>', 'Math Lesson 1', now() + interval '1 day', false),
  ('<PASTE-YOUR-USER-ID-HERE>', 'Science Lesson 1', now() + interval '2 days', false),
  ('<PASTE-YOUR-USER-ID-HERE>', 'History Lesson 1', now() + interval '3 days', false),
  ('<PASTE-YOUR-USER-ID-HERE>', 'English Lesson 1', now() + interval '4 days', false);

```


### 5. Run locally
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Architecture Notes

- **Route Groups**: `(auth)` for login, `(dashboard)` for protected pages → clear separation of public/private.  
- **Supabase Clients**: split into `supabaseBrowser` and `supabaseServer` to respect client/server boundaries.  
- **Server Components**: data fetching and auth checks run only on the server → secure, no API key leaks.  
- **Client Components**: login form, logout, and lessons list are interactive, using `supabaseBrowser()`.  
- **UI Layer**: shadcn/ui + Tailwind v4 tokens for consistent theme, avoiding inline one-offs.

---

## ⚖️ Tradeoffs & Improvements
- ✅ Focused on core auth + lessons flow  
- ✅ Clear structure over feature completeness  
- ⚠️ No unit tests or loading skeletons (would add with more time)  
- ⚠️ Lesson completion only supports a toggle, no undo history  
- ⚠️ Would use `middleware.ts` for global route protection in production  

---

## 📂 Folder Structure
```
src/
  app/
    (auth)/login/page.tsx       # Login page (client)
    (dashboard)/dashboard/page.tsx # Dashboard (server)
    layout.tsx                   # Root layout
    globals.css                  # Theme tokens
  components/
    LessonsList.tsx              # Client component for lessons
    LogoutButton.tsx             # Logout handler
    ui/                          # shadcn components
  lib/
    supabaseBrowser.ts
    supabaseServer.ts
```

---

## 🙋 Author Notes
This implementation balances **clarity, security, and maintainability** within a limited time frame.  
With more time, I would add tests, middleware auth enforcement, CI/CD, and more robust error boundaries.
