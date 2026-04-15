# GitHub Copilot Instructions — Bảo tàng Dừa Sáp

> File này chứa tri thức toàn diện về dự án dành cho AI agent.
> Đọc kỹ trước khi thực hiện bất kỳ thay đổi nào.

---

## 1. Tổng quan dự án

Website bảo tàng số cho "Bảo tàng Dừa Sáp Cầu Kè, Trà Vinh" — trưng bày hiện vật, bài viết, sự kiện liên quan đến giống dừa sáp đặc sản của Trà Vinh.

| Thông tin | Giá trị |
|-----------|---------|
| Production URL | https://bao-tang-dua-sap.vercel.app |
| GitHub Repo | https://github.com/davidliuhunter/bao-tang-dua-sap |
| Supabase Project | https://supabase.com/dashboard/project/ajddsbcbrgvwdbmqtfiw |
| Supabase Project ID | `ajddsbcbrgvwdbmqtfiw` |
| Vercel Dashboard | https://vercel.com/davidliuhunter/bao-tang-dua-sap |

---

## 2. Tech Stack

| Layer | Công nghệ | Ghi chú |
|-------|-----------|---------|
| Framework | Next.js 14.2.35 (App Router) | SSR + Server Actions |
| UI | Tailwind CSS 3.4 | Custom `@layer components` |
| Database | Supabase (PostgreSQL) | RLS enabled, anon key |
| Hosting | Vercel | Auto-deploy on push to `main` |
| Language | TypeScript | Strict mode |
| Fonts | Inter + Playfair Display | Google Fonts |

---

## 3. Cấu trúc thư mục

```
bao-tang-nextjs/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── page.tsx                  # Trang chủ
│   ├── hien-vat/
│   │   ├── page.tsx              # Danh sách hiện vật (dùng ArtifactsClient)
│   │   └── [id]/page.tsx         # Chi tiết hiện vật (dùng ArtifactImageClient)
│   ├── bai-viet/
│   │   ├── page.tsx              # Danh sách bài viết
│   │   └── [id]/page.tsx         # Chi tiết bài viết
│   ├── su-kien/
│   │   ├── page.tsx              # Danh sách sự kiện
│   │   └── [id]/page.tsx         # Chi tiết sự kiện
│   ├── lien-he/page.tsx          # Form liên hệ
│   ├── dang-nhap/page.tsx        # Trang đăng nhập admin
│   └── quan-tri/                 # Admin panel (protected bằng sessionStorage)
│       ├── layout.tsx            # Admin layout + auth guard
│       ├── page.tsx              # Dashboard (thống kê + top viewed chart)
│       ├── hien-vat/page.tsx     # CRUD hiện vật + ImageUpload
│       ├── bai-viet/page.tsx     # CRUD bài viết + ImageUpload + RichTextEditor
│       ├── su-kien/page.tsx      # CRUD sự kiện
│       └── tin-nhan/page.tsx     # Quản lý tin nhắn liên hệ
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer
│   ├── PublicLayout.tsx          # Wrapper cho trang public
│   ├── ArtifactCard.tsx          # Card hiện vật
│   ├── ArticleCard.tsx           # Card bài viết
│   ├── EventCard.tsx             # Card sự kiện
│   ├── ArtifactsClient.tsx       # Client component: search + filter + pagination
│   ├── ArtifactImageClient.tsx   # Client component: hiển thị ảnh + track view
│   ├── Lightbox.tsx              # Fullscreen image lightbox (Esc to close)
│   ├── ImageUpload.tsx           # Upload ảnh lên Supabase Storage
│   ├── RichTextEditor.tsx        # Markdown toolbar editor (no deps)
│   └── ImagePlaceholder.tsx      # Placeholder khi chưa có ảnh
├── lib/
│   ├── types.ts                  # TypeScript interfaces (Artifact, Article, etc.)
│   ├── supabase.ts               # Supabase client + isConfigured flag
│   ├── data.ts                   # Read functions (getArtifacts, getArticles, etc.)
│   ├── actions.ts                # Server Actions (CRUD + uploadImage + trackView)
│   └── mock-data.ts              # Mock data dùng khi Supabase chưa cấu hình
├── supabase/
│   ├── config.toml               # Supabase CLI config
│   ├── 001_schema.sql            # Schema gốc (reference)
│   ├── 002_seed.sql              # Seed data gốc (reference)
│   ├── 003_view_count_and_storage.sql  # Migration 003 (reference)
│   └── migrations/               # Migration files cho auto-deploy
│       ├── 20240101000000_schema.sql
│       ├── 20240101000001_seed.sql
│       └── 20260415000000_view_count_and_storage.sql
└── .github/
    ├── workflows/migrate.yml     # GitHub Actions: auto-apply migrations
    └── copilot-instructions.md   # File này
```

---

## 4. Database Schema

### Bảng chính

```sql
-- categories: Danh mục hiện vật
id uuid PK, name text, description text, created_at timestamptz

-- collections: Bộ sưu tập
id uuid PK, name text, description text, category_id uuid FK, created_at timestamptz

-- artifacts: Hiện vật (bảng chính)
id uuid PK, name text, description text, origin text, era text,
material text, collection_id uuid FK, status text CHECK('draft','published'),
image_url text, view_count integer DEFAULT 0, created_at timestamptz

-- articles: Bài viết
id uuid PK, title text, content text, summary text,
status text CHECK('draft','published'), image_url text, created_at timestamptz

-- events: Sự kiện
id uuid PK, title text, description text, location text,
start_date date, end_date date, status text, image_url text, created_at timestamptz

-- contact_messages: Tin nhắn liên hệ
id uuid PK, full_name text, email text, phone text, message text,
is_read boolean DEFAULT false, created_at timestamptz
```

### RLS Policy
- Tất cả bảng: `public read` (select using true)
- Tất cả bảng: `anon write` (all using true) — demo mode, không cần auth
- `contact_messages`: chỉ insert + select + update

### Supabase Functions
```sql
-- Tăng view_count an toàn (atomic)
public.increment_artifact_view(artifact_id uuid) returns void
  SECURITY DEFINER, granted to anon
```

### Supabase Storage
- Bucket: `museum-images` (public)
- Policies: public read, anon insert, anon delete

---

## 5. Authentication (Admin)

Admin panel dùng **sessionStorage** đơn giản, KHÔNG dùng Supabase Auth.

```
URL đăng nhập: /dang-nhap
Username: admin
Password: đọc từ NEXT_PUBLIC_ADMIN_PASSWORD (env var)
```

- Auth guard nằm trong `app/quan-tri/layout.tsx`
- Sau khi login: `sessionStorage.setItem('isAdmin', 'true')`
- Kiểm tra: `sessionStorage.getItem('isAdmin') === 'true'`

---

## 6. Supabase Client Setup

```typescript
// lib/supabase.ts
export const isConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export const supabase = isConfigured ? createClient(...) : null;
```

Khi `isConfigured = false`, app dùng mock data từ `lib/mock-data.ts` — cho phép chạy local không cần Supabase.

---

## 7. Environment Variables

### Vercel (Production)
| Tên biến | Mô tả |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ajddsbcbrgvwdbmqtfiw.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | JWT anon key (xem PROJECT-INFO.md) |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Password đăng nhập admin |

### Local (`.env.local`)
Xem file `.env.local.example` để biết format.

---

## 8. CI/CD Pipeline

### Vercel (code deploy)
- Tự động deploy mỗi khi push lên branch `main`
- Không cần cấu hình thêm

### GitHub Actions (database migrations)
File: `.github/workflows/migrate.yml`

- **Trigger**: push lên `main` có thay đổi trong `supabase/migrations/` hoặc `migrate.yml`
- **Cơ chế**: Gọi Supabase Management API (`/v1/projects/{ref}/database/query`)
- **Tracking**: Bảng `supabase_migrations.schema_migrations` (tự tạo)
- **Secret cần thiết**: `SUPABASE_ACCESS_TOKEN` (Personal Access Token từ supabase.com/dashboard/account/tokens)
- **Không cần**: `SUPABASE_DB_PASSWORD` (đã loại bỏ do vấn đề IPv6 và SASL)

#### Quy trình thêm migration mới
1. Tạo file `supabase/migrations/YYYYMMDDHHMMSS_ten_migration.sql`
2. Viết SQL vào file
3. `git add` + `git commit` + `git push origin main`
4. GitHub Actions tự apply lên Supabase

#### Lý do chọn Management API thay CLI
- Supabase CLI dùng direct connection `db.[ref].supabase.co:5432` → resolve ra IPv6 → GitHub Actions runner không có IPv6
- Session pooler dùng SASL auth với username format đặc biệt → không tương thích
- Management API chỉ cần Access Token → ổn định nhất

---

## 9. Components chính

### ArtifactsClient
- `"use client"` — search + filter + pagination
- Props: `artifacts: Artifact[]`, `collections: Collection[]`
- Pagination: 8 items/page, useMemo filtering

### ArtifactImageClient
- `"use client"` — hiển thị ảnh + tự động track view
- `useEffect` gọi `trackArtifactView(id)` khi mount
- Tích hợp `Lightbox` component

### ImageUpload
- Upload file lên Supabase Storage bucket `museum-images`
- Validation: max 5MB, chỉ jpg/jpeg/png/webp/gif
- Gọi Server Action `uploadImage(formData)`

### RichTextEditor
- Custom Markdown toolbar: Bold, Italic, H2, H3, List, Numbered List, Link
- Không dùng thư viện ngoài — thuần JavaScript `selectionStart/End`
- Trả về Markdown string

---

## 10. Coding Conventions

- **Server Actions**: tất cả nằm trong `lib/actions.ts`, `'use server'` ở đầu file
- **Data fetching**: tất cả nằm trong `lib/data.ts`, functions async với Supabase queries
- **Types**: tất cả interface nằm trong `lib/types.ts`
- **Client components**: thêm `"use client"` directive, tên file kết thúc bằng `Client.tsx`
- **Status field**: luôn là `'draft' | 'published'` (type `PublishStatus`)
- **Image**: luôn kiểm tra `image_url` trước khi render, dùng `ImagePlaceholder` khi null
- **Tailwind**: dùng `@layer components` cho class tái sử dụng (`.btn-primary`, `.card-hover`, v.v.)

---

## 11. Lịch sử phát triển

| Giai đoạn | Nội dung |
|-----------|----------|
| Phase 1 | Build toàn bộ website (Next.js + Tailwind + Supabase + Vercel) |
| Phase 2 | 6 tính năng mới: Upload ảnh, Tìm kiếm/lọc/phân trang, Lightbox, Rich text editor, Thống kê view |
| Phase 3 | CI/CD: GitHub Actions auto-apply Supabase migrations qua Management API |

---

## 12. Gotchas đã gặp

- **Supabase DB direct host → IPv6**: `db.[ref].supabase.co` resolve ra IPv6, GitHub Actions runner không có IPv6 → dùng Management API
- **Session pooler SASL**: pooler yêu cầu username format `postgres.PROJECT_REF`, password auth vẫn fail → bỏ hẳn
- **Migration bootstrap**: 3 migrations đầu đã apply thủ công → phải insert vào tracking table khi bootstrap để tránh chạy lại
- **Admin Form**: `onFinish(values)` của Ant Design chỉ trả field có `Form.Item` registered — field `id` edit phải có hidden `Form.Item`
- **Duplicate component**: khi dùng replace_string_in_file phải cẩn thận tránh duplicate component definition trong cùng file
