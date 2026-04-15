-- ============================================================
-- Bảo tàng Dừa Sáp - Supabase Database Schema
-- Migration 001: Initial schema
-- ============================================================

-- Danh mục
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  created_at  timestamptz not null default now()
);

-- Bộ sưu tập
create table if not exists public.collections (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- Hiện vật
create table if not exists public.artifacts (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text,
  origin        text,
  era           text,
  material      text,
  collection_id uuid references public.collections(id) on delete set null,
  status        text not null default 'draft' check (status in ('draft', 'published')),
  image_url     text,
  created_at    timestamptz not null default now()
);

-- Bài viết
create table if not exists public.articles (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  content    text not null default '',
  summary    text,
  status     text not null default 'draft' check (status in ('draft', 'published')),
  image_url  text,
  created_at timestamptz not null default now()
);

-- Sự kiện
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  location    text,
  start_date  date,
  end_date    date,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  image_url   text,
  created_at  timestamptz not null default now()
);

-- Tin nhắn liên hệ
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  full_name  text not null,
  email      text not null,
  phone      text,
  message    text not null,
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security (RLS)
-- Cho demo: cho phép đọc công khai, ghi qua anon key
-- ============================================================

alter table public.categories        enable row level security;
alter table public.collections       enable row level security;
alter table public.artifacts         enable row level security;
alter table public.articles          enable row level security;
alter table public.events            enable row level security;
alter table public.contact_messages  enable row level security;

-- Cho phép đọc tất cả (public)
create policy "public read categories"       on public.categories        for select using (true);
create policy "public read collections"      on public.collections       for select using (true);
create policy "public read artifacts"        on public.artifacts         for select using (true);
create policy "public read articles"         on public.articles          for select using (true);
create policy "public read events"           on public.events            for select using (true);

-- Cho phép ghi từ anon key (demo - không cần auth)
create policy "anon write categories"        on public.categories        for all using (true) with check (true);
create policy "anon write collections"       on public.collections       for all using (true) with check (true);
create policy "anon write artifacts"         on public.artifacts         for all using (true) with check (true);
create policy "anon write articles"          on public.articles          for all using (true) with check (true);
create policy "anon write events"            on public.events            for all using (true) with check (true);
create policy "anon insert contact"          on public.contact_messages  for insert with check (true);
create policy "anon read contact"            on public.contact_messages  for select using (true);
create policy "anon update contact"          on public.contact_messages  for update using (true) with check (true);
