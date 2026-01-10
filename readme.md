# 2PAC-SHARE 🎤

**ALL EYEZ ON YOUR FILES** - A gangster-themed file sharing app inspired by 2Pac.

## 🔥 Features

- **Red/Black gangster aesthetic** with 2Pac vibes
- **Split-screen layout**: Upload on left, Download on right
- **Drag & drop upload** or click to browse
- **6-character share codes** (e.g., "A3K9P2")
- **Copy buttons** for both code and shareable link
- **Local browser storage** - files stored in localStorage
- **File size limit**: 4.5MB per file
- **Download by code** - enter code to retrieve files

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## 📦 Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Option 3: Drag & Drop
1. Run `npm run build`
2. Go to [vercel.com](https://vercel.com)
3. Drag and drop your project folder

## 📁 Project Structure

```
2pac-share/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main app page
│   └── globals.css      # Global styles
├── package.json         # Dependencies
├── next.config.js       # Next.js config
├── tailwind.config.js   # Tailwind config
├── tsconfig.json        # TypeScript config
├── postcss.config.js    # PostCSS config
└── README.md           # This file
```

## ⚠️ Important Notes

- Files are stored in **browser localStorage** (max 5-10MB total)
- Files are **device-specific** - clearing browser data deletes files
- For production use, consider adding a backend (Firebase, Supabase, etc.)
- Current implementation is perfect for demo/personal use

## 🎯 How It Works

1. **Upload**: Drag & drop or select a file (max 4.5MB)
2. **Get Code**: Receive a 6-character share code
3. **Share**: Copy the code or full link
4. **Download**: Enter code on any device to download

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **localStorage** - File storage (browser-based)

## 📝 License

MIT

---

**THUG LIFE • KEEP YOUR FILES GANGSTA** 🔴⚫