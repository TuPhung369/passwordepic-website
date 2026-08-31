---
title: Cài đặt
description: Từng công tắc trên màn hình Cài đặt, nó thật sự đổi cái gì, và hai mục không nên đụng vào một cách tuỳ tiện.
hide_table_of_contents: true
---

# Cài đặt

Năm phần, theo đúng thứ tự này: **Security**, **Advanced Security**,
**Zero-Knowledge Encryption**, **General**, **Support** — cộng thêm hai mục ở dưới
cùng, một trong hai xoá sạch mọi thứ. Trang này đi qua tất cả, theo thứ tự đó.

Trên cùng là thẻ tài khoản của bạn: tài khoản Google bạn đã đăng nhập, và một
chiếc khiên nếu thiết bị vượt qua các bài kiểm tra.

## Security

![Phần Security](/img/guide/settings-security.webp)

### Fingerprint & face unlock

Hãy để ý cách dòng này viết: xác thực là **bắt buộc** để vào ứng dụng. Nó không
phải một công tắc tiện lợi mà bạn tắt đi cho đỡ một bước.

**Nó thay cho việc gõ, không thay cho mã mở khoá.** DEK của bạn vẫn được dựng từ
mã mở khoá; sinh trắc học chỉ mở một bản đã lưu của bước đó. Nếu đọc vân tay
thất bại, bạn nhập mã mở khoá — và đó là lý do quên mã vẫn là mất vĩnh viễn.

Nếu máy bạn không có phần cứng sinh trắc học, hoặc chưa đăng ký cái nào, hãy đăng
ký trong phần cài đặt của chính điện thoại trước.

### Autofill Management

Mở ra một màn hình có ba tab — **Service**, **Domains**, **Stats** — được nói đầy
đủ trong [Cài đặt tự động điền](./autofill.md).

Nói gọn: **Service** bật/tắt, **Domains** là danh sách tên miền tin cậy, còn
**Stats** đếm những gì đã thực sự được điền.

### Change Passcode

Đổi bí mật duy nhất mà bạn gõ. Bạn phải tự xác minh trước.

**Việc này rẻ hơn vẻ ngoài của nó, và bạn nên dùng thoải mái hơn mức bạn đang
dùng.** Nó chỉ bọc lại một bí mật do máy sinh ra; bản thân DEK không đổi, nên
**không một mật khẩu đã lưu nào bị mã hoá lại**.

Nếu có lúc nào bạn nghĩ ai đó đã nhìn thấy mình gõ, hãy đổi. Toàn bộ quy trình,
kèm chuyện gì xảy ra với các tệp xuất, nằm [ở cuối trang này](#changing-your-passcode).

### Auto-Lock

Khoá ứng dụng sau một khoảng không thao tác — mặc định 2 phút.

Ngắn hơn thì an toàn hơn; nhưng cái bạn thật sự giữ được là cái đủ dài để bạn
không phải vật lộn với nó.

### Screen Protection

**Luôn bật**, và dòng đó nói vậy chứ không đưa ra công tắc. Chạm vào để kiểm tra
xem nó có đang hoạt động không.

Chụp màn hình và quay màn hình ứng dụng đều bị chặn. Nó phủ tới đâu và không phủ
tới đâu nằm trong
[Cài đặt tự động điền](./autofill.md#screen-capture).

## Advanced Security

![Phần Advanced Security](/img/guide/settings-advanced.webp)

Bốn công tắc, tất cả đều về thiết bị chứ không về dữ liệu:

| Công tắc | Nó canh chừng điều gì |
| --- | --- |
| **Security Checks** | Công tắc tổng cho ba mục dưới |
| **Root Detection** | Các hạn chế gốc của máy đã bị gỡ bỏ |
| **Anti-Tampering** | Ứng dụng bị sửa đổi, hoặc bị một công cụ móc vào |
| **Memory Protection** | Giữ các giá trị nhạy cảm ngoài tầm với khi đang dùng |

Trên một chiếc máy đã root, ứng dụng khác đọc được bộ nhớ của ứng dụng này — kể
cả mã mở khoá lúc bạn đang gõ. Đó là lý do các gói trả phí từ chối chạy ở đó.

### Security Status

Một bộ đếm trực tiếp. **No threats detected** là thứ bạn muốn thấy. Bất cứ thứ gì
khác đều nêu tên cái nó tìm ra, và chạm vào sẽ cho bạn chi tiết:

![Một mối đe doạ được phát hiện](/img/guide/settings-threat.webp)

Mỗi phát hiện đều kèm mức độ nghiêm trọng, một câu giải thích bằng lời thường, và
một khuyến nghị. **Continue Anyway** vẫn được đưa ra, còn **Close App** mới là
lựa chọn mặc định — và với một cái kho thì thứ tự đó là đúng.

Chính bộ máy này có một công dụng không ai ngờ tới, đó là
[cách kiểm tra một chiếc điện thoại cũ trước khi mua](./faq.md#used-phone-check).

## Zero-Knowledge Encryption

![Phần mã hoá](/img/guide/settings-encryption.webp)

Dòng **Zero-Knowledge** mang gói của bạn dưới dạng một huy hiệu. Đây là nơi bạn
đọc xem engine nào đang bảo vệ mình; còn bản thân gói thì được chọn lúc bạn tạo
mã mở khoá lần đầu, không phải ở đây.

Từ **Gold trở lên thì cái này luôn bật** và không tắt được — một phần khoá của bạn
được tính bên trong một mô-đun phần cứng của Google Cloud, bằng một bí mật không
bao giờ rời khỏi đó. Ghi chú trên màn hình nói đúng như vậy, và nêu tên ba gói mà
nó áp dụng.

**KMS Status** cho biết kết nối đó đang thế nào:

| Trạng thái | Nghĩa là |
| --- | --- |
| **Connected & Healthy** | Bình thường |
| **Degraded (using cache)** | Vẫn tới được nhưng không ổn; ứng dụng đang xoay xở |
| **Not initialized** | Chưa được thiết lập |
| **Disabled** | Chỉ ở gói Silver |

Bảng so sánh đầy đủ nằm trong [Các gói bảo mật](./security-tiers.md).

## General

![General và Support](/img/guide/settings-general.webp)

| Mục | |
| --- | --- |
| **Theme** | Sáng, Tối, hoặc theo hệ thống |
| **Language** | Tiếng Anh và tiếng Việt |
| **Backup & Restore** | Cùng một bảng với nút 7 trong kho |

**Theme** không đổi ứng dụng — vẫn những màn hình đó, vẫn những chữ đó, và vẫn năm
chiếc chìa khoá đặt tên cho các gói:

![Ứng dụng ở giao diện sáng](/img/guide/signin-light.webp)

![Ứng dụng ở giao diện tối](/img/guide/signin-dark.webp)

**Theo hệ thống** đi theo điện thoại của bạn, và đó là lựa chọn phần lớn mọi
người muốn rồi quên mất là mình đã chọn.

:::warning Một bản sao lưu sẽ không đưa bạn sang máy mới

Ở mọi gói. Nó bảo vệ bạn khỏi việc mất dữ liệu trên chiếc máy bạn vẫn còn.
[Sao lưu và xuất dữ liệu](./backups.md) giải thích vì sao, và nên làm gì thay thế.

:::

## Support

- **Help & Support** — `support@passwordepic.com`. Một địa chỉ thật; xem
  [Hỗ trợ](/support).
- **Privacy Policy** — [chính là bản trên trang này](/privacy).
- **About** — số phiên bản và số bản dựng. Đáng dẫn ra khi bạn viết thư cho chúng
  tôi.

## Sign Out

Đăng xuất bạn ra và **thu hồi tự động điền ngay lập tức** — dịch vụ ngừng trả lời
yêu cầu chứ không tiếp tục với một phiên đã cũ.

Kho của bạn vẫn nằm trên máy. Đăng xuất không phải là xoá.

## Reset Account

Mục cuối cùng, và là mục duy nhất phá huỷ thứ gì đó.

:::danger Cái này xoá sạch mọi thứ, ngay lập tức

**Reset Account** xoá kho của bạn và dữ liệu tài khoản của bạn khỏi máy chủ của
chúng tôi. Không có hàng đợi, không có thời gian lưu giữ, không có phiếu hỗ trợ,
và **không có đường quay lại** — không cho bạn, và không cho chúng tôi.

Đó cũng chính là tính chất ngăn người khác đọc kho của bạn. Nó cắt về cả hai
phía, và đây là lúc nó cắt về phía có lợi cho bạn.

Dùng nó khi bạn rời đi, hoặc khi cần giải phóng tài khoản khỏi một thiết bị bạn
không còn giữ. Đừng dùng để sửa một lỗi vặt.

:::

## Đổi mã mở khoá {#changing-your-passcode}

Đáng đi qua từng bước, vì đây là quy trình duy nhất mà ứng dụng nói với bạn một
điều bất ngờ về chính dữ liệu của bạn.

![Xác minh mã mở khoá hiện tại](/img/guide/passcode-verify.webp)

Đầu tiên bạn chứng minh bạn là bạn, bằng mã mở khoá đang dùng.

![Chọn mã mở khoá mới](/img/guide/passcode-update.webp)

Rồi tới mã mới — và hãy đọc câu nằm dưới tiêu đề:

> Những mật khẩu bạn đã lưu **không bị mã hoá lại** — chỉ chiếc khoá bảo vệ chúng
> được bọc lại.

Đó là lý do đổi mã mở khoá rẻ. Không có gì trong kho bị đụng tới. Xem
[Mã mở khoá của bạn](./your-passcode.md#changing-it) để biết bên dưới thực sự
đang xảy ra chuyện gì.

![Chuyện gì xảy ra với các tệp xuất](/img/guide/passcode-export-reencrypt.webp)

**Các tệp xuất** thì lại là chuyện khác, vì chúng mang theo lớp bảo vệ của riêng
mình. Ứng dụng đề nghị mã hoá lại tệp xuất mới nhất ở cả ba nơi bằng mã mở khoá
mới, và cảnh báo thẳng rằng **các tệp xuất cũ hơn sẽ bị xoá** — một tệp xuất được
bảo vệ bằng mã mở khoá bạn vừa thay là một đầu dây thừa, không phải một bản sao
lưu.

## Đọc tiếp

- [Kho của bạn](./guide-vault.md) — màn hình chính, từng nút một
- [Tạo mật khẩu](./guide-generator.md) — mười template
- [Sự cố thường gặp](./faq.md) — các thông báo lỗi nghĩa là gì
