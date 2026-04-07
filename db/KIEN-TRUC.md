# Kiến trúc Database - Chuyên nghiệp

## Nguyên tắc: Database độc lập, không nằm trong ứng dụng

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   DBeaver       │     │   PostgreSQL     │     │   Backend        │
│   (Quản lý DB)  │────▶│   (Server DB)    │◀────│   (Node.js)      │
│                 │     │   localhost:5432 │     │   Prisma Client  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

- **PostgreSQL**: Chạy độc lập (Docker hoặc cài sẵn trong máy)
- **DBeaver**: Công cụ tạo database, bảng, chạy SQL, xem/sửa dữ liệu
- **Backend**: Chỉ kết nối qua `DATABASE_URL`, không chứa file database

## Quy trình thiết lập

### 1. Khởi động PostgreSQL
```bash
npm run db:start
# Hoặc dùng PostgreSQL đã cài trong máy
```

### 2. Tạo database qua DBeaver
- Kết nối DBeaver → PostgreSQL
- Chạy: `CREATE DATABASE smart_recycling;`
- Mở `db/init.sql` → Execute (tạo bảng)
- Mở `db/seed.sql` → Execute (dữ liệu mẫu)

### 3. Cấu hình Backend
- File `backend/.env`: chỉ cần `DATABASE_URL` trỏ tới database đã tạo
- Chạy `npx prisma generate` để sinh Prisma Client (dùng cho truy vấn)

## Lưu ý
- Backend **không** chứa file database (dev.db, *.sqlite)
- Backend **không** chạy `prisma db push` — cấu trúc bảng do DBeaver/init.sql quyết định
- Prisma schema trong backend dùng để generate client, đồng bộ thủ công với init.sql khi cập nhật
