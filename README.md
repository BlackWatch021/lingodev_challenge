TERMINAL47
Anonymous, ephemeral real-time chat with live translation. No signup, link-only access. Hacker terminal UI. Switch languages mid-chat—history bulk-translates instantly.

<img src="/assets/Cover.png" alt="Terminal47 Chat Interface" width="800"/>
✨ Features
 Zero-friction access - Share link, join as "Agent-47"

Real-time chat - Socket.io broadcasts

Live translation - Lingo.dev (bulk history + streaming new messages)

User presence - Live count + join/leave notifications

Room expiry - Auto-destruct countdown

Hacker terminal UI - Green monospace glow

Anonymous - No auth, localStorage userName

TypeScript - Full type safety

Mobile-responsive - Collapsible sidebar

Typing indicators - Next up!

🛠️ Tech Stack
Frontend Backend Other
Next.js 15 Express.js Socket.io
TypeScript JavaScript Lingo.dev SDK
Tailwind CSS dotenv Lucide React
localStorage CORS JetBrains Mono
🚀 Quick Start
Backend
bash
cd backend
cp .env.example .env

# Edit .env with your LINGO_DEV_API_KEY

npm install
npm run dev

# http://localhost:8000

Frontend
bash
cd frontend
cp .env.local.example .env.local

# Edit .env.local with NEXT_PUBLIC_BACKEND_URL

npm install
npm run dev

# http://localhost:3000

Environment Variables
backend/.env:

text
PORT=8000
LINGO_DEV_API_KEY=your_key_here
CLIENT_URL=http://localhost:3000
frontend/.env.local:

text
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
🧪 Test Flow
Open http://localhost:3000

Create room → Copy generated link /chat/abc123

Share link → Open in incognito → Join as anon agent

Chat → See "Agent-89 joined channel" system message

Switch language → Watch history translate instantly ✨

Timer → Red warning at 1min → Room auto-destructs

<img src="/assets/img2.png" alt="Terminal47 Chat Interface" width="800"/>

🌐 Translation Flow
text
Language Switch (SideNavBar)
↓
useEffect triggers /auth/translation/bulk
↓
allMessages[] → Lingo.dev → setAllMessages(translated)
↓
New Message → socket.on → /auth/translation/chunk → Auto-translate
📱 Demo Flow
text

1. localhost:3000 → Create room → /chat/abc123
2. Share abc123 → "Agent-89 joined channel"
3. English chat → Switch Hindi → History translates!
4. Timer 00:47 → RED warning → Room gone forever
   <img src="translation-demo.gif" alt="Live Translation Demo" width="800"/>
   🔒 Privacy First
   No database - Pure in-memory rooms

No authentication - Anonymous Agent names from localStorage

Link-only access - RoomId = your access key

Ephemeral data - Erased on expiry/disconnect

No logs - Zero persistence by design

✅ V1 Checklist
Real-time messaging (Socket.io)

User presence tracking + system messages

Live translation (bulk history + single streaming)

Room expiry countdown (accurate timer)

Hacker terminal UI (green glow, monospace)

Anonymous link-based access

Mobile-responsive sidebar

TypeScript end-to-end

Production error states (room not found)

🔮 Future Plans
V2 Features
Redis TTL room persistence

Room passwords

File/image sharing

Terminal commands (/clear, /name Agent99)

Typing indicators

Message history (last 50/room)

🙏 Credits
Lingo.dev - Lightning-fast translation SDK

Socket.io - Bulletproof real-time communication

Next.js 15 - Full-stack development joy
