# Sơ đồ ER (Entity-Relationship) - Hệ thống Thu gom rác tái chế

**Chỉ là hình ảnh/minh họa** – không thay đổi database hay dữ liệu hiện tại.

## File sơ đồ

| File | Mô tả |
|------|-------|
| `erd-he-thong-thu-gom-rac.png` | Ảnh sơ đồ ER (trong `assets/`) |
| `erd-so-do-csdl.puml` | File PlantUML để chỉnh sửa và render lại |

## Cách xem / chỉnh sửa

1. **Xem ảnh:** Mở file `assets/erd-he-thong-thu-gom-rac.png`
2. **Chỉnh sửa:** Sửa `docs/erd-so-do-csdl.puml` rồi render bằng:
   - VS Code + extension PlantUML
   - [plantuml.com/plantuml](https://www.plantuml.com/plantuml/uml)
3. **Tạo ER từ DBeaver:** Chuột phải database → **View Diagram** để xem ER trực tiếp từ DB

## Nội dung sơ đồ

Phản ánh đúng cấu trúc database hiện tại (`init.sql`):

- **User** – Người dùng (role: CUSTOMER, STAFF, ADMIN)
- **PasswordReset** – Quên mật khẩu
- **WasteType** – Loại rác
- **CollectionRequest** – Yêu cầu thu gom
- **StatusHistory** – Lịch sử trạng thái
- **Reward** – Phần thưởng
- **RewardRedemption** – Đổi thưởng
- **PointTransaction** – Giao dịch điểm
