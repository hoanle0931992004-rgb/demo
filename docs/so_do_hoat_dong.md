# SƠ ĐỒ HOẠT ĐỘNG - HỆ THỐNG THU GOM RÁC TÁI CHẾ THÔNG MINH

## Luồng hoạt động chính (Tạo yêu cầu → Thu gom → Tích điểm → Đổi thưởng)

```mermaid
flowchart TD
    Start((Bắt đầu)) --> A[Khách hàng đăng nhập]
    A --> B[Tạo yêu cầu thu gom]
    B --> B1[Nhập loại rác, số lượng]
    B1 --> B2[Nhập địa chỉ thu gom]
    B2 --> B3{Tải ảnh?}
    B3 -->|Có| B4[AI phân tích loại rác]
    B3 -->|Không| B5[Nhập thủ công]
    B4 --> B6[Xác nhận và gửi yêu cầu]
    B5 --> B6
    B6 --> C[Yêu cầu: PENDING]
    
    C --> D[Nhân viên xem danh sách]
    D --> E[Nhân viên nhận yêu cầu]
    E --> F[Trạng thái: COLLECTING]
    F --> G[Đến địa chỉ thu gom]
    G --> H[Xác minh loại rác]
    H --> I[Xác minh khối lượng]
    I --> J[Nhập dữ liệu lên hệ thống]
    J --> K[Cập nhật: COMPLETED]
    
    K --> L[Hệ thống tính điểm]
    L --> M[Cộng điểm cho khách hàng]
    M --> N[Gửi thông báo]
    
    N --> O{Khách hàng đổi thưởng?}
    O -->|Có| P[Xem danh sách phần thưởng]
    P --> Q[Chọn và xác nhận đổi]
    Q --> R[Trừ điểm, ghi nhận]
    O -->|Không| End((Kết thúc))
    R --> End
```

## Sơ đồ dạng Swimlane (Phân tách theo tác nhân)

```mermaid
flowchart TB
    subgraph Khách hàng
        A1[Đăng nhập] --> A2[Tạo yêu cầu thu gom]
        A2 --> A3[Gửi yêu cầu]
        A3 -.->|Chờ| A4
        A4[Nhận thông báo hoàn thành] --> A5[Xem điểm được cộng]
        A5 --> A6[Đổi thưởng - tùy chọn]
    end
    
    subgraph Hệ thống
        B1[Lưu yêu cầu PENDING] --> B2[Gán nhân viên]
        B2 --> B3[Trạng thái COLLECTING]
        B3 --> B4[Trạng thái COMPLETED]
        B4 --> B5[Tính điểm]
        B5 --> B6[Cộng điểm]
    end
    
    subgraph Nhân viên
        C1[Xem yêu cầu] --> C2[Nhận yêu cầu]
        C2 --> C3[Thu gom tại địa chỉ]
        C3 --> C4[Xác minh loại và khối lượng]
        C4 --> C5[Cập nhật hoàn thành]
    end
    
    A3 --> B1
    B2 --> C1
    C5 --> B4
    B6 --> A4
```

## Luồng chi tiết - Tạo yêu cầu thu gom

```mermaid
flowchart TD
    Start((Bắt đầu)) --> A[ Truy cập trang tạo yêu cầu]
    A --> B[Chọn loại rác]
    B --> C[Nhập số lượng]
    C --> D{Có tải ảnh?}
    D -->|Có| E[Tải ảnh rác]
    E --> F[AI phân tích]
    F --> G[Gợi ý loại rác]
    G --> H
    D -->|Không| H[Nhập địa chỉ thu gom]
    H --> I[Xác nhận thông tin]
    I --> J{Gửi yêu cầu?}
    J -->|Có| K[Lưu yêu cầu]
    J -->|Không| B
    K --> L[Hiển thị thông báo thành công]
    L --> End((Kết thúc))
```
