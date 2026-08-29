---
title: Các gói bảo mật
description: Silver, Gold, Platinum và Titanium mỗi gói thay đổi điều gì — và điều gì giống nhau ở cả bốn.
hide_table_of_contents: true
---

# Các gói bảo mật

PasswordEpic có bốn gói. Mỗi gói là gói ngay dưới nó **cộng thêm một phần chênh
lệch** — chúng không phải bốn sản phẩm riêng biệt, và hiểu theo hướng đó là con
đường nhanh nhất dẫn tới kết luận sai.

Có hai điều đúng với cả bốn gói, và biết chúng trước sẽ đỡ phải đọc lại phần còn
lại hai lần.

1. **Bạn chỉ gõ một bí mật — mã mở khoá.** Ở mọi gói. Bất cứ thứ gì mở khoá phần
   còn lại của chuỗi đều do máy sinh ra và không bao giờ hiển thị cho ai. Xem
   [Mã mở khoá của bạn](./your-passcode.md).
2. **Chỉ có hai bộ máy mã hoá.** Silver chạy trong JavaScript. Gold, Platinum và
   Titanium đều chạy cùng một bộ máy native, và chỉ khác nhau ở chỗ cái gì *canh
   gác* nó hoặc cái gì *mở* khoá.

## Nhìn tổng quan

| | 🥈 Silver | 🥇 Gold | 💎 Platinum | 🛡️ Titanium |
| --- | --- | --- | --- | --- |
| **Bộ máy** | JavaScript | Native (Kotlin) | Giống Gold | Giống Gold |
| **Thuật toán mã hoá kho** | AES-256-CTR + HMAC-SHA256 | AES-256-GCM | Giống Gold | Giống Gold |
| **Shard 1 lưu ở** | Bộ nhớ ứng dụng đã mã hoá | StrongBox / TEE | Giống Gold | Giống Gold |
| **Shard 2 được mở bởi** | Vault secret | Vault secret | Vault secret | **Khoá OPAQUE** |
| **Mảnh khoá từ Cloud KMS** | ✗ | ✓ | ✓ | ✓ |
| **Xoá khoá khỏi bộ nhớ sau khi dùng** | ✗ | ✓ | ✓ | ✓ |
| **Gia cố lúc chạy** | ✗ | ✗ | ✓ | ✓ |
| **Lõi mã hoá Rust** | ✗ | ✗ | ✗ | ✓ |
| **Số thiết bị mỗi tài khoản** | Không giới hạn | Một | Một | Một |
| **Cần Android** | ✗ | ✓ | ✓ | ✓ |

## 🥈 Silver — gói miễn phí

Gói duy nhất chạy được mà không cần mô-đun native của Android, và là phương án dự
phòng khi không còn lựa chọn nào khác.

- Mã hoá chạy trong **JavaScript**: AES-256-CTR kèm một thẻ xác thực HMAC-SHA256
  riêng.
- Shard 1 nằm trong bộ nhớ ứng dụng đã mã hoá chứ không nằm trong một mô-đun phần
  cứng.
- Khoá kho là `Shard 1 ⊕ Shard 2`. Không có mảnh khoá từ Cloud KMS và không cần
  gọi mạng để mở khoá.
- Không giới hạn thiết bị.

:::caution Những gì Silver không có

**Không lưu khoá bằng phần cứng** và **không đảm bảo khoá được xoá khỏi bộ nhớ** —
chuỗi trong JavaScript không thể xoá một cách đáng tin cậy. Đây là những đánh đổi
được chấp nhận cho một gói miễn phí phải chạy được ở mọi nơi, không phải khiếm
khuyết. Nhưng chúng là thật, và Silver không bao giờ được mô tả là dựa trên phần
cứng hay là AES-256-GCM.

:::

## 🥇 Gold — mốc bảo mật thật sự

Gói được khuyến nghị, và là nơi những đảm bảo thật sự của thiết kế bắt đầu. Mọi
thứ liên quan tới mã hoá đều chuyển vào mã native.

- **AES-256-GCM**, trong một bộ máy native chứ không phải trong JavaScript.
- **Shard 1 được sinh ra bên trong StrongBox hoặc TEE** và không thể xuất ra, do
  thiết kế của phần cứng.
- Một **mảnh khoá thứ ba được tính bên trong Google Cloud KMS**, dùng một giá trị
  không bao giờ rời khỏi mô-đun bảo mật phần cứng.
- Khoá kho được **dẫn xuất mới cho từng thao tác và xoá sạch ngay sau đó** —
  không lưu đệm, không ghi ra đĩa, không ghi log.
- Một thiết bị cho mỗi tài khoản. Xem
  [Một thiết bị cho mỗi tài khoản](./your-device.md).

## 💎 Platinum — chứng minh rằng thiết bị xứng đáng với Gold

Platinum **giống hệt Gold về mặt mật mã học**. Không có thuật toán riêng cho
Platinum, không có khoá mạnh hơn, không có mảnh khoá thêm. Nếu bạn đang tìm những
thứ đó, chúng không tồn tại.

Điều đó không khiến nó chỉ là hình thức. Mọi đảm bảo trên trang này đều giả định
rằng ứng dụng là ứng dụng thật, chạy nguyên vẹn, trên một thiết bị chưa bị root,
hook hay phủ lớp giả. Platinum là thứ biến giả định đó thành điều được kiểm chứng:

- **Play Integrity**, được xác minh trên máy chủ của chúng tôi chứ không phải
  trong ứng dụng — một kết luận kiểm tra phía client sẽ bị chính kẻ tấn công mà nó
  nhắm tới vá bỏ dễ dàng.
- **Ghim chứng chỉ** cho lời gọi trả về một phần khoá của bạn, để một chứng chỉ
  được thiết bị tin tưởng không thể dùng để chặn bắt nó.
- **Bảo vệ trước lớp phủ và dịch vụ trợ năng** — thứ gì đó vẽ đè lên bàn phím nhập
  mã, hoặc đọc màn hình, sẽ làm dừng các thao tác khoá.
- **Phát hiện can thiệp và root.**

## 🛡️ Titanium — không lưu bất cứ thứ gì mở được kho

Titanium giữ nguyên toàn bộ bộ máy của Gold và thay đổi đúng một thứ: cái gì mở
Shard 2.

Ở Silver, Gold và Platinum, đó là một **vault secret** — 256 bit ngẫu nhiên, được
lưu và bọc bằng mã mở khoá của bạn. Ở Titanium, đó là một **khoá OPAQUE**, được
dẫn xuất lại từ mã mở khoá mỗi lần và không bao giờ ghi ra đĩa dưới bất kỳ dạng
nào, kể cả dạng đã bọc.

Nó còn bổ sung một **lõi mã hoá Rust**, thứ cho phép xoá sạch những giá trị đó
khỏi bộ nhớ native — điều JavaScript hoàn toàn không làm được.

## Bạn dùng được gói nào

- **Silver** luôn khả dụng.
- **Gold, Platinum và Titanium** cần Android và mô-đun native.

Trên một thiết bị Android được hỗ trợ, bạn tự chọn gói chứ không bị hệ thống ấn
định.

:::warning Không có phiên bản iOS

Không có bản dựng cho iOS, và các gói dựa trên phần cứng không có thứ tương đương
trên iOS để chuyển sang. Android 7.0 trở lên.

:::

## Đọc tiếp

- [Cách hoạt động](./how-it-works.md) — các mảnh khoá, và vì sao việc chia nhỏ lại quan trọng
- [Mã mở khoá của bạn](./your-passcode.md) — bí mật duy nhất ở mọi gói
- [Sao lưu và xuất dữ liệu](./backups.md) — vì sao tệp không bao giờ di chuyển giữa các thiết bị
