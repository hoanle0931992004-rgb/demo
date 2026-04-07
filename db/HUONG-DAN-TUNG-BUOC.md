# Hướng dẫn từng bước - Thiết lập Database với DBeaver

## Bước 1: Khởi động PostgreSQL

### Cách A – Dùng Docker (nếu đã cài Docker)
1. Mở terminal/CMD tại thư mục `demo`
2. Chạy:
   ```
   npm run db:start
   ```
3. Đợi vài giây. Thông tin kết nối:
   - User: `postgres`
   - Password: `postgres`

### Cách B – Dùng PostgreSQL cài sẵn trong máy
1. Mở **Services** (Win + R → gõ `services.msc` → Enter)
2. Tìm service **postgresql** (hoặc **postgresql-x64-16**...)
3. Nếu đang **Stopped** → chuột phải → **Start**
4. Ghi nhớ mật khẩu user `postgres` (đã đặt khi cài đặt)

---

## Bước 2: Mở DBeaver và tạo kết nối

1. Mở **DBeaver**
2. Vào **Database** → **New Database Connection** → chọn **PostgreSQL** → **Next**
3. Điền:
   - **Host:** `localhost`
   - **Port:** `5432`
   - **Database:** `postgres` (kết nối database mặc định trước)
   - **Username:** `postgres`
   - **Password:** mật khẩu PostgreSQL của bạn (nếu dùng Docker: `postgres`)
4. Bấm **Test Connection**
   - Nếu DBeaver hỏi tải driver: chọn **Download**
   - Nếu kết nối thành công: **Finish**

---

## Bước 3: Tạo database `smart_recycling`

1. Trong DBeaver, mở kết nối vừa tạo
2. Chuột phải vào **Databases** → **Create New Database**
3. Trong **Database name** gõ: `smart_recycling`
4. Bấm **OK**
5. Đợi DBeaver tạo xong; sẽ thấy `smart_recycling` trong danh sách database

---

## Bước 4: Kết nối tới database `smart_recycling`

1. Chuột phải vào database **smart_recycling** → **SQL Editor** → **New SQL Script**
2. Hoặc: chuột phải **smart_recycling** → **Connect**

---

## Bước 5: Chạy `init.sql` (tạo bảng)

1. Trong DBeaver: **File** → **Open File** (hoặc Ctrl+O)
2. Mở file: `demo/db/init.sql`
3. Chọn đúng kết nối tới database **smart_recycling** (xem thanh/dropdown connection)
4. Bấm **Execute** (Ctrl+Enter hoặc biểu tượng Play)
5. Kiểm tra log: phải báo **Success** / **Completed**
6. Trong **Database Navigator**: mở **smart_recycling** → **Schemas** → **public** → **Tables** → sẽ thấy các bảng (User, WasteType, CollectionRequest...)

---

## Bước 6: Chạy `seed.sql` (dữ liệu mẫu)

1. **File** → **Open File**
2. Mở file: `demo/db/seed.sql`
3. Chọn kết nối tới **smart_recycling**
4. Bấm **Execute** (Ctrl+Enter)
5. Kiểm tra log: **Success**
6. Mở bảng **WasteType** và **Reward** → **View Data**: sẽ thấy dữ liệu mẫu

---

## Bước 7: Cấu hình Backend

1. Mở file `demo/backend/.env`
2. Sửa `DATABASE_URL` cho đúng với PostgreSQL của bạn:
   ```
   DATABASE_URL="postgresql://postgres:MẬT_KHẨU@localhost:5432/smart_recycling"
   ```
   - Thay `MẬT_KHẨU` bằng mật khẩu user `postgres`
   - Ví dụ: `postgresql://postgres:123123@localhost:5432/smart_recycling`

---

## Bước 8: Sinh Prisma Client và chạy ứng dụng

1. Mở terminal tại thư mục `demo`
2. Chạy:
   ```
   npm run setup
   ```
3. Chạy ứng dụng:
   ```
   npm run dev
   ```
4. Truy cập frontend (thường `http://localhost:5173` hoặc port tương tự)

---

## Tóm tắt thứ tự thao tác

| Bước | Việc cần làm |
|------|--------------|
| 1 | Khởi động PostgreSQL (Docker hoặc service) |
| 2 | Tạo kết nối trong DBeaver (DB: postgres) |
| 3 | Tạo database `smart_recycling` |
| 4 | Kết nối tới `smart_recycling` |
| 5 | Chạy `db/init.sql` |
| 6 | Chạy `db/seed.sql` |
| 7 | Cập nhật `backend/.env` (DATABASE_URL) |
| 8 | `npm run setup` và `npm run dev` |

---

## Xử lý lỗi thường gặp

| Lỗi | Nguyên nhân | Cách xử lý |
|-----|-------------|------------|
| Connection refused | PostgreSQL chưa chạy | Khởi động service hoặc `npm run db:start` |
| Password authentication failed | Sai mật khẩu | Sửa mật khẩu trong DBeaver và `.env` |
| Database smart_recycling does not exist | Chưa tạo DB | Thực hiện Bước 3 |
| relation "User" does not exist | Chưa chạy init.sql | Thực hiện Bước 5 |
| Duplicate key / ON CONFLICT | Đã chạy seed 2 lần | Bỏ qua nếu không cần thêm dữ liệu mẫu |
