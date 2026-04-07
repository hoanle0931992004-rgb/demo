# 2.8.2. Mô hình vật lý (PostgreSQL)

Hệ quản trị: **PostgreSQL**. Khóa chính kiểu **VARCHAR(64)** do ứng dụng gán (ví dụ UUID), **không** dùng `auto_increment` như MySQL. Cột thời gian: **TIMESTAMPTZ** (timestamp có múi giờ).

**Chú thích cột:**

| Cột | Ý nghĩa |
|-----|--------|
| **Null** | `No` = NOT NULL, `Yes` = cho phép NULL |
| **Extra** | Ràng buộc bổ sung: PK, DEFAULT, UNIQUE, … |
| **Link to** | Khóa ngoại tham chiếu bảng.cột |

---

## admins

| Column | Type | Null | Extra | Link to |
|--------|------|------|-------|---------|
| id | varchar(64) | No | PK | |
| email | varchar(255) | No | UNIQUE | |
| mat_khau | varchar(255) | No | | |
| ho_ten | varchar(255) | No | | |
| ngay_tao | timestamptz | No | DEFAULT now() | |
| ngay_cap_nhat | timestamptz | No | DEFAULT now() | |

---

## nguoi_dungs

| Column | Type | Null | Extra | Link to |
|--------|------|------|-------|---------|
| id | varchar(64) | No | PK | |
| email | varchar(255) | No | UNIQUE | |
| mat_khau | varchar(255) | No | | |
| ho_ten | varchar(255) | No | | |
| so_dien_thoai | varchar(32) | Yes | | |
| dia_chi | varchar(500) | Yes | | |
| avatar | varchar(500) | Yes | | |
| vai_tro | varchar(32) | No | DEFAULT 'CUSTOMER' | |
| diem | integer | No | DEFAULT 0 | |
| bi_khoa | boolean | No | DEFAULT false | |
| id_admin_khoa | varchar(64) | Yes | FK ON DELETE SET NULL | admins.id |
| ngay_tao | timestamptz | No | DEFAULT now() | |
| ngay_cap_nhat | timestamptz | No | DEFAULT now() | |

---

## password_resets

| Column | Type | Null | Extra | Link to |
|--------|------|------|-------|---------|
| id | varchar(64) | No | PK | |
| id_nguoi_dung | varchar(64) | No | FK ON DELETE CASCADE | nguoi_dungs.id |
| token | varchar(255) | No | UNIQUE | |
| het_han | timestamptz | No | | |
| ngay_tao | timestamptz | No | DEFAULT now() | |

---

## loai_racs

| Column | Type | Null | Extra | Link to |
|--------|------|------|-------|---------|
| id_loai_rac | varchar(64) | No | PK | |
| ten_loai | varchar(255) | No | | |
| mo_ta | text | Yes | | |
| diem_tren_kg | decimal(12,4) | No | DEFAULT 0 | |
| hoat_dong | boolean | No | DEFAULT true | |
| ngay_tao | timestamptz | No | DEFAULT now() | |
| ngay_cap_nhat | timestamptz | No | DEFAULT now() | |

---

## yeu_cau_thu_goms

| Column | Type | Null | Extra | Link to |
|--------|------|------|-------|---------|
| id_yeu_cau | varchar(64) | No | PK | |
| id_khach_hang | varchar(64) | No | FK ON DELETE RESTRICT | nguoi_dungs.id |
| id_loai_rac | varchar(64) | No | FK ON DELETE RESTRICT | loai_racs.id_loai_rac |
| id_loai_rac_xac_minh | varchar(64) | Yes | FK ON DELETE SET NULL | loai_racs.id_loai_rac |
| id_nhan_vien | varchar(64) | Yes | FK ON DELETE SET NULL | nguoi_dungs.id |
| so_luong | decimal(12,4) | No | | |
| so_luong_uoc_tinh | decimal(12,4) | Yes | | |
| khoi_luong_xac_minh | decimal(12,4) | Yes | | |
| dia_chi | varchar(500) | No | | |
| so_dien_thoai | varchar(32) | Yes | | |
| ngay_muon_thu_gom | timestamptz | Yes | | |
| ghi_chu | text | Yes | | |
| url_anh | varchar(1000) | Yes | | |
| trang_thai | varchar(32) | No | DEFAULT 'PENDING' | |
| diem_tich_luy | integer | Yes | | |
| ngay_tao | timestamptz | No | DEFAULT now() | |
| ngay_cap_nhat | timestamptz | No | DEFAULT now() | |
| ngay_hoan_thanh | timestamptz | Yes | | |

---

## lich_su_trang_thais

| Column | Type | Null | Extra | Link to |
|--------|------|------|-------|---------|
| id | varchar(64) | No | PK | |
| id_yeu_cau | varchar(64) | No | FK ON DELETE CASCADE | yeu_cau_thu_goms.id_yeu_cau |
| trang_thai | varchar(32) | No | | |
| ghi_chu | text | Yes | | |
| ngay_tao | timestamptz | No | DEFAULT now() | |

---

## phan_thuongs

| Column | Type | Null | Extra | Link to |
|--------|------|------|-------|---------|
| id_phan_thuong | varchar(64) | No | PK | |
| ten_phan_thuong | varchar(255) | No | | |
| mo_ta | text | Yes | | |
| diem_doi | integer | No | | |
| so_luong_con | integer | No | DEFAULT 0 | |
| url_anh | varchar(1000) | Yes | | |
| hoat_dong | boolean | No | DEFAULT true | |
| ngay_tao | timestamptz | No | DEFAULT now() | |
| ngay_cap_nhat | timestamptz | No | DEFAULT now() | |

---

## lich_su_doi_thuongs

| Column | Type | Null | Extra | Link to |
|--------|------|------|-------|---------|
| id | varchar(64) | No | PK | |
| id_nguoi_dung | varchar(64) | No | FK ON DELETE CASCADE | nguoi_dungs.id |
| id_phan_thuong | varchar(64) | No | FK ON DELETE RESTRICT | phan_thuongs.id_phan_thuong |
| diem_su_dung | integer | No | | |
| trang_thai | varchar(32) | No | DEFAULT 'completed' | |
| ngay_tao | timestamptz | No | DEFAULT now() | |

---

## giao_dich_diems

| Column | Type | Null | Extra | Link to |
|--------|------|------|-------|---------|
| id | varchar(64) | No | PK | |
| id_nguoi_dung | varchar(64) | No | FK ON DELETE CASCADE | nguoi_dungs.id |
| so_diem | integer | No | | |
| loai | varchar(32) | No | earn \| redeem \| admin_adjust | |
| mo_ta | text | Yes | | |
| id_tham_chieu | varchar(64) | Yes | tham chiếu mềm (id yêu cầu / đổi thưởng, …) | |
| ngay_tao | timestamptz | No | DEFAULT now() | |

---

## thong_baos

| Column | Type | Null | Extra | Link to |
|--------|------|------|-------|---------|
| id | varchar(64) | No | PK | |
| id_nguoi_dung | varchar(64) | No | FK ON DELETE CASCADE | nguoi_dungs.id |
| loai | varchar(64) | No | | |
| tieu_de | varchar(255) | No | | |
| noi_dung | text | No | | |
| id_tham_chieu | varchar(64) | Yes | tham chiếu mềm (vd. id_yeu_cau) | |
| da_doc | boolean | No | DEFAULT false | |
| ngay_tao | timestamptz | No | DEFAULT now() | |

---

*Nguồn khớp: `db/schema.sql` (PostgreSQL).*
