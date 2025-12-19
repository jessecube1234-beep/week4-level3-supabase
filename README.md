# React + Vite + Supabase Task Manager

This is a simple task manager app built with React, Vite, and Supabase. It allows you to add, read, update, and delete tasks in a user-friendly way.

Checkout the live demo [here](https://supabase-intro-week4.netlify.app/)

## Installation
.env.local example:
supabase credentials
```
cd .env.example .env.local
```

1. clone the repo
```bash
git clone <repository-url>
cd <repository-directory>
```

2. Install dependencis
```bash
npm install
```

3. Start the dev server:
```bash
npm run dev
```

4. Open your browser and navigate to 'http://localhost:5173' to see the app running

5. For this assignment, I added an additional controlled form to insert new rows into the Supabase `tasks` table.

### Features
- Controlled React form with validation
- Inserts a new task using `supabase-js`
- Prevents submit when the input is empty
- Displays a error message on failure
- Automatically updates the previous task list on success