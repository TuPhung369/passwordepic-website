---
title: Tự động điền
description: Bật tự động điền, chuyện gì xảy ra mỗi lần nó chạy, và một bản ghi màn hình thấy được gì.
hide_table_of_contents: true
---

# Tự động điền

PasswordEpic điền thông tin đăng nhập thông qua khung Autofill của chính Android.
Nó không theo dõi màn hình của bạn, và không cần quyền trợ năng để hoạt động.

## Bật lên

1. Mở **Cài đặt → Mật khẩu và tài khoản → Dịch vụ tự động điền** của Android.
2. Chọn **PasswordEpic**.

Toàn bộ phần thiết lập chỉ có vậy. Tự động điền cần **Android 8.0 trở lên**.

Nếu sau đó nó vẫn không xuất hiện:

- Kiểm tra lại cài đặt — một số launcher đặt lại mục này sau khi cập nhật.
- Một số ứng dụng chủ động từ chối tự động điền. Đó là lựa chọn của họ, không phải
  lỗi của PasswordEpic, và không trình quản lý mật khẩu nào điền được vào những ô
  đó.
- Hộp thoại tự động điền là một cửa sổ tách biệt với ứng dụng chính. Nếu nó hoàn
  toàn không hiện ra, hãy chắc chắn PasswordEpic không bị tính năng tối ưu pin hạn
  chế chạy nền.

## Mỗi lần điền thì chuyện gì xảy ra

1. Bạn chạm vào một ô đăng nhập trong ứng dụng khác hoặc trên một trang web.
2. **Android** — chứ không phải PasswordEpic — nhận ra ô đó và hỏi dịch vụ tự động
   điền đang được chọn xem có gợi ý gì không.
3. PasswordEpic yêu cầu bạn xác nhận bằng **vân tay hoặc mã mở khoá**. Mọi lần,
   không ngoại lệ.
4. Đúng một mục được giải mã, chỉ cho lần điền đó. Phần còn lại của kho vẫn nằm
   nguyên ở dạng mã hoá.
5. Bản rõ và chiếc khoá được giải phóng ngay khi ô đã được điền.

Không có khoảng thời gian nào mà việc điền diễn ra không cần bạn, và không có chế
độ "mở khoá trong 5 phút".

## Một bản ghi màn hình thấy được gì

Các cửa sổ của chính ứng dụng — bao gồm cả hộp thoại tự động điền — được loại khỏi
ảnh chụp và bản ghi màn hình. Khi bị quay, chúng hiện ra màu đen.

**Bàn phím không nằm trong số đó.** Nó do ứng dụng bàn phím bạn đang dùng vẽ ra,
trong tiến trình riêng của nó, và không ứng dụng nào có thể mở rộng lớp bảo vệ ấy
sang cửa sổ của ứng dụng khác. Vì vậy một bản ghi sẽ cho thấy hộp thoại tối đen với
một bàn phím hiện rõ bên dưới.

Hai điều rút ra từ đó, và cả hai đều đáng lưu ý:

- **Bong bóng xem trước phím mới là chỗ rò rỉ thật sự.** Bàn phím chỉ tắt cái chữ
  cái nhỏ nảy lên phía trên mỗi phím khi ô nhập là ô mật khẩu — nên ô nhập mã mở
  khoá luôn được giữ ở chế độ mật khẩu, kể cả khi bạn chạm vào hình con mắt để xem
  những gì mình vừa gõ. Hiển thị nội dung bên trong một cửa sổ được bảo vệ là an
  toàn; đưa bàn phím ra khỏi chế độ mật khẩu thì không.
- **Vị trí chạm không bị ghi lại**, trừ khi bạn đã bật tuỳ chọn nhà phát triển
  "Hiển thị thao tác chạm".

Phần rủi ro còn lại là nhỏ, nhưng không phải bằng không. Loại bỏ nó hoàn toàn sẽ
cần một bàn phím số dựng sẵn trong ứng dụng, đồng nghĩa với việc từ bỏ những mã mở
khoá có chữ cái và ký hiệu.

:::caution Bàn phím của bạn có thể đọc những gì bạn gõ

Điều này đúng với mọi ứng dụng, không riêng ứng dụng này. Một bàn phím bạn cài đặt
nhìn thấy mọi phím bạn gõ cho nó.

Nếu điều đó quan trọng với bạn, hãy dùng bàn phím đi kèm máy. PasswordEpic sẽ cảnh
báo khi bàn phím đang dùng không phải bàn phím gốc.

:::

## Đăng xuất

Đăng xuất thu hồi tự động điền ngay lập tức. Dịch vụ ngừng đưa ra gợi ý thay vì
tiếp tục trả lời các yêu cầu bằng một phiên đã cũ.

## Đọc tiếp

- [Mã mở khoá của bạn](./your-passcode.md) — thứ bạn sẽ được hỏi ở mỗi lần điền
- [Cách hoạt động](./how-it-works.md) — những gì phải xảy ra trước khi một mục có thể được giải mã
