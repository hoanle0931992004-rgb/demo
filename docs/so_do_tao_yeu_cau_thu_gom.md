# Sơ đồ hoạt động — Tạo yêu cầu thu gom (UC04)

## File sơ đồ chuẩn (SVG, màu đồng nhất Đăng nhập)

Mở trong trình duyệt: **`so_do_tao_yeu_cau_thu_gom.html`**

- Nền trắng, viền `#87CEEB`, mũi tên `#1976D2`
- Hai swimlane: **Khách hàng** | **Hệ thống**
- Luồng khớp bảng đặc tả (bước 1–10)

---

## Mermaid (tham khảo)

```mermaid
flowchart TD
    A((Bắt đầu))
    A --> B[1. Truy cập tạo yêu cầu thu gom]
    B --> C[2. Hiển thị form: loại rác, số lượng, địa chỉ, ngày hẹn, ghi chú]
    C --> D[3. Chọn loại rác, nhập số lượng ước tính]
    D --> E{Tải ảnh?}
    E -->|Có| F[4. Tải ảnh rác]
    F --> G[5. AI phân tích ảnh, gợi ý loại rác]
    G --> I[6. Nhập địa chỉ và thông tin khác]
    E -->|Không| H[5a. Nhập thủ công loại rác]
    H --> I
    I --> J[7. Xác nhận và gửi yêu cầu]
    J --> K{Đủ thông tin bắt buộc?}
    K -->|Sai| L[7a. Hiển thị lỗi, yêu cầu bổ sung]
    L --> C
    K -->|Đúng| M[8. Lưu yêu cầu PENDING]
    M --> N[9. Thông báo thành công và thông tin yêu cầu]
    N --> O((10. Kết thúc))
```

---

## Bảng đặc tả (tham chiếu)

| Bước | Khách hàng | Hệ thống |
|------|------------|----------|
| 1 | Truy cập chức năng tạo yêu cầu thu gom | |
| 2 | | Hiển thị form |
| 3 | Chọn loại rác, nhập số lượng | |
| 4–5 | Tải ảnh (tùy chọn) | AI phân tích (khi có ảnh) |
| 5a | Nhập thủ công loại rác (khi không ảnh) | |
| 6 | Nhập địa chỉ thu gom và thông tin khác | |
| 7 | Xác nhận và gửi | Kiểm tra |
| 7a | | Thiếu thông tin → lỗi → quay form bước 2 |
| 8–10 | | Lưu PENDING → Thông báo → Kết thúc |
