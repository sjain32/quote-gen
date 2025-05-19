# ✨ InspiroBoard

A beautifully crafted web application that displays inspiring and interesting quotes. Users can fetch a new random quote, filter quotes by theme (e.g., **Motivation**, **Humor**, **Tech**), and interact with a responsive UI — all without a full page reload.

---

## 🚀 Features

- 🎯 Fetch quotes from a third-party API or a local JSON file.
- 🔄 Request new random quotes without page reloads.
- 🎭 Filter quotes by categories like **Motivation**, **Humor**, and **Tech**.
- 💅 UI built using **ShadCN UI** components and **Tailwind CSS**.
- ⚡ Differentiates Server and Client components for optimal performance.
- 📱 Fully responsive and mobile-friendly layout.

---

## 🛠 Tech Stack

| Category             | Tools Used                                  |
|----------------------|---------------------------------------------|
| Framework            | [Next.js (App Router)](https://nextjs.org/) |
| Styling              | [Tailwind CSS](https://tailwindcss.com/)    |
| UI Components        | [ShadCN UI](https://ui.shadcn.com/)         |
| State Management     | React Hooks (useState, useEffect)           |
| Data Source          | Local JSON / Public Quotes API              |
| Hosting              | [Vercel](https://vercel.com/)               |

---

## 📚 Learning Outcomes

- Fetching data using **Server Components** and handling updates with **Client Components**.
- Managing basic UI state with React Hooks.
- Using **ShadCN UI** for clean, component-based UI design.
- Handling APIs or local data for dynamic rendering.
- Understanding the **Server vs Client** component distinction in Next.js App Router.

---

## 📦 Project Structure
```text
src/
├── app/
│ ├── api/ # API routes (if any)
│ ├── source/ # Source assets or modules
│ ├── favicon.ico # Site icon
│ ├── globals.css # Global styles (Tailwind base)
│ ├── layout.tsx # Root layout (App Router)
│ └── page.tsx # Home page (Server Component)
├── components/
│ └── ui/ # UI components
│ ├── Aurora.tsx
│ ├── Favorite.tsx
│ └── QuoteDisplay.tsx
├── data/
│ └── quotes.json # Static quote data file
├── lib/
│ ├── actions.ts # Server/Client actions
│ └── utils.ts # Utility functions
├── types/ # Type definitions (if any)
.eslintrc.json # ESLint config
.gitignore # Git ignore file
```
---

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sjain32/quote-gen.git
cd quote-gen

---

## Install Dependencies

npm install

##Run the development server
npm run dev

```
MIT License

Copyright (c) 2025 Samyak Jain

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.


##📬 Connect with Me
🔗 GitHub: @sjain32

💼 LinkedIn: Samyak Jain

📧 Email: samy032016@gmail.com