# Database PostgreSQL (Độc lập - Quản lý qua DBeaver)

**Database nằm ngoài ứng dụng.** Tạo và quản lý qua DBeaver, backend chỉ kết nối qua `DATABASE_URL`.

📌 **Hướng dẫn chi tiết:** Xem [HUONG-DAN-TUNG-BUOC.md](HUONG-DAN-TUNG-BUOC.md)

## Khởi động PostgreSQL

```bash
# Chạy PostgreSQL
docker compose -f db/docker-compose.yml up -d

# Xem log
docker compose -f db/docker-compose.yml logs -f

# Dừng
docker compose -f db/docker-compose.yml down
```

## Thông tin kết nối

| Tham số | Giá trị |
|---------|---------|
| Host | localhost |
| Port | 5432 |
| Database | smart_recycling |
| User | postgres |
| Password | postgres |

**Connection string:**
```
postgresql://postgres:postgres@localhost:5432/smart_recycling
```

## Hai phiên bản thiết kế

| File | Mô tả |
|------|-------|
| `init.sql` + `seed.sql` | Thiết kế hiện tại (PascalCase, cuid) – dùng với ứng dụng đang chạy |
| `init_mau.sql` + `seed_mau.sql` | Thiết kế theo mẫu ERD (snake_case, bigint, authority, audit fields) – xem `ERD-MAU.md` |

## Tạo database và bảng (DBeaver)

Backend **không** tạo bảng tự động. Dùng DBeaver chạy SQL:

### Bước 1: Tạo database
```sql
-- Kết nối tới database postgres trước
CREATE DATABASE smart_recycling;
```

### Bước 2: Chạy init
- **Thiết kế cũ:** `db/init.sql` → Execute Script (Ctrl+Alt+X)
- **Thiết kế mẫu ERD:** `db/init_mau.sql` → Execute Script

### Bước 3: Chạy seed (dữ liệu mẫu)
- **Thiết kế cũ:** `db/seed.sql`
- **Thiết kế mẫu:** `db/seed_mau.sql`
