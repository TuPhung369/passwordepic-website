---
title: Một thiết bị cho mỗi tài khoản
description: Quy tắc một thiết bị được thực thi thế nào ở các gói trả phí, nó bảo vệ điều gì, và cách chuyển sang điện thoại mới.
hide_table_of_contents: true
---

# Một thiết bị cho mỗi tài khoản

Ở **Gold, Platinum và Titanium**, mỗi tài khoản chạy trên đúng một thiết bị tại
một thời điểm. **Silver được miễn** — không giới hạn thiết bị ở gói miễn phí là
một quyết định về sản phẩm, không phải một thiếu sót.

## Nó là gì, và không phải là gì

Nó là **cấp phép theo chỗ ngồi**: một thuê bao không thể trải ra mười chiếc điện
thoại.

Nó **không phải** thứ giữ bí mật cho mật khẩu của bạn. Shard 1 nằm trong phần cứng
bảo mật của điện thoại bạn và không bao giờ rời khỏi đó, nên một thiết bị thứ hai
dù thế nào cũng không giải mã được kho của thiết bị thứ nhất — nó chỉ có thể có
một kho rỗng của riêng nó.

Cái mà quy tắc này bổ sung là thiết bị thứ hai **không có kho nào hoạt động cả**,
và tài khoản nhìn thấy rõ là đang thuộc về một chiếc máy có tên. Thổi phồng nó
thành một biện pháp bảo mật nội dung sẽ là nói quá, và sẽ cướp công của thứ thật
sự làm việc đó.

## Được thực thi ra sao

Không phải bằng mã định danh thiết bị. Mã định danh chỉ là một chuỗi ứng dụng gửi
lên, và mười chiếc máy hoàn toàn có thể gửi cùng một chuỗi.

Thay vào đó, điện thoại của bạn chứng minh danh tính bằng cách **giữ một chiếc
khoá không thể xuất ra** — được sinh bên trong StrongBox hoặc TEE, và máy chủ của
chúng tôi chỉ biết nửa công khai của nó. Mỗi lần dẫn xuất khoá đều được ký bằng
chiếc khoá ấy.

Điểm thực thi chính là lời gọi trả về một phần khoá kho của bạn. Ở các gói trả
phí:

```
không dẫn xuất khoá thành công  =  không có khoá kho  =  không có kho
```

Điều đó bịt lại lối thoát quen thuộc của kiểu kiểm tra này. Ngắt mạng không giúp
vượt qua nó, mà chỉ đồng nghĩa với việc cũng không có kho luôn.

## Chuyển sang điện thoại mới

:::warning Giải phóng tài khoản không mang kho mật khẩu đi theo

Nó chỉ cho phép bạn bắt đầu lại từ đầu trên thiết bị mới. Kho cũ vẫn nằm nguyên ở
dạng mã hoá, bằng một chiếc khoá chỉ từng tồn tại bên trong phần cứng bảo mật của
chiếc điện thoại cũ. Xem [Sao lưu và xuất dữ liệu](./backups.md).

:::

**Nếu bạn vẫn còn máy cũ:** mở PasswordEpic trên máy đó và chọn **Cài đặt → Đặt
lại tài khoản**. Thao tác đó xoá dữ liệu trên thiết bị ấy và giải phóng tài khoản.
Sau đó đăng nhập trên máy mới.

**Nếu bạn không còn máy cũ:** gửi email tới
[support@passwordepic.com](mailto:support@passwordepic.com) từ — hoặc có nêu rõ —
địa chỉ email bạn dùng để đăng nhập, và chúng tôi sẽ giải phóng giúp bạn.

Đây là trường hợp duy nhất mà liên hệ bộ phận hỗ trợ thật sự là lối đi duy nhất:
bình thường, việc giải phóng một thiết bị đòi hỏi chữ ký phần cứng của chính thiết
bị đó — nên khi chiếc điện thoại đã mất, chúng tôi là thứ còn lại.

## "Tài khoản đang hoạt động trên thiết bị khác"

Thông báo đó nghĩa là tài khoản hiện đang gắn với một chiếc điện thoại khác. Hãy
làm theo các bước ở trên để giải phóng nó.

Lần đăng nhập thứ hai bị từ chối thẳng thay vì được lặng lẽ cho qua rồi hoạt động
nửa vời — thất bại được để lộ ra một cách cố ý.

## Đọc tiếp

- [Sao lưu và xuất dữ liệu](./backups.md) — vì sao kho cũ không đi theo bạn
- [Các gói bảo mật](./security-tiers.md) — quy tắc này áp dụng cho những gói nào
- [Hỗ trợ](/vi/support) — cách liên hệ với người thật
