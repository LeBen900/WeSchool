# Di sản & Học sinh
## Stack
Next.js + React + TypeScript + Tailwind + Supabase PostgreSQL/Auth/Storage + GitHub/Vercel.

## Local
npm install
cp .env.example .env.local
npm run dev

## Supabase
Chạy `supabase/migrations/0001_initial.sql` trong SQL Editor. Bật Email/Password Auth. Tạo Storage bucket `uploads`. Không commit `.env`.

Tạo Admin sau khi đăng ký:
update public.users set role='admin' where email='email-admin@example.com';

## Deploy
Push GitHub → import Vercel → thêm Environment Variables → Deploy.

## Ghi chú
Bản này là nền tảng full-stack thực tế, không dùng dữ liệu giả cố định. Schema đã có các module di tích, bài viết, khảo sát, sản phẩm, Like, Vote và RLS. Các màn CRUD/upload/biểu đồ nâng cao tiếp tục triển khai trên schema này.
