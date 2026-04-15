-- ============================================================
-- Migration 003: view_count + Supabase Storage + RPC
-- Chạy trong Supabase SQL Editor sau khi đã chạy 001 và 002
-- ============================================================

-- 1. Thêm cột view_count vào bảng artifacts
alter table public.artifacts
  add column if not exists view_count integer not null default 0;

-- 2. Tạo function RPC để tăng view_count an toàn (atomic)
create or replace function public.increment_artifact_view(artifact_id uuid)
returns void
language sql
security definer
as $$
  update public.artifacts
  set view_count = view_count + 1
  where id = artifact_id;
$$;

-- 3. Cấp quyền gọi RPC cho anon
grant execute on function public.increment_artifact_view(uuid) to anon;

-- ============================================================
-- Supabase Storage: tạo bucket lưu ảnh
-- (Chạy phần này riêng hoặc tạo bucket thủ công trong Dashboard)
-- ============================================================

-- Tạo bucket 'museum-images' nếu chưa có
insert into storage.buckets (id, name, public)
values ('museum-images', 'museum-images', true)
on conflict (id) do nothing;

-- Policy: cho phép đọc công khai
create policy "public read museum-images"
  on storage.objects for select
  using (bucket_id = 'museum-images');

-- Policy: cho phép upload từ anon (demo)
create policy "anon upload museum-images"
  on storage.objects for insert
  with check (bucket_id = 'museum-images');

-- Policy: cho phép xóa từ anon (demo)
create policy "anon delete museum-images"
  on storage.objects for delete
  using (bucket_id = 'museum-images');
