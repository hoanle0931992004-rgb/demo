# KẾ HOẠCH TIẾP THEO - Hệ thống Thu gom rác tái chế (theo detai.md)

## 1. Tổng quan hiện trạng

| Nhóm | Trạng thái | Ghi chú |
|------|------------|---------|
| 3.1 Guest | ✅ Hoàn thành | Trang chủ, Hướng dẫn, Đăng ký, Đăng nhập |
| 3.2 Customer | ✅ Hoàn thành | Tài khoản, Tạo yêu cầu (AI), Theo dõi, Điểm, Đổi thưởng |
| 3.3 Staff | ✅ Hoàn thành | Xử lý yêu cầu, Nhận, Hoàn thành, Xác minh, Thống kê |
| 3.4 Admin | ✅ Hoàn thành | Quản lý user, loại rác, phần thưởng, phân quyền |

---

## 2. Các việc nên làm tiếp (ưu tiên)

### 2.1 Cải thiện UX/UI
- [ ] **Trang Điểm (3.2.4):** Thêm "Bảng quy đổi điểm" – hiển thị điểm/kg theo từng loại rác (từ WasteType.pointsPerKg)
- [ ] **Chi tiết yêu cầu (Staff):** Thêm dropdown chọn **Loại rác xác minh** (verifiedTypeId) khi hoàn thành – hiện chỉ có khối lượng
- [ ] **Thống kê (3.3.5):** Thêm "Hiệu suất thu gom" – số yêu cầu/người, thời gian xử lý trung bình (nếu có dữ liệu)

### 2.2 Kiểm tra và sửa lỗi
- [ ] Kiểm tra ổn định: backend không restart liên tục (đã bỏ --watch)
- [ ] Kiểm tra đăng nhập với tài khoản bị khóa (isLocked)
- [ ] Kiểm tra quên mật khẩu → gửi email (hiện mới tạo link, chưa gửi email thật)

### 2.3 Tài liệu
- [ ] Cập nhật README.md với hướng dẫn chạy, cấu trúc project
- [ ] Ghi chú API (endpoints) cho tài liệu đồ án

---

## 3. Các việc tùy chọn (nếu còn thời gian)

### 3.1 Gửi email thật cho quên mật khẩu
- Cấu hình Nodemailer / SendGrid
- Gửi link reset qua email thay vì chỉ trả về trong response

### 3.2 Lịch sử trạng thái
- Hiển thị StatusHistory trong Chi tiết yêu cầu (ai cập nhật, khi nào)

### 3.3 Export báo cáo
- Xuất thống kê ra Excel/PDF (ngày/tuần/tháng)

### 3.4 Cải thiện AI
- Đảm bảo model local (`du_doan.py`) chạy ổn định
- Test với nhiều loại ảnh rác khác nhau

---

## 4. Luồng kiểm thử theo detai.md

```
1. Guest → Xem trang chủ, hướng dẫn → Đăng ký → Đăng nhập
2. Customer → Tạo yêu cầu (có ảnh + AI) → Xem danh sách → Hủy (nếu PENDING)
3. Staff → Xem danh sách yêu cầu → Nhận yêu cầu → Hoàn thành (xác minh khối lượng)
4. Hệ thống → Tự động cộng điểm khi COMPLETED
5. Customer → Xem điểm → Đổi thưởng → Xem lịch sử đổi thưởng
6. Admin → Quản lý user (thêm, sửa, khóa, đổi vai trò) → Quản lý loại rác → Quản lý phần thưởng
7. Staff/Admin → Thống kê (ngày/tuần/tháng)
```

---

## 5. File tham chiếu

| File | Mục đích |
|------|----------|
| `detai.md` | Yêu cầu chức năng gốc |
| `db/init.sql` | Schema database |
| `docs/class-diagram-data.md` | Dữ liệu class diagram |
| `frontend/src/UngDung.jsx` | Routing, phân quyền |
