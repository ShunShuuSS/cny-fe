# 🧧 CNY Invitation System - Frontend

Interactive Chinese New Year invitation system with festive animations, lucky draw, and admin dashboard.

## ✨ Features

- **🏮 Festive CNY Theme**: Red/gold color scheme with floating lanterns and cherry blossoms
- **🧧 Interactive Red Envelope Lucky Draw**: Animated prize reveal with confetti effects
- **📱 Mobile-First Responsive Design**: Touch-optimized for all devices
- **🔐 Secure Admin Dashboard**: JWT authentication with HttpOnly cookies
- **⚡ Modern Tech Stack**: Next.js 16, Framer Motion, TailwindCSS v4

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Backend API running (see `cny-be` folder)

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8787
```

Replace with your Cloudflare Worker URL in production.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## 📂 Project Structure

```
app/
├── page.tsx                    # Landing page
├── [slug]/page.tsx             # Public invitation flow
├── admin/
│   ├── login/page.tsx          # Admin login
│   └── dashboard/page.tsx      # Admin dashboard
└── globals.css                 # CNY color palette

components/
├── invitation/
│   ├── InvitationStart.tsx     # Welcome screen
│   ├── InvitationForm.tsx      # User form
│   ├── LuckyDraw.tsx           # Red envelope animation
│   └── ResultDisplay.tsx       # Prize reveal
└── decorations/
    ├── FloatingLanterns.tsx    # Animated lanterns
    └── CherryBlossoms.tsx      # Falling petals

lib/
├── api.ts                      # API service layer
├── utils.ts                    # Utility functions
└── hooks/
    ├── useAuth.ts              # Admin authentication
    └── useInvitation.ts        # Invitation state
```

## 🎨 CNY Theme

Custom Tailwind colors defined in `globals.css`:

- `cny-red`: #DC2626
- `cny-gold`: #F59E0B
- `cny-crimson`: #B91C1C

## 🎯 User Flow

### Public Invitation

1. User visits `/[slug]` with invitation link
2. Welcome screen with CNY greeting
3. Fill in basic information
4. Tap red envelope for lucky draw
5. Confetti animation reveals prize

### Admin Dashboard

1. Login at `/admin/login`
2. View all invitations
3. Create new invitations
4. Toggle invitation status (active/inactive)
5. View user participation data

## 🔐 Security

- JWT stored in HttpOnly cookies (not localStorage)
- Session data in sessionStorage only
- CORS credentials included in all API calls
- 401 auto-redirect for protected routes

## 🎭 Animations

Powered by Framer Motion:

- Floating lanterns (infinite loop)
- Cherry blossom petals (falling)
- Red envelope opening sequence
- Confetti burst on prize reveal
- Smooth page transitions

## 📱 Responsive Design

- Desktop: Full animations and effects
- Tablet: Optimized layouts
- Mobile: Touch-friendly interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 🔗 API Integration

All API calls use `credentials: "include"` for cookie-based auth:

```typescript
fetch(url, {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```

## 📝 Notes

- Session persists during browser session only
- Lucky draw limited to once per session
- Admin requires valid JWT cookie
- Backend must support CORS with credentials

## 🎉 Happy Chinese New Year!

恭喜发财 🧧 新年快乐
