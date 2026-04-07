# Kết nối DBeaver với PostgreSQL

## Thông tin (khớp với backend/.env và Docker)

| Trường | Giá trị |
|--------|---------|
| Host | `localhost` |
| Port | `5432` |
| Database | `smart_recycling` |
| Username | `postgres` |
| Password | `123123` |

> **Lưu ý:** Docker và backend đều dùng password `123123`. Nếu dùng PostgreSQL cài sẵn, dùng mật khẩu bạn đã đặt khi cài.

---

## Các bước trong DBeaver

### 1. Tạo kết nối mới
- **Database** → **New Database Connection** → **PostgreSQL** → **Next**

### 2. Điền thông tin
- **Host:** localhost  
- **Port:** 5432  
- **Database:** smart_recycling  
- **Username:** postgres  
- **Password:** 123123  

### 3. Lưu mật khẩu
- Tick **Save password** (hoặc **Save password locally**) nếu muốn DBeaver nhớ

### 4. Test Connection
- Bấm **Test Connection**
- Nếu lần đầu: chọn **Download** khi DBeaver hỏi tải driver PostgreSQL
- Bấm **Finish** khi thấy "Connected"

---

## Lỗi thường gặp

### "FATAL: role 'xxx' does not exist"
→ Dùng đúng **Username: postgres** (user mặc định của PostgreSQL)

### "FATAL: password authentication failed"
→ Kiểm tra **Password** – có thể cần thử:
- `123123` (nếu đặt khi cài)
- `postgres` (một số bản cài mặc định)
- Hoặc mật khẩu bạn đã đặt khi cài PostgreSQL

### "Connection refused" / "Could not connect"
→ Đảm bảo **PostgreSQL đang chạy**:
- Windows: Mở **Services** → tìm "postgresql" → Start nếu đang Stopped
- Hoặc: **pgAdmin** / **SQL Shell** mở được = PostgreSQL đang chạy

### "Database smart_recycling does not exist"
→ Chạy `npx prisma db push` trong thư mục backend để tạo database và bảng.
