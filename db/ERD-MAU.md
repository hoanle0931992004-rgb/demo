# Thiết kế CSDL theo mẫu ERD

## Cấu trúc mới (`init_mau.sql` + `seed_mau.sql`)

Thiết kế theo mẫu: **snake_case**, **audit fields**, **authority** phân quyền.

### So sánh với thiết kế cũ

| Mẫu ERD        | Áp dụng cho đề tài                      |
|----------------|-----------------------------------------|
| `user` + audit | `user` với created_by, last_modified_by |
| `authority` + `user_authority` | Phân quyền (CUSTOMER, STAFF, ADMIN) |
| `persistent_token` | Phiên đăng nhập (tùy chọn)        |
| `password_reset` | Quên mật khẩu                         |
| snake_case     | Tất cả bảng và cột                     |
| BIGSERIAL      | Id tự tăng (thay cho cuid)             |

### Các bảng

1. **authority** – Quyền: ROLE_CUSTOMER, ROLE_STAFF, ROLE_ADMIN  
2. **user** – Người dùng (login, password_hash, points, is_locked...)  
3. **user_authority** – Nối user–authority (nhiều vai trò)  
4. **password_reset** – Đặt lại mật khẩu  
5. **persistent_token** – Phiên đăng nhập  
6. **waste_type** – Loại rác  
7. **collection_request** – Yêu cầu thu gom  
8. **status_history** – Lịch sử trạng thái  
9. **reward** – Phần thưởng  
10. **reward_redemption** – Đổi thưởng  
11. **point_transaction** – Giao dịch điểm  

### Audit fields (các bảng chính)

- `created_by` VARCHAR(50)  
- `created_date` TIMESTAMP  
- `last_modified_by` VARCHAR(50)  
- `last_modified_date` TIMESTAMP  

### Cách dùng

**Option A – Database mới (chỉ dùng mẫu này):**
1. Tạo database `smart_recycling`  
2. Chạy `init_mau.sql`  
3. Chạy `seed_mau.sql`  
4. Cập nhật Prisma schema tương ứng (map sang snake_case, bigint)  

**Option B – Giữ thiết kế cũ (ứng dụng đang chạy ổn):**
- Tiếp tục dùng `init.sql` và `seed.sql` với bảng PascalCase, cuid  

### Lưu ý

- Thiết kế mẫu dùng **bigint** và **snake_case**, khác với Prisma hiện tại (cuid, camelCase).  
- Chuyển sang mẫu mới cần chỉnh Prisma schema, models và API.
