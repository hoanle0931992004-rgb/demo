# Sơ đồ hoạt động - Quên mật khẩu

Bản **đầy đủ bước UC11**, cùng kiểu swimlane với `so-do-hoat-dong-dang-nhap`:

- **Mermaid:** `docs/so-do-hoat-dong-quen-mat-khau.mmd` (dán vào [mermaid.live](https://mermaid.live))
- **PlantUML:** `docs/so-do-hoat-dong-quen-mat-khau.puml` (VS Code + PlantUML / [plantuml.com](https://www.plantuml.com/plantuml))

## Mermaid (bản khớp file .mmd)

```mermaid
flowchart TB
    subgraph NguoiDung["Người dùng"]
        direction TB
        U0([Bắt đầu])
        U1[Truy cập trang quên mật khẩu và nhập email đăng ký]
        U2[Gửi yêu cầu khôi phục mật khẩu]
        U3[Mở link trong email]
        U4[Nhập mật khẩu mới và xác nhận]
    end

    subgraph HeThong["Hệ thống"]
        direction TB
        H1{Email tồn tại?}
        H2[Tạo token, lưu password_resets có thời hạn]
        H3[Gửi email chứa link đặt lại mật khẩu]
        H4[Hiển thị form mật khẩu mới và xác nhận]
        H5{Token còn hợp lệ?}
        H6[Cập nhật mật khẩu mới, xóa token]
        H7[Thông báo thành công, chuyển trang đăng nhập]
        H8([Kết thúc])
        H9[Thông báo email chưa đăng ký]
        H10[Thông báo link đã hết hạn]
    end

    U0 --> U1
    U1 --> U2
    U2 --> H1
    H1 -->|Không| H9
    H9 --> U1
    H1 -->|Có| H2
    H2 --> H3
    H3 --> U3
    U3 --> H4
    H4 --> U4
    U4 --> H5
    H5 -->|Không| H10
    H10 --> U1
    H5 -->|Có| H6
    H6 --> H7
    H7 --> H8
```

## Bảng đặc tả (Hành động tác nhân / Phản ứng hệ thống)

| Hành động của tác nhân | Phản ứng của hệ thống |
| :--- | :--- |
| 1. Truy cập trang quên mật khẩu và nhập email đăng ký. | - |
| 2. Gửi yêu cầu khôi phục mật khẩu. | - |
| - | 3. Kiểm tra email tồn tại trong hệ thống. |
| - | 4. Tạo token đặt lại mật khẩu, lưu vào bảng password_resets với thời hạn. |
| - | 5. Gửi email chứa link đặt lại mật khẩu đến email người dùng. |
| 6. Mở link trong email (trước khi hết hạn). | - |
| - | 7. Hiển thị form nhập mật khẩu mới và xác nhận mật khẩu. |
| 8. Nhập mật khẩu mới và xác nhận. | - |
| - | 9. Kiểm tra token còn hợp lệ. |
| - | 10. Cập nhật mật khẩu mới, xóa token. |
| - | 11. Hiển thị thông báo thành công, chuyển đến trang đăng nhập. |
| - | 12. Kết thúc Use case. |

**Luồng thay thế:** Email không tồn tại → thông báo *email chưa đăng ký*, quay lại nhập email. Token hết hạn → thông báo *link đã hết hạn*, gửi lại yêu cầu quên mật khẩu.
