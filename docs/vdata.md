// ======================
// VAI TRO
// ======================
Table vai_tros {
  id_vai_tro int [pk, increment]
  ten_vai_tro varchar
  mo_ta text
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// BANG CAP
// ======================
Table bang_caps {
  id_bang_cap int [pk, increment]
  ten_bang_cap varchar
  mo_ta text
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// NHAN VIEN
// ======================
Table nhan_viens {
  id_nhan_vien int [pk, increment]
  ten_dang_nhap varchar
  mat_khau varchar
  ho_ten varchar
  id_vai_tro int
  id_bang_cap int
  trang_thai varchar
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// THONG TIN NHAN VIEN
// ======================
Table thong_tin_nhan_viens {
  id_nhan_vien int [pk]
  so_dien_thoai varchar
  email varchar
  dia_chi varchar
  ngay_sinh date
  ngay_vao_lam date
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// KHACH HANG
// ======================
Table khach_hangs {
  id_khach_hang int [pk, increment]
  ten_khach_hang varchar
  so_dien_thoai varchar
  email varchar
  dia_chi varchar
  diem_tich_luy int
  mat_khau varchar
  email_verified boolean [default: false]
  email_verified_at datetime
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// EMAIL VERIFICATION
// ======================
Table email_verifications {
  id int [pk, increment]
  email varchar
  token varchar
  expired_at datetime
  verified boolean [default: false]
  created_at datetime
  ngay_cap_nhat datetime
}

// ======================
// PASSWORD RESET
// ======================
Table password_resets {
  id int [pk, increment]
  email varchar
  token varchar
  expired_at datetime
  used boolean [default: false]
  created_at datetime
  ngay_cap_nhat datetime
}

// ======================
// LOAI THUOC
// ======================
Table loai_thuocs {
  id_loai_thuoc int [pk, increment]
  ten_loai_thuoc varchar
  mo_ta text
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// NHA SAN XUAT
// ======================
Table nha_san_xuats {
  id_nha_san_xuat int [pk, increment]
  ten_nha_san_xuat varchar
  nuoc_san_xuat varchar
  dia_chi varchar
  so_dien_thoai varchar
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// THUOC
// ======================
Table thuocs {
  id_thuoc int [pk, increment]
  ten_thuoc varchar
  id_loai_thuoc int
  id_nha_san_xuat int
  ma_thuoc varchar
  ham_luong varchar
  don_vi_tinh varchar
  gia_ban decimal
  trang_thai varchar
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// LO THUOC
// ======================
Table lo_thuocs {
  id_lo int [pk, increment]
  id_thuoc int
  so_lo varchar
  ngay_san_xuat date
  han_su_dung date
  so_luong_nhap int
  so_luong_con int
  gia_nhap decimal
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// PHIEU NHAP
// ======================
Table phieu_nhaps {
  id_phieu_nhap int [pk, increment]
  id_nha_san_xuat int
  id_nhan_vien int
  tong_tien decimal
  ngay_nhap datetime
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// CHI TIET PHIEU NHAP
// ======================
Table chi_tiet_phieu_nhaps {
  id int [pk, increment]
  id_phieu_nhap int
  id_lo int
  so_luong int
  gia_nhap decimal
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// HOA DON
// ======================
Table hoa_don {
  id_hoa_don int [pk, increment]
  ma_hoa_don varchar
  ngay_tao datetime
  id_khach_hang int
  id_nhan_vien int
  tong_tien decimal
  giam_gia decimal
  tien_thanh_toan decimal
  ngay_ban datetime
  ngay_cap_nhat datetime
}

// ======================
// CHI TIET HOA DON
// ======================
Table chi_tiet_hoa_don {
  id int [pk, increment]
  id_hoa_don int
  id_lo int
  so_luong int
  gia_ban decimal
  thanh_tien decimal
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// THANH TOAN
// ======================
Table thanh_toan {
  id_hoa_don int [pk]
  phuong_thuc varchar
  so_tien decimal
  thoi_gian datetime
  ma_giao_dich varchar
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// LICH SU DON HANG
// ======================
Table lich_su_don_hangs {
  id_lich_su int [pk, increment]
  id_hoa_don int
  trang_thai varchar
  ghi_chu text
  thoi_gian datetime
  id_nhan_vien int
  ngay_tao datetime
  ngay_cap_nhat datetime
}

// ======================
// RELATIONSHIPS
// ======================

// NHAN VIEN
Ref: nhan_viens.id_vai_tro > vai_tros.id_vai_tro
Ref: nhan_viens.id_bang_cap > bang_caps.id_bang_cap
Ref: thong_tin_nhan_viens.id_nhan_vien > nhan_viens.id_nhan_vien

// THUOC
Ref: thuocs.id_loai_thuoc > loai_thuocs.id_loai_thuoc
Ref: thuocs.id_nha_san_xuat > nha_san_xuats.id_nha_san_xuat
Ref: lo_thuocs.id_thuoc > thuocs.id_thuoc

// NHAP
Ref: phieu_nhaps.id_nha_san_xuat > nha_san_xuats.id_nha_san_xuat
Ref: phieu_nhaps.id_nhan_vien > nhan_viens.id_nhan_vien
Ref: chi_tiet_phieu_nhaps.id_phieu_nhap > phieu_nhaps.id_phieu_nhap
Ref: chi_tiet_phieu_nhaps.id_lo > lo_thuocs.id_lo

// BAN HANG
Ref: hoa_don.id_khach_hang > khach_hangs.id_khach_hang
Ref: hoa_don.id_nhan_vien > nhan_viens.id_nhan_vien
Ref: chi_tiet_hoa_don.id_hoa_don > hoa_don.id_hoa_don
Ref: chi_tiet_hoa_don.id_lo > lo_thuocs.id_lo
Ref: thanh_toan.id_hoa_don > hoa_don.id_hoa_don

// LICH SU
Ref: lich_su_don_hangs.id_hoa_don > hoa_don.id_hoa_don
Ref: lich_su_don_hangs.id_nhan_vien > nhan_viens.id_nhan_vien