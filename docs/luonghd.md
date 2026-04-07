2.5.2.1 Đặc tả UC01: Đăng kí
 
Mục đích: Cho phép khách vãng lai đăng ký tài khoản mới để trở thành khách hàng và sử dụng hệ thống thu gom rác tái chế.
Tác nhân, mô tả chung:
•	Tác nhân: Khách vãng lai (Guest)
•	Mô tả chung: Mô tả việc khách vãng lai nhập thông tin đăng ký tài khoản và gửi đến hệ thống để tạo tài khoản mới.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập trang đăng ký và nhập thông tin (email, mật khẩu, xác nhận mật khẩu, họ tên, số điện thoại).	-
2. Gửi thông tin đăng ký đến hệ thống.	-
-	3. Kiểm tra tính hợp lệ của dữ liệu và kiểm tra email chưa tồn tại trong hệ thống.
-	4. Lưu tài khoản mới vào cơ sở dữ liệu.
-	5. Hiển thị thông báo đăng ký thành công và chuyển hướng đến trang đăng nhập.
-	6. Kết thúc Use case.
Luồng thay thế: Luồng 3a – Email đã tồn tại: hiển thị thông báo "Email đã được sử dụng", yêu cầu nhập email khác. Luồng 3b – Mật khẩu không khớp: hiển thị thông báo "Xác nhận mật khẩu không đúng", yêu cầu nhập lại.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Không có.
Điều kiện sau: Tài khoản mới được tạo với vai trò khách hàng, người dùng có thể đăng nhập vào hệ thống.
________________________________________


2.5.2.2 Đặc tả UC02: Đăng nhập
 Mục đích: Cho phép người dùng xác thực tài khoản để truy cập các chức năng của hệ thống theo vai trò tương ứng.
Tác nhân, mô tả chung:
•	Tác nhân:  Khách hàng, Nhân viên, Quản trị viên.
•	Mô tả chung: Mô tả việc người dùng nhập thông tin đăng nhập và hệ thống xác thực để cho phép truy cập.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập trang đăng nhập và nhập email, mật khẩu.	-
2. Gửi thông tin đăng nhập đến hệ thống.	-
-	3. Kiểm tra thông tin đăng nhập tồn tại và chính xác.
-	4. Kiểm tra tài khoản chưa bị khóa.
-	5. Tạo phiên đăng nhập và chuyển đến trang chủ theo vai trò.
-	6. Kết thúc Use case.
Luồng thay thế: Luồng 3a – Thông tin sai: hiển thị "Email hoặc mật khẩu không đúng", yêu cầu nhập lại. Luồng 4a – Tài khoản bị khóa: hiển thị "Tài khoản đã bị khóa", liên hệ Admin.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Người dùng đã có tài khoản trong hệ thống.
Điều kiện sau: Người dùng đăng nhập thành công, có phiên làm việc và quyền truy cập theo vai trò.
2.5.2.3 Đặc tả UC03: Quên mật khẩu 
Mục đích: Cho phép khách hàng và nhân viên khôi phục mật khẩu khi quên bằng xác thực qua email.
Tác nhân, mô tả chung:
•	Tác nhân:  Khách hàng, Nhân viên (người dùng đã đăng ký trong hệ thống).
•	Mô tả chung: Mô tả việc người dùng yêu cầu đặt lại mật khẩu, nhận link qua email và nhập mật khẩu mới.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập trang quên mật khẩu và nhập email đăng ký.	-
2. Gửi yêu cầu khôi phục mật khẩu.	-
-	3. Kiểm tra email tồn tại trong hệ thống.
-	4. Tạo token đặt lại mật khẩu, lưu vào bảng password_resets với thời hạn.
-	5. Gửi email chứa link đặt lại mật khẩu đến email người dùng.
6. Mở link trong email (trước khi hết hạn).	-
-	7. Hiển thị form nhập mật khẩu mới và xác nhận mật khẩu.
8. Nhập mật khẩu mới và xác nhận.	-
-	9. Kiểm tra token còn hợp lệ.
-	10. Cập nhật mật khẩu mới, xóa token.
-	11. Hiển thị thông báo thành công, chuyển đến trang đăng nhập.
-	12. Kết thúc Use case.
Luồng thay thế: Luồng 3a – Email không tồn tại: hiển thị thông báo "Email chưa được đăng ký". Luồng 9a – Token hết hạn: hiển thị "Link đã hết hạn", yêu cầu gửi lại yêu cầu quên mật khẩu.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Người dùng đã có tài khoản trong hệ thống.
Điều kiện sau: Mật khẩu đã được cập nhật, người dùng có thể đăng nhập bằng mật khẩu mới.

2.5.2.4 Đặc tả UC04: Quản lý tài khoản cá nhân 

Mục đích: Cho phép khách hàng xem, cập nhật thông tin cá nhân và đổi mật khẩu.
Tác nhân, mô tả chung:
•	Tác nhân: Khách hàng (Customer).
•	Mô tả chung: Mô tả việc khách hàng xem thông tin tài khoản, chỉnh sửa thông tin hoặc đổi mật khẩu.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Đăng nhập và truy cập trang quản lý tài khoản.	-
-	2. Hiển thị thông tin cá nhân hiện tại (họ tên, email, số điện thoại, địa chỉ, avatar).
3a. Chỉnh sửa thông tin và gửi lên hệ thống.	4a. Lưu thông tin mới, hiển thị thông báo thành công.
3b. Chọn đổi mật khẩu, nhập mật khẩu cũ và mật khẩu mới.	4b. Kiểm tra mật khẩu cũ đúng, cập nhật mật khẩu mới.
-	5. Kết thúc Use case.
Luồng thay thế: Mật khẩu cũ sai: hiển thị thông báo lỗi, yêu cầu nhập lại.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Khách hàng đã đăng nhập.
Điều kiện sau: Thông tin tài khoản hoặc mật khẩu đã được cập nhật.

2.5.2.5 Đặc tả UC05:  Tạo Yêu cầu cầu thu gom 
Mục đích: Cho phép khách hàng tạo yêu cầu thu gom rác với thông tin loại rác, số lượng, địa chỉ; tùy chọn tải ảnh để AI hỗ trợ nhận diện loại rác.
Tác nhân, mô tả chung:
•	Tác nhân: Khách hàng (Customer).
•	Mô tả chung: Mô tả việc khách hàng nhập thông tin yêu cầu thu gom rác, có thể tải ảnh để AI gợi ý loại rác, sau đó xác nhận và gửi yêu cầu.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập chức năng tạo yêu cầu thu gom.	-
-	2. Hiển thị form nhập thông tin (loại rác, số lượng, địa chỉ thu gom, ngày hẹn, ghi chú).
3. Chọn loại rác và nhập số lượng ước tính.	-
4. (Tùy chọn) Tải ảnh rác lên.	5. Gọi AI phân tích ảnh và gợi ý loại rác, tự điền vào trường loại rác.
6. Nhập địa chỉ thu gom và các thông tin khác.	-
7. Xác nhận và gửi yêu cầu.	-
-	8. Lưu yêu cầu với trạng thái PENDING.
-	9. Hiển thị thông báo thành công và thông tin yêu cầu.
-	10. Kết thúc Use case.
Luồng thay thế: Luồng 5a – Không tải ảnh: khách hàng nhập thủ công loại rác. Luồng 7a – Thiếu thông tin bắt buộc: hiển thị lỗi và yêu cầu bổ sung.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Khách hàng đã đăng nhập.
Điều kiện sau: Yêu cầu thu gom mới được tạo với trạng thái PENDING.

2.5.2.6 Đặc tả UC06: Theo dõi trạng thái 
Mục đích: Cho phép khách hàng xem danh sách, chi tiết và trạng thái các yêu cầu thu gom; hủy yêu cầu nếu chưa được xử lý.
Tác nhân, mô tả chung:
•	Tác nhân: Khách hàng (Customer).
•	Mô tả chung: Mô tả việc khách hàng theo dõi tiến độ các yêu cầu thu gom và hủy yêu cầu khi cần.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập trang theo dõi yêu cầu.	-
-	2. Hiển thị danh sách yêu cầu thu gom của khách hàng với trạng thái (PENDING, COLLECTING, COMPLETED, CANCELLED).
3. Chọn xem chi tiết một yêu cầu.	-
-	4. Hiển thị chi tiết yêu cầu (loại rác, số lượng, địa chỉ, trạng thái, lịch sử cập nhật).
5. (Tùy chọn) Chọn hủy yêu cầu có trạng thái PENDING.	-
-	6. Cập nhật trạng thái yêu cầu thành CANCELLED.
-	7. Kết thúc Use case.
Luồng thay thế: Luồng 5a – Yêu cầu không ở trạng thái PENDING: hiển thị thông báo không thể hủy.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Khách hàng đã đăng nhập.
Điều kiện sau: Khách hàng đã xem thông tin; nếu hủy thành công thì trạng thái yêu cầu là CANCELLED.

2.5.2.7 Đặc tả UC07:  Xem điểm 
Mục đích: Cho phép khách hàng xem tổng điểm hiện có, lịch sử tích điểm và lịch sử sử dụng điểm.
Tác nhân, mô tả chung:
•	Tác nhân: Khách hàng (Customer).
•	Mô tả chung: Mô tả việc khách hàng xem thông tin điểm tích lũy và các giao dịch điểm.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập trang quản lý điểm.	-
-	2. Hiển thị tổng điểm hiện có của khách hàng.
-	3. Hiển thị lịch sử tích điểm (cộng điểm khi hoàn thành thu gom, điều chỉnh của Admin).
-	4. Hiển thị lịch sử sử dụng điểm (trừ điểm khi đổi thưởng).
-	5. Hiển thị bảng quy đổi điểm theo loại rác.
-	6. Kết thúc Use case.
Luồng thay thế: Không có.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Khách hàng đã đăng nhập.
Điều kiện sau: Không có.

2.5.2.8 Đặc tả UC08: Đổi thưởng 
Mục đích: Cho phép khách hàng xem danh sách phần thưởng, kiểm tra điểm và dùng điểm tích lũy để đổi thưởng.
Tác nhân, mô tả chung:
•	Tác nhân: Khách hàng (Customer).
•	Mô tả chung: Mô tả việc khách hàng chọn phần thưởng, xác nhận đổi và hệ thống trừ điểm, ghi nhận giao dịch đổi thưởng.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập trang đổi thưởng.	-
-	2. Hiển thị danh sách phần thưởng có sẵn (tên, điểm đổi, số lượng còn).
3. Chọn phần thưởng muốn đổi.	-
-	4. Kiểm tra điểm khách hàng đủ và phần thưởng còn hàng.
5. Xác nhận đổi thưởng.	-
-	6. Trừ điểm tương ứng, cập nhật số lượng phần thưởng, ghi lịch sử đổi thưởng.
-	7. Hiển thị thông báo đổi thưởng thành công.
-	8. Kết thúc Use case.
Luồng thay thế: Luồng 4a – Điểm không đủ: hiển thị "Điểm không đủ", yêu cầu tích thêm điểm. Luồng 4b – Hết hàng: hiển thị "Phần thưởng đã hết", yêu cầu chọn phần thưởng khác.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Khách hàng đã đăng nhập và có điểm tích lũy.
Điều kiện sau: Điểm đã trừ, phần thưởng đã được ghi nhận, khách hàng có thể xem lịch sử đổi thưởng

2.5.2.9 Đặc tả UC09: Thống kê
 
Mục đích: Cho phép khách hàng xem thống kê cá nhân theo tổng quan, theo loại rác và theo thời gian.
Tác nhân, mô tả chung:
•	Tác nhân: Khách hàng (Customer).
•	Mô tả chung: Mô tả việc khách hàng xem báo cáo thống kê hoạt động thu gom và điểm của bản thân.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập trang thống kê cá nhân.	-
-	2. Hiển thị tổng quan (tổng yêu cầu, tổng kg rác, tổng điểm nhận, tổng điểm đã dùng).
-	3. Hiển thị thống kê theo loại rác (kg Nhựa, Kim loại, Giấy, …).
4. (Tùy chọn) Chọn khoảng thời gian (ngày/tuần/tháng).	-
-	5. Hiển thị thống kê và biểu đồ theo khoảng thời gian đã chọn.
-	6. Kết thúc Use case.
Luồng thay thế: Không có.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Khách hàng đã đăng nhập.
Điều kiện sau: Không có.

2.5.2.10 Đặc tả UC10: Xem và nhận yêu cầu
 
Mục đích: Cho phép nhân viên xem danh sách yêu cầu thu gom và nhận yêu cầu để xử lý.
Tác nhân, mô tả chung:
•	Tác nhân: Nhân viên (Staff).
•	Mô tả chung: Mô tả việc nhân viên xem danh sách yêu cầu, xem chi tiết và nhận yêu cầu để thực hiện thu gom.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Đăng nhập và truy cập trang yêu cầu thu gom.	-
-	2. Hiển thị danh sách yêu cầu (PENDING, COLLECTING, COMPLETED).
3. Chọn xem chi tiết yêu cầu.	-
-	4. Hiển thị chi tiết (loại rác, số lượng, địa chỉ, SĐT, ngày hẹn thu gom).
5. Chọn nhận yêu cầu có trạng thái PENDING.	-
-	6. Gán nhân viên cho yêu cầu, cập nhật trạng thái thành COLLECTING, lưu lịch sử.
-	7. Hiển thị thông báo nhận yêu cầu thành công.
-	8. Kết thúc Use case.
Luồng thay thế: Yêu cầu đã được nhân viên khác nhận: hiển thị thông báo, cập nhật danh sách.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Nhân viên đã đăng nhập.
Điều kiện sau: Yêu cầu được gán cho nhân viên, trạng thái chuyển sang COLLECTING.

2.5.2.11 Đặc tả UC11: Thu gom và xác minh 
Mục đích: Cho phép nhân viên thực hiện thu gom rác tại địa chỉ khách hàng và xác minh loại rác cùng khối lượng thực tế.
Tác nhân, mô tả chung:
•	Tác nhân: Nhân viên (Staff).
•	Mô tả chung: Mô tả việc nhân viên đến thu gom rác, xác minh loại rác thực tế và khối lượng để tính điểm chính xác.
Luồng sự kiện chính

Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập chi tiết yêu cầu đang xử lý (COLLECTING).	-
-	2. Hiển thị thông tin địa chỉ, liên hệ, loại rác ước tính.
3. Thực hiện thu gom rác tại địa chỉ.	-
4. Cân và xác minh loại rác thực tế, nhập khối lượng.	-
5. Cập nhật thông tin xác minh lên hệ thống.	-
-	6. Lưu loại rác xác minh, khối lượng thực tế vào yêu cầu.
-	7. Cập nhật trạng thái thành COMPLETED, lưu lịch sử trạng thái.
-	8. Tính điểm tích lũy, cộng điểm cho khách hàng, gửi thông báo.
-	9. Kết thúc Use case.
Luồng thay thế: Không có.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Nhân viên đã nhận yêu cầu, trạng thái yêu cầu là COLLECTING.
Điều kiện sau: Yêu cầu ở trạng thái COMPLETED, đã có loại rác và khối lượng xác minh, điểm đã cộng cho khách hàng.

2.5.2.12 Đặc tả UC12: Thống kê và báo cáo 
Mục đích: Cho phép nhân viên xem thống kê số lượng yêu cầu, khối lượng rác, hiệu suất thu gom và xuất báo cáo theo thời gian.
Tác nhân, mô tả chung:
•	Tác nhân: Nhân viên (Staff).
•	Mô tả chung: Mô tả việc nhân viên xem báo cáo thống kê và xuất báo cáo theo ngày, tuần, tháng.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập trang thống kê và báo cáo.	-
-	2. Hiển thị thống kê số lượng yêu cầu đã xử lý.
-	3. Hiển thị thống kê khối lượng rác đã thu gom.
-	4. Hiển thị thống kê theo loại rác.
-	5. Hiển thị hiệu suất thu gom.
6. (Tùy chọn) Chọn khoảng thời gian (ngày/tuần/tháng).	-
-	7. Cập nhật báo cáo theo khoảng thời gian đã chọn.
-	8. Kết thúc Use case.
Luồng thay thế: Không có.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Nhân viên đã đăng nhập.
Điều kiện sau: Không có.

2.5.2.13 Đặc tả UC13: Quản lý người dùng 
Mục đích: Cho phép Admin xem danh sách, xem chi tiết, thêm, cập nhật, khóa/mở khóa và xóa tài khoản người dùng.
Tác nhân, mô tả chung:
•	Tác nhân: Quản trị viên (Admin).
•	Mô tả chung: Mô tả việc Admin quản lý tài khoản khách hàng và nhân viên trong hệ thống.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Đăng nhập Admin và truy cập trang quản lý người dùng.	-
-	2. Hiển thị danh sách người dùng (khách hàng, nhân viên,admin).
3. Chọn xem chi tiết / thêm / sửa / khóa / xóa.	-
-	4. Thực hiện thao tác tương ứng: hiển thị chi tiết, form thêm mới, form sửa, xác nhận khóa/mở khóa, xác nhận xóa.
5. Nhập thông tin (khi thêm/sửa) hoặc xác nhận thao tác.	-
-	6. Lưu thay đổi vào cơ sở dữ liệu (lưu id_admin khi khóa).
-	7. Hiển thị thông báo thành công.
-	8. Kết thúc Use case.
Luồng thay thế: Khi thêm mới: nếu email trùng thì hiển thị lỗi và yêu cầu nhập email khác.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Admin đã đăng nhập.
Điều kiện sau: Danh sách người dùng đã được cập nhật theo thao tác thực hiện.

2.5.2.14 Đặc tả UC14: Quản lý loại rác 
Mục đích: Cho phép Admin xem danh sách loại rác, thêm, sửa, xóa loại rác và cấu hình điểm/kg.
Tác nhân, mô tả chung:
•	Tác nhân: Quản trị viên (Admin).
•	Mô tả chung: Mô tả việc Admin quản lý danh mục loại rác và bảng quy đổi điểm cho từng loại.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập trang quản lý loại rác.	-
-	2. Hiển thị danh sách loại rác (tên, mô tả, điểm/kg, trạng thái).
3. Chọn thêm / sửa / xóa / cấu hình điểm.	-
4. Nhập thông tin (tên, mô tả, điểm/kg) hoặc xác nhận xóa.	-
-	5. Lưu thay đổi vào cơ sở dữ liệu.
-	6. Hiển thị thông báo thành công.
-	7. Kết thúc Use case.
Luồng thay thế: Xóa loại rác đang được sử dụng trong yêu cầu: hiển thị cảnh báo, không cho xóa hoặc chuyển về không hoạt động.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Admin đã đăng nhập.
Điều kiện sau: Danh mục loại rác đã được cập nhật.

2.5.2.15 Đặc tả UC15: Quản lý phân quyền  
Mục đích: Cho phép Admin gán vai trò (Customer/Staff) cho người dùng và cấu hình quyền truy cập theo chức năng.
Tác nhân, mô tả chung:
•	Tác nhân: Quản trị viên (Admin).
•	Mô tả chung: Mô tả việc Admin phân quyền và kiểm soát quyền truy cập chức năng theo vai trò.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập trang quản lý phân quyền.	-
-	2. Hiển thị danh sách người dùng và vai trò hiện tại.
3. Chọn người dùng và thay đổi vai trò (Customer / Staff).	-
4. (Tùy chọn) Cập nhật quyền truy cập chi tiết.	-
5. Xác nhận lưu.	-
-	6. Cập nhật vai trò và quyền vào cơ sở dữ liệu.
-	7. Hiển thị thông báo thành công.
-	8. Kết thúc Use case.
Luồng thay thế: Không có.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Admin đã đăng nhập.
Điều kiện sau: Vai trò và quyền của người dùng đã được cập nhật.

2.5.2.16 Đặc tả UC16 : Quản lý phần thưởng 
Mục đích: Cho phép Admin xem danh sách phần thưởng, thêm, sửa, xóa phần thưởng và cấu hình điểm đổi.
Tác nhân, mô tả chung:
•	Tác nhân: Quản trị viên (Admin).
•	Mô tả chung: Mô tả việc Admin quản lý danh mục phần thưởng và điểm đổi cho từng phần thưởng.
Luồng sự kiện chính
Hành động của tác nhân	Phản ứng của hệ thống
1. Truy cập trang quản lý phần thưởng.	-
-	2. Hiển thị danh sách phần thưởng (tên, mô tả, điểm đổi, số lượng còn).
3. Chọn thêm / sửa / xóa / cấu hình điểm.	-
4. Nhập thông tin (tên, mô tả, điểm đổi, số lượng) hoặc xác nhận xóa.	-
-	5. Lưu thay đổi vào cơ sở dữ liệu.
-	6. Hiển thị thông báo thành công.
-	7. Kết thúc Use case.
Luồng thay thế: Không có.
Các yêu cầu cụ thể: Không có.
Điều kiện trước: Admin đã đăng nhập.
Điều kiện sau: Danh mục phần thưởng đã được cập nhật.
