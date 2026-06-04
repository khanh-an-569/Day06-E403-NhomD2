# CareerFit AI — Codebase

Ứng dụng phân tích độ tương thích CV ↔ JD và tạo lộ trình học tập cá nhân hoá bằng AI.

🌐 **Demo:** https://career-path-coach-46.vercel.app/

---

## Tech Stack

| Thành phần | Công nghệ |
|---|---|
| Framework | React 19 + TanStack Start (Vite) |
| Ngôn ngữ | TypeScript |
| UI | Tailwind CSS v4 + shadcn/ui (Radix UI) |
| Database | Supabase |
| AI | OpenRouter (gpt-4o-mini) |
| Fetch JD từ URL | Tavily Extract API |
| Package manager | Bun (hoặc npm) |

---

## Cài đặt & Chạy

### 1. Cài thư viện

```bash
bun install
# hoặc: npm install
```

### 2. Cấu hình biến môi trường

Tạo file `.env` từ file mẫu:

```bash
cp .env.example .env
```

Điền các giá trị sau vào `.env`:

```env
# Supabase
SUPABASE_URL=...
SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...

# AI (OpenRouter)
OPENROUTER_API_KEY=...
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=openai/gpt-4o-mini

# Fetch JD từ URL (Tavily)
TAVILY_API_KEY=...
```

### 3. Chạy ở môi trường local

```bash
bun dev
# hoặc: npm run dev
```

Truy cập: **http://localhost:5173** (hoặc địa chỉ localhost hiện ra trong terminal)

---

## Cấu trúc thư mục chính

```
src/
├── routes/
│   ├── index.tsx       # Trang nhập CV + JD
│   └── analysis.tsx    # Trang hiển thị kết quả phân tích
├── components/         # Các UI component dùng chung
├── hooks/              # Custom React hooks
├── integrations/       # Kết nối Supabase
├── lib/                # Tiện ích, helper functions
└── server.ts           # Server-side API (gọi AI, xử lý dữ liệu)
```

---

## Luồng hoạt động

```
Người dùng nhập CV + JD
        ↓
   Server parse JD → tóm tắt persona + requirements
        ↓
   Server chấm CV theo rubric 8 tiêu chí (JSON structured)
        ↓
   Server tính lại fitScore từ breakdown (tránh AI bịa điểm)
        ↓
Hiển thị report tại /analysis
(điểm tổng · bảng 8 tiêu chí · 2 cột CV/JD · lộ trình học)
```

---

## Lệnh thường dùng

```bash
bun dev          # Chạy local
bun build        # Build production
bun lint         # Kiểm tra code
bun format       # Format code (Prettier)
```
