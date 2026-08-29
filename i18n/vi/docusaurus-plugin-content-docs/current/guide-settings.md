---
title: Cài đặt
description: Từng công tắc trên màn hình Cài đặt, nó thật sự đổi cái gì, và hai mục bạn không nên đụng vào tuỳ tiện.
hide_table_of_contents: true
---

# Cài đặt

Ba phần — **Bảo mật**, **Chung**, **Hỗ trợ** — cộng thêm một mục ở dưới cùng có
thể xoá sạch mọi thứ. Trang này đi qua tất cả, theo đúng thứ tự.

## Bảo mật

![Phần Bảo mật](/img/guide/settings-security.png)

### Xác thực sinh trắc học

Mở khoá bằng vân tay hoặc khuôn mặt thay vì gõ mã mở khoá mỗi lần.

**Nó thay cho việc gõ, không thay cho mã mở khoá.** Khoá kho của bạn vẫn được
dựng từ mã mở khoá; sinh trắc học chỉ mở một bản đã lưu của bước đó. Nếu lần đọc
sinh trắc thất bại, bạn nhập mã mở khoá — và đó là lý do quên nó vẫn là vĩnh viễn.

Nếu máy không có phần cứng sinh trắc, hoặc chưa đăng ký, mục này hiện *Không khả
dụng trên thiết bị này*. Hãy đăng ký trong cài đặt của chính điện thoại trước.

### Quản lý tự động điền

Nơi bạn bật tự động điền, và quản lý:

- **Tên miền tin cậy** — những trang được đề xuất tự động.
- **Tên miền bị chặn** — những trang không bao giờ được đề xuất, dù đã lưu gì.
- **Bắt buộc sinh trắc học** — hãy để bật.
- **Cho phép tên miền con** — một mục lưu cho `example.com` có được đề xuất trên
  `mail.example.com` không.
- **Thống kê tự động điền** — số lần điền, số lần lưu, và mục nào bạn thật sự
  dùng.

Hướng dẫn cài đặt đầy đủ, kể cả bước phụ mà Chrome đòi hỏi, nằm ở
[Cài đặt tự động điền](./autofill.md).

### Đổi mã mở khoá

Đổi bí mật duy nhất bạn gõ. Bạn phải xác thực trước.

**Việc này rẻ hơn vẻ ngoài của nó, và bạn nên dùng nó thoải mái hơn mức bạn đang
dùng.** Nó chỉ bọc lại một bí mật do máy sinh ra; bản thân khoá kho không đổi, nên
**không một mật khẩu nào đã lưu bị mã hoá lại** và các bản sao lưu hiện có vẫn còn
giá trị.

Nếu có lúc nào bạn nghĩ ai đó đã nhìn thấy mình gõ, hãy đổi nó. Xem
[Mã mở khoá của bạn](./your-passcode.md#đổi-mã-mở-khoá).

### Tự động khoá

Khoá ứng dụng sau một khoảng không hoạt động. Ngắn hơn thì an toàn hơn; nhưng đủ
dài để bạn không phải vật lộn với nó mới là con số bạn thật sự giữ được.

### Bảo vệ màn hình

Chặn chụp ảnh và quay màn hình ứng dụng.

Hãy để bật. Lý do thành thật duy nhất để tắt là khi bạn đang viết tài liệu và cần
chụp màn hình — và nếu vậy, nhớ bật lại. Nó phủ được gì và không phủ được gì thì
nằm ở [Cài đặt tự động điền](./autofill.md#ảnh-chụp-và-bản-ghi-màn-hình-bắt-được-gì).

### Kiểm tra bảo mật

Ba công tắc liên quan nhau, đều nói về *thiết bị* chứ không phải dữ liệu:

| Công tắc | Nó canh chừng điều gì |
| --- | --- |
| **Phát hiện root** | Các hạn chế có sẵn của máy đã bị gỡ bỏ |
| **Chống can thiệp** | Ứng dụng bị sửa, hoặc có công cụ hook vào |
| **Bảo vệ bộ nhớ** | Giữ các giá trị nhạy cảm ngoài tầm với khi đang dùng |

Trên một chiếc máy đã root, ứng dụng khác đọc được bộ nhớ của ứng dụng này — kể cả
mã mở khoá lúc bạn đang gõ. Đó là lý do các gói trả phí từ chối chạy ở đó.

### Trạng thái bảo mật

Bản tóm tắt theo thời gian thực. **Không phát hiện mối đe doạ nào** là thứ bạn
muốn thấy. Mọi thứ khác đều nêu rõ nó tìm thấy gì.

### Gói bảo mật

![Bảng chọn gói](/img/guide/settings-tier.png)

Bộ máy thực hiện việc mã hoá.

| Gói | Bộ máy | Một dòng |
| --- | --- | --- |
| 🥈 **Silver** | JavaScript | Miễn phí, chỉ phần mềm, chạy được ở mọi nơi |
| 🥇 **Gold** | Native + StrongBox | Khoá dựa trên phần cứng. **Gói được khuyến nghị.** |
| 💎 **Platinum** | Gold + kiểm tra lúc chạy | Mã hoá y hệt Gold, cộng bằng chứng thiết bị còn lành |
| 🛡️ **Titanium** | Platinum + OPAQUE + Rust | Không lưu bất cứ thứ gì mở được kho |

Hai điều bảng chọn không nói được, và cả hai đều quan trọng:

- **Platinum giống hệt Gold về mật mã học.** Không có thuật toán mạnh hơn nào ẩn
  trong đó. Thứ nó thêm vào là Play Integrity, ghim chứng chỉ và phát hiện can
  thiệp — những phép kiểm tra rằng các giả định phía sau phần mã hoá vẫn còn đúng.
- **Silver không phải là phiên bản thu nhỏ của Gold.** Nó là một bộ máy khác:
  AES-256-CTR kèm thẻ xác thực riêng, chạy trong JavaScript, không lưu khoá bằng
  phần cứng. Là những đánh đổi được chấp nhận cho một gói miễn phí, nhưng vẫn là
  đánh đổi thật.

Đổi gói chỉ ảnh hưởng tới các thao tác mã hoá **mới**. Các mục hiện có sẽ được mã
hoá lại vào lần dùng tiếp theo.

Bảng so sánh đầy đủ nằm ở [Các gói bảo mật](./security-tiers.md).

:::caution "Device Integrity Check Failed"

Platinum và Titanium xác minh thiết bị trước khi cho dùng gói. Một chiếc máy đã
root hoặc đã bị sửa, hay bootloader đang mở khoá, sẽ không đạt.

Đó không phải một sự hạ cấp bạn phải chấp nhận như mất mát — **Gold có cùng thuật
toán, cùng khoá dựa trên phần cứng, cùng bộ máy.** Nó chỉ đơn giản là không chạy
những phép kiểm tra lúc chạy đó.

Và chính phép kiểm tra ấy có một công dụng không ai ngờ tới, là
[cách soi một chiếc điện thoại cũ trước khi mua](./faq.md#used-phone-check).

:::

### Mã hoá zero-knowledge

Ở **Gold trở lên thì mục này luôn bật** và không tắt được — một phần chiếc khoá
của bạn được tính bên trong một mô-đun phần cứng của Google Cloud, bằng một bí mật
không bao giờ rời khỏi đó.

**Trạng thái KMS** cho bạn biết kết nối đó đang thế nào:

| Trạng thái | Nghĩa là |
| --- | --- |
| **Đã kết nối & khoẻ** | Bình thường |
| **Suy giảm (đang dùng bộ đệm)** | Vẫn tới được nhưng không ổn định; ứng dụng đang xoay xở |
| **Chưa khởi tạo** | Chưa thiết lập |
| **Đã tắt** | Chỉ ở gói Silver |

## Chung

![Phần Chung và Hỗ trợ](/img/guide/settings-general.png)

### Ngôn ngữ

Tiếng Anh và tiếng Việt.

### Sao lưu & khôi phục

Nơi quản lý các bản sao lưu đã mã hoá của bạn.

:::warning Bản sao lưu không đưa bạn sang máy mới được

Ở mọi gói. Nó bảo vệ bạn khỏi việc mất dữ liệu trên chiếc máy bạn vẫn còn.
[Sao lưu và xuất dữ liệu](./backups.md) giải thích vì sao, và nên làm gì thay thế.

:::

## Hỗ trợ

- **Trợ giúp & Hỗ trợ** — mở ứng dụng email để liên hệ chúng tôi.
- **Chính sách quyền riêng tư** — [chính là bản trên trang này](/vi/privacy).
- **Giới thiệu** — thông tin phiên bản. Đáng ghi kèm khi bạn viết thư cho chúng
  tôi.

## Đăng xuất

Đăng xuất và **thu hồi tự động điền ngay lập tức** — dịch vụ ngừng trả lời các
yêu cầu thay vì tiếp tục bằng một phiên đã cũ.

Kho của bạn vẫn nằm trên máy. Đăng xuất không phải là xoá.

## Đặt lại tài khoản

Mục cuối cùng, và là mục duy nhất phá huỷ thứ gì đó.

:::danger Thao tác này xoá sạch mọi thứ, ngay lập tức

**Đặt lại tài khoản** xoá kho mật khẩu và dữ liệu tài khoản của bạn khỏi máy chủ
của chúng tôi. Không hàng đợi, không thời gian lưu giữ, không phiếu hỗ trợ, và
**không có đường quay lại** — không cho bạn, và cũng không cho chúng tôi.

Đó chính là đặc tính đã ngăn mọi người khác đọc kho của bạn. Nó cắt về cả hai
phía, và đây là lúc nó cắt về phía bạn.

Hãy dùng nó khi bạn chuyển sang máy mới, hoặc khi rời đi. Đừng dùng nó để chữa
một lỗi vặt.

:::

## Đọc tiếp

- [Kho của bạn](./guide-vault.md) — màn hình chính, từng nút một
- [Tạo mật khẩu](./guide-generator.md) — bộ tạo mật khẩu và các preset
- [Sự cố thường gặp](./faq.md) — các thông báo lỗi nghĩa là gì
