# LANADEVPORTFOLIO

A modern, high-performance personal portfolio website built with **React**, **Vite**, and **Supabase**. It features a fully dynamic content management system (CMS) allowing you to update your portfolio content directly from an admin dashboard without touching the code.

![Portfolio Preview](https://dltxynxaxkttooidnred.supabase.co/storage/v1/object/public/portofolio-assets/hero.png)

## ✨ Features

- **Dynamic Content**: Modify Hero, About, Services, Projects, and Contact info via the Admin Panel.
- **Admin Dashboard**: Secure `/admin` route to manage all website content.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Performance**: Built with Vite for lightning-fast loading and development.
- **Animations**: Smooth transitions and effects using `framer-motion`.
- **Contact Form**: Functional contact form powered by Supabase.
- **CV Download**: Upload and manage your CV link dynamically.

## 🛠️ Tech Stack

- **Frontend**: React, Vite
- **Styling**: Modern CSS3 (Variables, Flexbox, Grid), Framer Motion
- **Backend/Database**: Supabase (PostgreSQL)
- **Deployment**: GitHub Pages (supported)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A [Supabase](https://supabase.com/) account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/itslanaa/lana-devportfolio.git
    cd lana-devportfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory (or copy `.env.example`):
    ```bash
    cp .env.example .env
    ```
    Fill in your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Database Setup (Supabase):**
    - Go to your Supabase Dashboard -> **SQL Editor**.
    - Copy the contents of `supabase_schema.sql` from this project.
    - Paste it into the editor and click **Run**.
    - This will create all necessary tables (hero_content, projects, etc.) and set up standard security policies.

5.  **Run Locally:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view the site.

## 🛡️ Admin Panel

To access the admin panel, navigate to `/admin` (e.g., `http://localhost:5173/admin`).
*Note: Currently configured for open access or basic client-side protection. For production, ensure you implement proper RLS policies and Authentication in Supabase.*

## 📄 License

MIT License

Copyright (c) 2025 Kaka Maulana Abdillah

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
