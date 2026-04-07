# Biểu đồ tuần tự — 16 use case (`dac_ta_use_case.md`)

**Chuẩn dùng chung:** `Actor` (theo UC) → **Form** (giao diện) → **Control** (xử lý) → **CSDL** (lưu trữ).  
Sao chép **từng khối** `@startuml` … `@enduml` dán vào [plantuml.com](https://www.plantuml.com/plantuml/uml) để xuất PNG/SVG.

**File gộp 16 sơ đồ:** `so-do-tuan-tu-16-use-case-all.puml` (mở bằng VS Code + PlantUML để xem lần lượt). Trên plantuml.com nên **dán từng UC** (một `@startuml` mỗi lần).

---

## UC01 – Đăng ký

```plantuml
@startuml UC01_Dang_ky
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Khách vãng lai" as A
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
A -> F: Truy cập đăng ký, nhập thông tin
A -> F: Gửi đăng ký
F -> C: Yêu cầu đăng ký
activate C
C -> C: Kiểm tra hợp lệ, khớp mật khẩu
alt Hợp lệ
  C -> DB: Kiểm tra email trùng
  DB --> C: Kết quả
  alt Email chưa có
    C -> DB: INSERT (CUSTOMER)
    DB --> C: OK
    C --> F: Thành công
    F --> A: Chuyển trang đăng nhập
  else Trùng (3a)
    C --> F: Lỗi
    F --> A: Email đã dùng
  end
else Sai (3b)
  C --> F: Lỗi
  F --> A: Xác nhận mật khẩu sai
end
deactivate C
@enduml
```

---

## UC02 – Đăng nhập

```plantuml
@startuml UC02_Dang_nhap
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Người dùng" as A
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
A -> F: Nhập email, mật khẩu, gửi
F -> C: Yêu cầu đăng nhập
activate C
C -> DB: SELECT theo email
DB --> C: Bản ghi / không
alt Đúng mật khẩu
  C -> C: Kiểm tra khóa, tạo JWT
  alt Chưa khóa
    C --> F: Token + vai trò
    F --> A: Vào trang chủ theo vai trò
  else Khóa (4a)
    C --> F: Lỗi
    F --> A: Tài khoản bị khóa
  end
else Sai (3a)
  C --> F: Lỗi
  F --> A: Sai email/mật khẩu
end
deactivate C
@enduml
```

---

## UC03 – Quản lý tài khoản cá nhân

```plantuml
@startuml UC03_Tai_khoan_ca_nhan
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Khách hàng" as KH
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
KH -> F: Mở trang tài khoản
F -> C: Lấy thông tin
C -> DB: SELECT người dùng
DB --> C: Dữ liệu
C --> F: Trả về
F --> KH: Hiển thị họ tên, email, SĐT, …
alt Cập nhật thông tin
  KH -> F: Gửi chỉnh sửa
  F -> C: Cập nhật profile
  C -> DB: UPDATE
  C --> F: OK
  F --> KH: Thông báo thành công
else Đổi mật khẩu
  KH -> F: Mật khẩu cũ, mới
  F -> C: Đổi mật khẩu
  C -> DB: Kiểm tra hash
  alt Đúng mật khẩu cũ
    C -> DB: UPDATE mật khẩu
    C --> F: OK
    F --> KH: Thành công
  else Sai
    C --> F: Lỗi
    F --> KH: Mật khẩu cũ không đúng
  end
end
@enduml
```

---

## UC04 – Tạo yêu cầu thu gom

```plantuml
@startuml UC04_Tao_yeu_cau
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Khách hàng" as KH
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
KH -> F: Mở tạo yêu cầu
F --> KH: Form loại rác, SL, địa chỉ, …
opt Tải ảnh
  KH -> F: Ảnh rác
  F -> C: Phân tích ảnh
  C -> C: AI gợi ý loại (map loai_racs)
  C --> F: Điền gợi ý
end
KH -> F: Gửi yêu cầu
F -> C: Tạo yêu cầu
activate C
C -> C: Kiểm tra bắt buộc
alt Đủ thông tin
  C -> DB: INSERT yeu_cau (PENDING)
  DB --> C: OK
  C --> F: Thành công
  F --> KH: Thông báo + mã yêu cầu
else Thiếu (7a)
  C --> F: Lỗi
  F --> KH: Bổ sung thông tin
end
deactivate C
@enduml
```

---

## UC05 – Theo dõi trạng thái

```plantuml
@startuml UC05_Theo_doi
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Khách hàng" as KH
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
KH -> F: Mở theo dõi yêu cầu
F -> C: Danh sách theo id khách
C -> DB: SELECT yeu_cau
DB --> C: Danh sách + trạng thái
C --> F: Dữ liệu
F --> KH: Hiển thị PENDING/COLLECTING/…
KH -> F: Xem chi tiết
F -> C: Chi tiết + lịch sử
C -> DB: SELECT
C --> F: Chi tiết
F --> KH: Hiển thị
opt Hủy yêu cầu
  KH -> F: Hủy
  F -> C: Cập nhật CANCELLED
  C -> DB: UPDATE (nếu PENDING)
  alt Được phép
    C --> F: OK
    F --> KH: Đã hủy
  else Không PENDING (5a)
    C --> F: Lỗi
    F --> KH: Không thể hủy
  end
end
@enduml
```

---

## UC06 – Xem điểm

```plantuml
@startuml UC06_Xem_diem
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Khách hàng" as KH
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
KH -> F: Mở quản lý điểm
F -> C: Lấy điểm & lịch sử
C -> DB: SELECT điểm, giao_dich_diems
C -> DB: Quy đổi theo loai_racs
DB --> C: Dữ liệu
C --> F: Tổng điểm, lịch sử +/-, bảng quy đổi
F --> KH: Hiển thị
@enduml
```

---

## UC07 – Đổi thưởng

```plantuml
@startuml UC07_Doi_thuong
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Khách hàng" as KH
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
KH -> F: Mở đổi thưởng
F -> C: Danh sách phần thưởng
C -> DB: SELECT phan_thuongs
DB --> C: Còn hàng, điểm đổi
C --> F: Danh sách
F --> KH: Hiển thị
KH -> F: Chọn phần thưởng, xác nhận
F -> C: Đổi thưởng
activate C
C -> DB: Kiểm tra điểm, tồn
alt Đủ điểm và còn hàng
  C -> DB: Trừ điểm, trừ tồn, ghi giao dịch
  DB --> C: OK
  C --> F: Thành công
  F --> KH: Thông báo đổi thưởng OK
else Không đủ điểm (4a)
  C --> F: Lỗi
  F --> KH: Điểm không đủ
else Hết hàng (4b)
  C --> F: Lỗi
  F --> KH: Phần thưởng đã hết
end
deactivate C
@enduml
```

---

## UC08 – Thống kê (khách hàng)

```plantuml
@startuml UC08_Thong_ke
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Khách hàng" as KH
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
KH -> F: Mở thống kê cá nhân
F -> C: Yêu cầu thống kê
C -> DB: Tổng hợp yêu cầu, kg, điểm\n+ theo loại rác
opt Lọc thời gian
  KH -> F: Chọn ngày/tuần/tháng
  F -> C: Thống kê theo khoảng
  C -> DB: Truy vấn có điều kiện thời gian
end
DB --> C: Số liệu
C --> F: Biểu đồ / bảng
F --> KH: Hiển thị
@enduml
```

---

## UC09 – Xem và nhận yêu cầu (nhân viên)

```plantuml
@startuml UC09_Nhan_yeu_cau
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Nhân viên" as NV
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
NV -> F: Mở danh sách yêu cầu
F -> C: Lấy danh sách
C -> DB: SELECT yeu_cau
DB --> C: Danh sách
C --> F: Dữ liệu
F --> NV: PENDING/COLLECTING/COMPLETED
NV -> F: Xem chi tiết
F -> C: Chi tiết
C -> DB: SELECT
C --> F: Chi tiết
F --> NV: Hiển thị
NV -> F: Nhận yêu cầu (PENDING)
F -> C: Gán nhân viên
activate C
C -> DB: UPDATE COLLECTING, lịch sử
alt Còn PENDING, chưa ai nhận
  DB --> C: OK
  C --> F: Thành công
  F --> NV: Đã nhận
else Đã nhận bởi NV khác
  C --> F: Lỗi
  F --> NV: Cập nhật danh sách
end
deactivate C
@enduml
```

---

## UC10 – Thu gom và xác minh

```plantuml
@startuml UC10_Thu_gom_xac_minh
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Nhân viên" as NV
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
NV -> F: Mở chi tiết yêu cầu (COLLECTING)
F -> C: Chi tiết
C -> DB: SELECT
C --> F: Địa chỉ, liên hệ, ước tính
F --> NV: Hiển thị
NV -> F: Nhập loại xác minh, khối lượng, gửi
F -> C: Hoàn tất thu gom
activate C
C -> DB: UPDATE yeu_cau (COMPLETED),\nlưu khối lượng xác minh, lịch sử
C -> DB: Tính điểm, INSERT giao_dich_diems,\nUPDATE điểm KH
DB --> C: OK
C --> F: Thành công + thông báo KH
F --> NV: Xác nhận hoàn thành
deactivate C
@enduml
```

---

## UC11 – Quên mật khẩu

```plantuml
@startuml UC11_Quen_mat_khau
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Người dùng" as A
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
A -> F: Nhập email, gửi khôi phục
F -> C: Yêu cầu reset
activate C
C -> DB: Kiểm tra email tồn tại
alt Có email
  C -> DB: INSERT password_resets (token, hạn)
  C -> C: Gửi email chứa link
  C --> F: OK
  F --> A: Kiểm tra email
  A -> F: Mở link, nhập MK mới
  F -> C: Đặt lại mật khẩu + token
  C -> DB: Kiểm tra token hợp lệ
  alt Token OK
    C -> DB: UPDATE mật khẩu, xóa token
    C --> F: Thành công
    F --> A: Chuyển đăng nhập
  else Hết hạn (9a)
    C --> F: Lỗi
    F --> A: Link hết hạn
  end
else Không có (3a)
  C --> F: Lỗi
  F --> A: Email chưa đăng ký
end
deactivate C
@enduml
```

---

## UC12 – Thống kê và báo cáo (nhân viên)

```plantuml
@startuml UC12_Bao_cao_NV
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Nhân viên" as NV
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
NV -> F: Mở thống kê/báo cáo
F -> C: Yêu cầu số liệu
C -> DB: Tổng hợp yêu cầu, kg, loại,\nhiệu suất
opt Chọn khoảng thời gian
  NV -> F: Ngày/tuần/tháng
  F -> C: Lọc báo cáo
  C -> DB: Truy vấn có thời gian
end
DB --> C: Kết quả
C --> F: Báo cáo
F --> NV: Hiển thị
@enduml
```

---

## UC13 – Quản lý người dùng (Admin)

```plantuml
@startuml UC13_QL_nguoi_dung
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Admin" as AD
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
AD -> F: Mở quản lý người dùng
F -> C: Danh sách
C -> DB: SELECT nguoi_dungs
DB --> C: Danh sách
C --> F: Dữ liệu
F --> AD: Hiển thị
AD -> F: Thêm/Sửa/Khóa/Xóa + xác nhận
F -> C: Thao tác CRUD
activate C
C -> DB: INSERT/UPDATE/DELETE\n(khóa: lưu id_admin nếu có)
alt Email trùng khi thêm
  C --> F: Lỗi
  F --> AD: Email đã dùng
else OK
  DB --> C: OK
  C --> F: Thành công
  F --> AD: Thông báo OK
end
deactivate C
@enduml
```

---

## UC14 – Quản lý loại rác

```plantuml
@startuml UC14_Loai_rac
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Admin" as AD
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
AD -> F: Mở quản lý loại rác
F -> C: Danh sách
C -> DB: SELECT loai_racs
DB --> C: Danh sách
C --> F: Dữ liệu
F --> AD: Hiển thị
AD -> F: Thêm/Sửa/Xóa, cấu hình điểm/kg
F -> C: Lưu thay đổi
activate C
C -> DB: INSERT/UPDATE/DELETE
alt Loại đang dùng trong yêu cầu (xóa)
  C --> F: Cảnh báo / không xóa
  F --> AD: Thông báo
else OK
  DB --> C: OK
  C --> F: Thành công
  F --> AD: Thông báo OK
end
deactivate C
@enduml
```

---

## UC15 – Quản lý phân quyền

```plantuml
@startuml UC15_Phan_quyen
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Admin" as AD
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
AD -> F: Mở phân quyền
F -> C: Danh sách user + vai trò
C -> DB: SELECT nguoi_dungs
DB --> C: Dữ liệu
C --> F: Hiển thị
F --> AD: Danh sách
AD -> F: Đổi vai trò Customer/Staff,\nquyền chi tiết (nếu có), Lưu
F -> C: Cập nhật vai trò/quyền
C -> DB: UPDATE
DB --> C: OK
C --> F: Thành công
F --> AD: Thông báo OK
@enduml
```

---

## UC16 – Quản lý phần thưởng

```plantuml
@startuml UC16_Phan_thuong
!theme plain
skinparam backgroundColor #FEFEFE
skinparam ParticipantPadding 8
actor "Admin" as AD
participant "Form" as F
participant "Control" as C
database "CSDL" as DB
AD -> F: Mở quản lý phần thưởng
F -> C: Danh sách
C -> DB: SELECT phan_thuongs
DB --> C: Danh sách
C --> F: Dữ liệu
F --> AD: Hiển thị
AD -> F: Thêm/Sửa/Xóa, điểm đổi, số lượng
F -> C: Lưu
activate C
C -> DB: INSERT/UPDATE/DELETE
DB --> C: OK
C --> F: Thành công
F --> AD: Thông báo OK
deactivate C
@enduml
```

---

*Tham chiếu: `docs/dac_ta_use_case.md` — UC01–UC16.*
