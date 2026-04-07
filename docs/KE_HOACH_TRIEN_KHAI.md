# KẾ HOẠCH TRIỂN KHAI - HỆ THỐNG THU GOM RÁC TÁI CHẾ THÔNG MINH

*Dựa trên đặc tả use case và schema DB hiện có*

---

## I. TỔNG QUAN HIỆN TRẠNG

### Đã hoàn thành
- [x] Phân tích yêu cầu (detai.md)
- [x] Đặc tả 16 use case chi tiết
- [x] Schema cơ sở dữ liệu (10 bảng, ánh xạ UC01–UC16 trong `db/schema_dbdiagram.dbml`)
- [x] Use case diagram
- [x] Sơ đồ hoạt động
- [x] Dataset huấn luyện AI (backend/dataset)

### Cần làm tiếp
- [ ] Thiết kế API
- [ ] Implement Backend
- [ ] Implement Frontend
- [ ] Tích hợp AI nhận diện rác
- [ ] Deploy

---

## II. PHÂN LOẠI USE CASE THEO NHÓM CÔNG VIỆC

### 2.1. Nhóm xác thực (Auth)
| UC | Tên | Phụ thuộc | Độ phức tạp |
|----|-----|-----------|-------------|
| UC01 | Đăng Ký | - | Trung bình |
| UC02 | Đăng Nhập | nguoi_dungs, admins | Trung bình |
| UC03 | Quên mật khẩu | password_resets, email service | Trung bình |

### 2.2. Nhóm Khách hàng
| UC | Tên | Phụ thuộc | Độ phức tạp |
|----|-----|-----------|-------------|
| UC04 | Quản lý tài khoản cá nhân | Auth | Thấp |
| UC05 | Tạo yêu cầu thu gom | loai_racs, AI | Cao |
| UC06 | Theo dõi trạng thái | yeu_cau_thu_goms | Trung bình |
| UC07 | Xem điểm | giao_dich_diems | Thấp |
| UC08 | Đổi thưởng | phan_thuongs, giao_dich_diems | Trung bình |
| UC09 | Thống kê | yeu_cau_thu_goms, giao_dich_diems | Trung bình |

### 2.3. Nhóm Nhân viên
| UC | Tên | Phụ thuộc | Độ phức tạp |
|----|-----|-----------|-------------|
| UC10 | Xem và nhận yêu cầu | yeu_cau_thu_goms | Trung bình |
| UC11 | Thu gom và xác minh | yeu_cau_thu_goms, loai_racs, giao_dich_diems | Cao |
| UC12 | Thống kê và báo cáo | yeu_cau_thu_goms | Trung bình |

### 2.4. Nhóm Admin
| UC | Tên | Phụ thuộc | Độ phức tạp |
|----|-----|-----------|-------------|
| UC13 | Quản lý người dùng | nguoi_dungs | Cao |
| UC14 | Quản lý loại rác | loai_racs | Trung bình |
| UC15 | Quản lý phân quyền | nguoi_dungs.vai_tro | Trung bình |
| UC16 | Quản lý phần thưởng | phan_thuongs | Trung bình |

---

## III. KẾ HOẠCH THỰC HIỆN CHI TIẾT

### Phase 1: Thiết lập dự án & Auth (Ưu tiên cao)
**Mục tiêu:** Có nền tảng chạy được, người dùng đăng nhập được.

| Bước | Nội dung | Deliverable |
|------|----------|-------------|
| 1.1 | Chọn stack: Backend (Node/Express hoặc NestJS), Frontend (React/Next.js), DB (PostgreSQL) | package.json, cấu trúc thư mục |
| 1.2 | Cài đặt Prisma/TypeORM, migrate schema DB | Prisma schema, migrations |
| 1.3 | UC01 – Đăng Ký: API + form | POST /api/auth/register |
| 1.4 | UC02 – Đăng Nhập: API + JWT/session | POST /api/auth/login |
| 1.5 | UC03 – Quên mật khẩu: API + gửi email | POST /api/auth/forgot-password, POST /api/auth/reset-password |
| 1.6 | Middleware xác thực, phân quyền theo vai trò | Auth guard, role guard |

### Phase 2: Nghiệp vụ Khách hàng cốt lõi
**Mục tiêu:** Khách hàng tạo yêu cầu, theo dõi, xem điểm, đổi thưởng.

| Bước | Nội dung | Deliverable |
|------|----------|-------------|
| 2.1 | UC04 – Quản lý tài khoản cá nhân | GET/PUT /api/users/me |
| 2.2 | UC14 (Admin) – Quản lý loại rác (cần trước UC05) | CRUD loai_racs |
| 2.3 | UC05 – Tạo yêu cầu thu gom (chưa AI) | POST /api/yeu-cau-thu-gom |
| 2.4 | UC06 – Theo dõi trạng thái, hủy yêu cầu | GET /api/yeu-cau-thu-gom, PATCH hủy |
| 2.5 | UC07 – Xem điểm | GET /api/users/me/diem, GET /api/giao-dich-diem |
| 2.6 | UC16 (Admin) – Quản lý phần thưởng (cần trước UC08) | CRUD phan_thuongs |
| 2.7 | UC08 – Đổi thưởng | POST /api/doi-thuong |
| 2.8 | UC09 – Thống kê cá nhân | GET /api/users/me/thong-ke |

### Phase 3: Nghiệp vụ Nhân viên
**Mục tiêu:** Nhân viên nhận yêu cầu, thu gom, xác minh, báo cáo.

| Bước | Nội dung | Deliverable |
|------|----------|-------------|
| 3.1 | UC10 – Xem và nhận yêu cầu | GET/PATCH /api/yeu-cau-thu-gom (Staff) |
| 3.2 | UC11 – Thu gom và xác minh | PATCH cập nhật loại rác, khối lượng, COMPLETED |
| 3.3 | Logic tự động: cộng điểm khi COMPLETED, gửi thông báo | Service, trigger/event |
| 3.4 | UC12 – Thống kê và báo cáo (Staff) | GET /api/staff/thong-ke |

### Phase 4: Nghiệp vụ Admin
**Mục tiêu:** Admin quản lý người dùng, loại rác, phân quyền, phần thưởng.

| Bước | Nội dung | Deliverable |
|------|----------|-------------|
| 4.1 | UC13 – Quản lý người dùng | CRUD nguoi_dungs, khóa/mở khóa |
| 4.2 | UC15 – Quản lý phân quyền | PATCH vai_tro |
| 4.3 | Hoàn thiện UC14, UC16 (nếu chưa làm ở Phase 2) | - |

### Phase 5: Tích hợp AI nhận diện rác
**Mục tiêu:** UC05 – Tải ảnh → AI gợi ý loại rác.

| Bước | Nội dung | Deliverable |
|------|----------|-------------|
| 5.1 | Xây dựng/hoàn thiện model AI từ dataset (giay, kim-loai, nhua...) | model AI, API inference |
| 5.2 | API nhận ảnh → trả về loại rác gợi ý | POST /api/ai/phan-loai-rac |
| 5.3 | Tích hợp vào form UC05 | Upload ảnh → hiển thị gợi ý |

### Phase 6: Frontend & UX
**Mục tiêu:** Giao diện đầy đủ cho 3 vai trò.

| Bước | Nội dung | Deliverable |
|------|----------|-------------|
| 6.1 | Layout chung: đăng nhập/đăng ký, routing theo vai trò | Pages: Login, Register, Dashboard |
| 6.2 | Giao diện Khách hàng: tạo yêu cầu, theo dõi, điểm, đổi thưởng, thống kê | 6–8 màn hình |
| 6.3 | Giao diện Nhân viên: yêu cầu, thu gom, thống kê | 3–4 màn hình |
| 6.4 | Giao diện Admin: quản lý người dùng, loại rác, phần thưởng, phân quyền | 4–5 màn hình |
| 6.5 | Thông báo realtime (tùy chọn) | WebSocket/polling |

### Phase 7: Kiểm thử & triển khai
**Mục tiêu:** Hệ thống ổn định, sẵn sàng triển khai.

| Bước | Nội dung | Deliverable |
|------|----------|-------------|
| 7.1 | Unit test, integration test các API quan trọng | Test coverage |
| 7.2 | Setup CI/CD (GitHub Actions, Docker) | Pipeline deploy |
| 7.3 | Deploy staging/production | URL, env config |

---

## IV. ĐỒNG BỘ ĐẶC TẢ VỚI DANH SÁCH NGƯỜI DÙNG

**Lưu ý:** Danh sách use case của người dùng có thứ tự khác (Quên mật khẩu = UC03). File `dac_ta_use_case.md` hiện có:
- UC03 = Quản lý tài khoản cá nhân
- UC11 = Quên mật khẩu

**Đề xuất:** Cập nhật `dac_ta_use_case.md` để thống nhất với bảng người dùng:
- UC03 = Quên mật khẩu
- UC04 = Quản lý tài khoản cá nhân
- UC05 = Tạo yêu cầu thu gom
- ... (trùng với bảng người dùng)

---

## V. CÁC RÀO CẢN VÀ RỦI RO

| Rủi ro | Giải pháp |
|--------|-----------|
| Gửi email (Quên mật khẩu) | Dùng Nodemailer + SMTP hoặc SendGrid, Resend |
| AI nhận diện rác | Dùng model có sẵn (TensorFlow/PyTorch) hoặc API bên thứ 3 |
| Upload ảnh | Dùng Cloudinary, S3, hoặc lưu local |
| Phân quyền phức tạp | RBAC đơn giản theo vai_tro (CUSTOMER, STAFF) + Admin riêng |

---

## VI. THỨ TỰ ƯU TIÊN GỢI Ý

1. **Phase 1** (Auth) – Nền tảng bắt buộc
2. **Phase 2** bước 2.2, 2.6 (Admin: loại rác, phần thưởng) – Dữ liệu nền
3. **Phase 2** bước 2.3–2.8 (Khách hàng) – Luồng chính
4. **Phase 3** (Nhân viên) – Hoàn thiện luồng thu gom
5. **Phase 4** (Admin còn lại)
6. **Phase 5** (AI) – Có thể làm song song hoặc sau
7. **Phase 6–7** (Frontend, Test, Deploy)
