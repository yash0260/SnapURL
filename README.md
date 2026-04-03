<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<h1 align="center">✂️ SnapURL - URL Shortener</h1>

<p align="center">
  A modern URL shortener with QR code generation, click analytics, and device tracking.
</p>

<p align="center">
  <a href="https://snap-url-r5wd.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐 Live Demo-snap--url--r5wd.vercel.app-green?style=for-the-badge" />
  </a>
  &nbsp;
  <a href="https://github.com/yash0260/SnapURL" target="_blank">
    <img src="https://img.shields.io/badge/📂 GitHub-yash0260/SnapURL-181717?style=for-the-badge&logo=github" />
  </a>
</p>

---

## ✨ Features

- 🔗 **URL Shortening** — Convert long URLs into clean, short links instantly
- 🎨 **Custom URLs** — Create personalized short links with your own alias
- 📊 **Click Analytics** — Track total clicks with real-time stats
- 📍 **Location Tracking** — See which cities your clicks come from
- 💻 **Device Tracking** — Mobile vs Desktop breakdown via pie chart
- 📱 **QR Code Generation** — Auto-generate downloadable QR codes for every link
- 🔐 **Authentication** — Secure login/signup via Supabase Auth
- 🌐 **Public Redirects** — Short links work for anyone, no login required
- 🗑️ **Link Management** — Create, copy, download, and delete your links

---

## 🛠️ Tech Stack

### Frontend
| Technology | Usage |
|-----------|-------|
| React 18 + Vite | UI Framework |
| Tailwind CSS | Styling |
| Shadcn UI | Component Library |
| Recharts | Analytics Charts |
| React Router v6 | Client-side Routing |

### Backend & Services
| Technology | Usage |
|-----------|-------|
| Supabase | Database + Authentication |
| Supabase Auth | Login / Signup |
| Supabase Storage | QR Code Storage |

### Deployment
| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Database | Supabase Cloud |
| Auth | Supabase Cloud |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── device-stats.jsx        # Device info pie chart
│   ├── location-stats.jsx      # Location analytics chart
│   ├── require-auth.jsx        # Protected route wrapper
│   └── ui/                     # Shadcn UI components
│
├── db/
│   ├── apiClicks.js            # Click tracking & analytics
│   ├── apiUrls.js              # URL CRUD operations
│   └── supabase.js             # Supabase client configuration
│
├── hooks/
│   └── use-fetch.js            # Custom data fetching hook
│
├── layouts/
│   └── app-layout.jsx          # Main application layout
│
├── pages/
│   ├── auth.jsx                # Login / Signup page
│   ├── dashboard.jsx           # User dashboard
│   ├── landing.jsx             # Landing / Home page
│   ├── link.jsx                # Link details & analytics
│   └── redirect-link.jsx       # Short URL redirect handler
│
└── context.jsx                 # Global state management (UrlState)
```
---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Supabase account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yash0260/SnapURL.git

# 2. Navigate to project directory
cd SnapURL

# 3. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗄️ Supabase Setup

### Tables Required:

#### `urls` Table
```sql
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title VARCHAR(255),
  original_url TEXT NOT NULL,
  short_url VARCHAR(50) UNIQUE,
  custom_url VARCHAR(50) UNIQUE,
  qr TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `clicks` Table
```sql
CREATE TABLE clicks (
  id SERIAL PRIMARY KEY,
  url_id INTEGER REFERENCES urls(id) ON DELETE CASCADE,
  city VARCHAR(100),
  country VARCHAR(100),
  device VARCHAR(20) DEFAULT 'desktop',
  clicked_at TIMESTAMP DEFAULT NOW()
);
```

### RLS Policies

```sql
-- Allow anyone to read URLs (for public redirects)
CREATE POLICY "Anyone can read URLs"
ON urls FOR SELECT
USING (true);

-- Allow authenticated users to insert URLs
CREATE POLICY "Authenticated users can insert URLs"
ON urls FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow anyone to insert clicks (analytics)
CREATE POLICY "Anyone can insert clicks"
ON clicks FOR INSERT
WITH CHECK (true);

-- Allow users to read their own click stats
CREATE POLICY "Users can read clicks for their URLs"
ON clicks FOR SELECT
USING (true);
```

---

## 📦 Deployment (Vercel)

```bash
# Build for production
npm run build

# Deploy via Git (auto-deploy on push)
git add .
git commit -m "Deploy"
git push
```

**Environment Variables on Vercel:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### `vercel.json` Configuration

```json
{
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/index.html"
    }
  ]
}
```


---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js 18+
- Supabase account

### 1. Clone Repository

```bash
git clone https://github.com/yash0260/SnapURL.git
cd SnapURL
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Locally

```bash
npm run dev
# Runs on http://localhost:5173
```

---

## 🔑 Environment Variables

### `.env`

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> 🔗 Get your keys at: [https://supabase.com/dashboard](https://supabase.com/dashboard)

---

## 🗄️ Supabase Setup

### `urls` Table

```sql
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title VARCHAR(255),
  original_url TEXT NOT NULL,
  short_url VARCHAR(50) UNIQUE,
  custom_url VARCHAR(50) UNIQUE,
  qr TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### `clicks` Table

```sql
CREATE TABLE clicks (
  id SERIAL PRIMARY KEY,
  url_id INTEGER REFERENCES urls(id) ON DELETE CASCADE,
  city VARCHAR(100),
  country VARCHAR(100),
  device VARCHAR(20) DEFAULT 'desktop',
  clicked_at TIMESTAMP DEFAULT NOW()
);
```

### RLS Policies

```sql
-- Allow anyone to read URLs (public redirects)
CREATE POLICY "Anyone can read URLs"
ON urls FOR SELECT USING (true);

-- Authenticated users can insert URLs
CREATE POLICY "Authenticated users can insert"
ON urls FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Anyone can insert clicks (anonymous analytics)
CREATE POLICY "Anyone can insert clicks"
ON clicks FOR INSERT WITH CHECK (true);

-- Anyone can read clicks (for stats)
CREATE POLICY "Anyone can read clicks"
ON clicks FOR SELECT USING (true);
```

---

## 🚀 Deployment (Vercel)

### 1. Push to GitHub

```bash
git add .
git commit -m "Deploy: SnapURL"
git push
```

### 2. Import on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy**!

### `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📊 Analytics Breakdown

| Metric | Description |
|--------|-------------|
| **Total Clicks** | Total number of times link was clicked |
| **Location Data** | City-wise click distribution (line chart) |
| **Device Info** | Mobile vs Desktop split (pie chart) |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Yash**
- GitHub: [@yash0260](https://github.com/yash0260)
---

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) — Database & Authentication
- [Shadcn UI](https://ui.shadcn.com/) — UI Components
- [Recharts](https://recharts.org/) — Analytics Charts
- [Vercel](https://vercel.com/) — Hosting & Deployment

---

<p align="center">Made with ❤️ by Yash</p>
