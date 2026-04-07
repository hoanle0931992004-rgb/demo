// ======================
// HỆ THỐNG THU GOM RÁC TÁI CHẾ THÔNG MINH TÍCH HỢP AI
// Schema DBML tương ứng detai.md
// ======================
//
// CHỨC NĂNG PHÂN TÍCH AI (detai.md 3.2.2):
// - Customer tải ảnh rác (url_anh trong yeu_cau_thu_goms)
// - AI nhận diện loại rác → tự điền id_loai_rac
// - Người dùng có thể nhập thủ công loại rác
// - AI chỉ đóng vai trò hỗ trợ, không thay thế
//
// ÁNH XẠ BẢNG → CHỨC NĂNG DETAI.MD:
// - nguoi_dungs: 3.1 đăng ký/đăng nhập | 3.2.1 tài khoản | 3.3.1 Staff | 3.4.1 Admin | 3.4.2 quản lý user
// - loai_racs: 3.4.4 quản lý loại rác | AI nhận diện tham chiếu
// - yeu_cau_thu_goms: 3.2.2 tạo yêu cầu (ảnh+AI) | 3.2.3 theo dõi | 3.3.2 xử lý | 3.3.3 thu gom xác minh
// - phan_thuongs: 3.4.5 quản lý phần thưởng | 3.2.5 đổi thưởng
// - giao_dich_diems: 3.2.4 tích điểm/sử dụng điểm
//
// ======================

// ======================
// VAI TRÒ (role trong User: CUSTOMER | STAFF | ADMIN)
// ======================
// Ghi chú: Phân quyền theo detai.md 3.4.3

// ======================
// NGƯỜI DÙNG (User)
// ======================
// Chức năng: Guest đăng ký, đăng nhập | Customer/Staff/Admin quản lý tài khoản
Table nguoi_dungs {
  id text [pk]
  email varchar [unique, not null]
  mat_khau varchar [not null]
  ho_ten varchar [not null]
  so_dien_thoai varchar
  dia_chi text
  avatar varchar
  vai_tro varchar [not null, default: 'CUSTOMER']
  bi_khoa boolean [default: false]
  diem int [default: 0]
  ngay_tao datetime [not null]
  ngay_cap_nhat datetime [not null]
}

// ======================
// ĐẶT LẠI MẬT KHẨU
// ======================
// Chức năng: Guest quên mật khẩu (detai.md 3.1)
Table password_resets {
  id text [pk]
  id_nguoi_dung text [not null]
  token varchar [unique, not null]
  het_han datetime [not null]
  ngay_tao datetime [not null]
  ngay_cap_nhat datetime
}

// ======================
// LOẠI RÁC
// ======================
// Chức năng: Admin quản lý loại rác, cấu hình điểm (detai.md 3.4.4)
// AI hỗ trợ nhận diện loại rác khi Customer tải ảnh (detai.md 3.2.2)
Table loai_racs {
  id_loai_rac text [pk]
  ten_loai varchar [not null]
  mo_ta text
  diem_tren_kg decimal [not null, default: 0]
  hoat_dong boolean [default: true]
  ngay_tao datetime [not null]
  ngay_cap_nhat datetime [not null]
}

// ======================
// YÊU CẦU THU GOM
// ======================
// Chức năng: Customer tạo yêu cầu (3.2.2) | Staff xử lý, thu gom, xác minh (3.3.2, 3.3.3)
// Trạng thái: PENDING | COLLECTING | COMPLETED | CANCELLED
Table yeu_cau_thu_goms {
  id_yeu_cau text [pk]
  id_khach_hang text [not null]
  id_loai_rac text [not null]
  so_luong decimal [not null]
  so_luong_uoc_tinh decimal
  dia_chi text [not null]
  ghi_chu text
  url_anh varchar
  trang_thai varchar [not null, default: 'PENDING']
  id_nhan_vien text
  khoi_luong_xac_minh decimal
  id_loai_rac_xac_minh text
  diem_tich_luy int
  ngay_tao datetime [not null]
  ngay_cap_nhat datetime [not null]
  ngay_hoan_thanh datetime
}

// ======================
// LỊCH SỬ TRẠNG THÁI
// ======================
// Chức năng: Staff cập nhật trạng thái, lưu lịch sử (detai.md 3.3.4)
Table lich_su_trang_thais {
  id text [pk]
  id_yeu_cau text [not null]
  trang_thai varchar [not null]
  ghi_chu text
  ngay_tao datetime [not null]
}

// ======================
// PHẦN THƯỞNG
// ======================
// Chức năng: Admin quản lý phần thưởng, cấu hình điểm đổi (detai.md 3.4.5)
Table phan_thuongs {
  id_phan_thuong text [pk]
  ten_phan_thuong varchar [not null]
  mo_ta text
  diem_doi int [not null]
  so_luong_con int [default: 0]
  url_anh varchar
  hoat_dong boolean [default: true]
  ngay_tao datetime [not null]
  ngay_cap_nhat datetime [not null]
}

// ======================
// LỊCH SỬ ĐỔI THƯỞNG
// ======================
// Chức năng: Customer đổi thưởng, xem lịch sử (detai.md 3.2.5)
Table lich_su_doi_thuongs {
  id text [pk]
  id_nguoi_dung text [not null]
  id_phan_thuong text [not null]
  diem_su_dung int [not null]
  trang_thai varchar [default: 'completed']
  ngay_tao datetime [not null]
}

// ======================
// GIAO DỊCH ĐIỂM
// ======================
// Chức năng: Tích điểm khi hoàn thành (3.2.4) | Trừ điểm khi đổi thưởng (3.2.5)
// type: earn | redeem | admin_adjust
Table giao_dich_diems {
  id text [pk]
  id_nguoi_dung text [not null]
  so_diem int [not null]
  loai varchar [not null]
  mo_ta text
  id_tham_chieu text
  ngay_tao datetime [not null]
}

// ======================
// RELATIONSHIPS
// ======================

// Password reset
Ref: password_resets.id_nguoi_dung > nguoi_dungs.id

// Yêu cầu thu gom
Ref: yeu_cau_thu_goms.id_khach_hang > nguoi_dungs.id
Ref: yeu_cau_thu_goms.id_loai_rac > loai_racs.id_loai_rac
Ref: yeu_cau_thu_goms.id_nhan_vien > nguoi_dungs.id
Ref: yeu_cau_thu_goms.id_loai_rac_xac_minh > loai_racs.id_loai_rac

// Lịch sử trạng thái
Ref: lich_su_trang_thais.id_yeu_cau > yeu_cau_thu_goms.id_yeu_cau

// Đổi thưởng
Ref: lich_su_doi_thuongs.id_nguoi_dung > nguoi_dungs.id
Ref: lich_su_doi_thuongs.id_phan_thuong > phan_thuongs.id_phan_thuong

// Giao dịch điểm
Ref: giao_dich_diems.id_nguoi_dung > nguoi_dungs.id
