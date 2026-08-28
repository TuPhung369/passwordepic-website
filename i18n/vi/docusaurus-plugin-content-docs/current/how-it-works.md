---
sidebar_position: 1
title: Cách hoạt động
description: Chiếc khoá mở kho mật khẩu của bạn, và vì sao nó không thể ghép lại ở đâu khác ngoài điện thoại của bạn.
---

# Cách hoạt động

Trình quản lý mật khẩu nào cũng nói rằng chỉ mình bạn đọc được dữ liệu của bạn.
Trang này mô tả cấu trúc khiến điều đó là sự thật ở đây, để bạn có thể *thẩm định*
lời khẳng định ấy thay vì phải tin nó.

## Khoá bị chia nhỏ, và một mảnh không thể đi đâu cả

Khoá giải mã kho mật khẩu của bạn — DEK — không được lưu ở bất cứ đâu. Nó được
dựng lại từ ba mảnh mỗi lần bạn mở khoá, rồi bị huỷ ngay sau đó.

| Mảnh | Nằm ở đâu | Có rời đi được không? |
| --- | --- | --- |
| **Mảnh 1** | Bên trong StrongBox / TEE của điện thoại bạn | **Không.** Không thể xuất ra, do thiết kế của phần cứng |
| **Mảnh 2** | Trên thiết bị của bạn, và một bản sao đã mã hoá trong cơ sở dữ liệu của chúng tôi | Có, ở dạng đã mã hoá |
| **Mảnh 3** | Được máy chủ của chúng tôi tính ra từ một khoá giữ trong Google Cloud KMS | Không bao giờ được lưu |

Chúng được ghép lại trên thiết bị của bạn, trong mã native. Kết quả chỉ tồn tại
đúng bằng thời gian của một thao tác, rồi bị xoá khỏi bộ nhớ.

Vì **mảnh 1 không thể rời khỏi điện thoại**, không ai đang nắm mảnh 2 và mảnh 3 —
chúng tôi, một nhà cung cấp đám mây, hay một kẻ tấn công có trong tay cơ sở dữ
liệu của chúng tôi — có thể tạo ra chiếc khoá đó. Đó là toàn bộ lập luận, và nó
dựa trên phần cứng chứ không dựa vào thiện chí của chúng tôi.

## Máy chủ của chúng tôi thật sự xử lý những gì

Ở đây, chính xác quan trọng hơn là nghe cho tuyệt đối.

- **Mã mở khoá** của bạn không bao giờ được truyền đi. Ở gói Titanium, nó thậm chí không bao giờ ở dạng máy chủ có thể dùng được: giao thức OPAQUE chứng minh rằng bạn biết mã mở khoá mà không tiết lộ bất cứ thứ gì để một máy chủ có thể đem đi thử ngoại tuyến.
- **Mật khẩu** của bạn được mã hoá trước khi lưu và không bao giờ được tải lên cơ sở dữ liệu của chúng tôi. Bản sao lưu đi vào Google Drive của chính bạn.
- **Mảnh 2 có được máy chủ của chúng tôi xử lý** trong quá trình dẫn xuất khoá, và một bản sao được lưu ở dạng đã mã hoá. Tự nó thì không mở được gì cả.
- Chúng tôi lưu những gì một tài khoản cần để tồn tại: email của bạn, gói bảo mật, tên mẫu máy và khoá công khai của thiết bị, cùng các sự kiện bảo mật như đăng nhập và đổi thiết bị.

## Vì sao chúng tôi không thể giúp nếu bạn quên mã mở khoá

Chúng tôi không có gì để đối chiếu một mã mở khoá, và không có đường nào tới
chiếc khoá nếu không có thiết bị của bạn. Không có liên kết đặt lại, không có câu
hỏi khôi phục, và không có quyền can thiệp nội bộ — điều đó cũng có nghĩa là
không có quyền can thiệp nào để người khác đòi ở chúng tôi.

Đó là cái giá phải đánh đổi. Một dịch vụ có thể khôi phục kho mật khẩu của bạn là
một dịch vụ có thể đọc nó.

## Những giới hạn thật lòng nằm ở đâu

- **Bản sao lưu và bản xuất chỉ mở được trên đúng thiết bị đã tạo ra chúng.** Chúng mang một lớp mã hoá gắn với phần cứng bảo mật của chiếc điện thoại đó, nên chép tệp sang máy khác cũng vô ích. Chúng bảo vệ bạn khỏi việc mất dữ liệu trên chiếc điện thoại bạn vẫn còn — chứ không bảo vệ bạn khỏi việc mất điện thoại.
- **Chống quay màn hình khi nhập mã mở khoá cần Android 15.** Ở phiên bản thấp hơn, các cửa sổ của chính ứng dụng vẫn được loại khỏi ảnh chụp và bản ghi màn hình, nhưng bàn phím trên màn hình thuộc về một ứng dụng khác nên không thể loại trừ được.
- **Bàn phím bạn cài đặt có thể đọc những gì bạn gõ**, trong mọi ứng dụng. Nếu điều đó quan trọng với bạn, hãy dùng bàn phím đi kèm máy; PasswordEpic sẽ cảnh báo khi bàn phím đang dùng không phải bàn phím gốc.
- **Silver, gói miễn phí, hoàn toàn bằng phần mềm.** Nó mã hoá bằng AES-256-CTR cộng thêm một thẻ xác thực riêng, chạy trong JavaScript, không dùng lưu trữ khoá bằng phần cứng. Các gói trả phí chuyển phần này sang mã native với khoá được StrongBox bảo vệ.

## Những gì bạn có thể làm bất cứ lúc nào

- **Cài đặt → Đặt lại tài khoản** xoá ngay kho mật khẩu và dữ liệu tài khoản của bạn khỏi máy chủ của chúng tôi.
- Sao lưu vào Google Drive **của chính bạn**, hoặc không sao lưu gì cả.
- Ở các gói trả phí, xem thiết bị nào đang giữ tài khoản, và giải phóng tài khoản khỏi thiết bị đó.
