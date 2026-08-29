---
title: Những từ này nghĩa là gì
description: Mọi thuật ngữ kỹ thuật trên trang này, giải thích mà không mặc định là bạn đã biết sẵn.
hide_table_of_contents: true
---

# Những từ này nghĩa là gì

Sản phẩm bảo mật hay núp sau thuật ngữ. Trang này làm ngược lại: mọi từ được dùng
ở bất cứ đâu trên trang này, nói bằng lời thường, kèm việc nó thật sự đem lại gì
cho bạn và nó dừng lại ở đâu.

Nếu có chỗ nào vẫn khó hiểu thì đó là lỗi của chúng tôi chứ không phải của bạn —
hãy viết cho [support@passwordepic.com](mailto:support@passwordepic.com) và chúng
tôi sẽ sửa lại cách diễn đạt.

## Những khái niệm cơ bản

### Mã mở khoá (passcode)

Bí mật duy nhất bạn gõ. Không phải mã PIN và cũng không phải mật khẩu chính —
trước kia đó là hai thứ riêng trong ứng dụng, và việc gộp chúng lại thành một là
một bước *tăng* bảo mật chứ không phải đơn giản hoá. Xem
[Mã mở khoá của bạn](./your-passcode.md).

### Kho (vault)

Toàn bộ những gì bạn đã lưu trong ứng dụng. Khi trang này nói "chúng tôi không mở
được kho của bạn", đó là nghĩa đen, chứ không phải "chúng tôi hứa sẽ không mở".

### Khoá kho

Chiếc khoá giải mã những mật khẩu bạn đã lưu. Nó không được lưu ở bất cứ đâu —
không trên điện thoại, không trên máy chủ của chúng tôi. Nó được dựng lại từ
những mảnh riêng biệt mỗi lần bạn mở khoá, dùng cho đúng một thao tác, rồi bị xoá
khỏi bộ nhớ.

### Mảnh khoá (shard)

Một phần của khoá kho. Chiếc khoá được chia thành các mảnh nằm ở những nơi khác
nhau, nên không nơi nào — kể cả chúng tôi — nắm đủ để dựng lại nó. Shard 1 nằm
trong chip bảo mật của điện thoại bạn, Shard 2 nằm trên máy bạn ở dạng mã hoá, và
giá trị thứ ba do máy chủ của chúng tôi tính ra. Cần đủ cả ba. Xem
[Cách hoạt động](./how-it-works.md).

### Zero-knowledge

Một hệ thống được xây sao cho chính những người vận hành nó thật sự không đọc
được thứ bạn lưu, chứ không phải kiểu họ đọc được nhưng đã hứa là không đọc. Cách
kiểm tra rất đơn giản: hỏi xem họ có thể đặt lại mật khẩu cho bạn mà vẫn trả lại
đủ dữ liệu không. Nếu có, tức là họ đọc được.

## Trên điện thoại của bạn

### StrongBox và TEE

Hai cái tên cho cùng một ý: **một con chip riêng, bị khoá chặt, nằm trong điện
thoại, dùng để giữ khoá và từ chối đưa khoá ra ngoài.**

Một chiếc khoá được sinh bên trong nó có thể được *dùng* — bạn nhờ chip mã hoá
hoặc giải mã một thứ gì đó — nhưng không có lệnh nào nói "đưa chiếc khoá đó cho
tôi". Không cho ứng dụng, không cho chúng tôi, không cho cả người đã root máy.

**TEE** (Trusted Execution Environment) là một vùng được bảo vệ nằm trong chính
bộ xử lý chính. **StrongBox** là một con chip tách rời hẳn, và mạnh hơn. Điện
thoại của bạn có cái này, cái kia, hoặc không có cái nào, tuỳ vào dòng máy. Đây là
thứ duy nhất mà mọi thứ còn lại trên trang này dựa vào.

### Argon2id

Một cách biến mã mở khoá của bạn thành một chiếc khoá, cố ý làm cho chậm và cố ý
ngốn bộ nhớ.

Điểm mấu chốt là cái giá. Biến mã mở khoá thành khoá tốn **128 MiB bộ nhớ** và một
khoảnh khắc thấy rõ. Bạn trả cái giá đó một lần, lúc mở khoá. Kẻ đang đoán mã của
bạn phải trả nó *cho từng lần đoán* — và đó là thứ biến "hàng triệu lần đoán mỗi
giây" thành một việc chậm hơn và tốn kém hơn rất nhiều.

### Entropy, và con số "45 bit"

Một cách đo độ khó đoán của mã mở khoá có tính đến bộ ký tự bạn chọn, chứ không
chỉ độ dài.

Tám chữ số và tám ký tự hoa-thường lẫn ký hiệu là hai chuyện hoàn toàn khác nhau —
cái sau có số khả năng nhiều hơn khoảng 40 triệu lần. Đếm ký tự không diễn đạt
được điều đó; đếm bit thì được. Ứng dụng yêu cầu 45 bit, và mã của bạn phải dài
bao nhiêu là tuỳ vào thứ bạn gõ nó ra. Xem
[Mã mở khoá của bạn](./your-passcode.md).

### Chống chụp và quay màn hình

Android cho phép một ứng dụng đánh dấu cửa sổ của chính nó là "không được chụp".
Ảnh chụp màn hình sẽ thất bại, và bản ghi màn hình sẽ hiện chúng thành ô đen. Ứng
dụng đặt cờ này trên mọi màn hình có chạm tới mật khẩu của bạn.

**Giới hạn quan trọng:** bàn phím là một ứng dụng khác, nằm trong cửa sổ riêng của
nó, và không ứng dụng nào đặt được cờ đó lên cửa sổ của ứng dụng khác. Nên một bản
ghi sẽ cho thấy ứng dụng tối đen với một bàn phím hiện rõ bên dưới.

### Phát hiện quay màn hình

Từ **Android 15 trở lên**, một ứng dụng có thể được báo khi có bản ghi đang quay
cửa sổ của nó. PasswordEpic dùng điều đó để xoá ô nhập mã và từ chối cho nhập
trong lúc bản ghi đang chạy, rồi khôi phục lại sau đó.

Dưới Android 15 không có cách nào phát hiện đáng tin cậy, và ứng dụng không giả vờ
là có. "Không phát hiện bản ghi nào" trên máy cũ nghĩa là *không biết được*, chứ
không phải *đã xác nhận an toàn*.

### Độ tin cậy của bàn phím

Ứng dụng kiểm tra xem bàn phím bạn đang dùng có đi kèm máy hay được cài thêm về
sau, và cảnh báo nếu là cài thêm.

**Nó đáng giá tới đâu, nói chính xác:** một bàn phím đi kèm máy không mặc nhiên là
an toàn, và một bàn phím bạn cài từ Play Store gần như chắc chắn là bình thường.
Đây là một lời nhắc, không phải một phán quyết — một cảnh báo bạn có thể bỏ qua,
không bao giờ là một rào chặn. Ứng dụng cố ý không giữ danh sách bàn phím "được
duyệt", vì một ứng dụng có thể tự khai bất kỳ tên nào, mà tên thì không phải bằng
chứng về danh tính.

### Lớp phủ và cướp thao tác chạm

**Lớp phủ (overlay)** là cửa sổ một ứng dụng vẽ đè lên ứng dụng khác. Dùng tử tế
thì đó là bong bóng chat hay bộ lọc ánh sáng. Dùng xấu thì đó là một bàn phím nhập
mã giả vẽ đúng lên trên cái thật, hoặc một lớp vô hình lặng lẽ thu lại các thao
tác chạm của bạn — cái thứ hai gọi là **cướp thao tác chạm** (tapjacking).

Cả hai đều bỏ qua hoàn toàn phần mã hoá, bằng cách tiếp cận bí mật của bạn ngay
lúc bạn đang gõ nó. Ứng dụng theo dõi mọi thứ được vẽ đè lên bàn phím nhập mã và
từ chối đi tiếp.

### Dịch vụ trợ năng (accessibility)

Một quyền của Android sinh ra cho trình đọc màn hình và các công cụ tương tự. Nó
cho phép một ứng dụng đọc mọi ô trên màn hình, kể cả ô mật khẩu, và thao tác thay
bạn.

Rất nhiều ứng dụng hợp pháp cũng xin quyền này, và đó chính là lý do nó là món
được mã độc ưa lợi dụng. Khi một dịch vụ như vậy đang hoạt động, PasswordEpic dừng
các thao tác khoá.

### Root, can thiệp và hook

**Root** là khi các hạn chế có sẵn của điện thoại bị gỡ bỏ, nên ứng dụng nào cũng
đọc được dữ liệu của ứng dụng khác. **Can thiệp (tamper)** là khi bản thân ứng
dụng bị sửa rồi đóng gói lại. **Hook** là khi một công cụ được tiêm vào ứng dụng
đang chạy để theo dõi hoặc thay đổi hành vi của nó từ bên trong.

Mã hoá chỉ có giá trị khi ứng dụng bao quanh nó còn nguyên vẹn. Cả ba đều được
phát hiện, và các thao tác khoá sẽ từ chối chạy.

## Giữa điện thoại bạn và chúng tôi

### Ghim chứng chỉ (certificate pinning)

Bình thường điện thoại của bạn chấp nhận mọi chứng chỉ website do bất kỳ tổ chức
nào nó tin tưởng cấp — kể cả những chứng chỉ mà một hồ sơ công ty hay một chứng
chỉ gốc được cài thêm đã đưa vào. Đó chính xác là cách các kết nối bị chặn bắt.

Ghim chứng chỉ thu hẹp lại: lời gọi trả về một phần khoá kho của bạn **chỉ chấp
nhận một tập cố định các chứng chỉ gốc của chính Google**, và từ chối mọi thứ
khác, bất kể điện thoại bạn đã được bảo là phải tin cái gì.

### TLS 1.3

Phiên bản hiện hành của lớp mã hoá mà mọi kết nối `https://` đều dùng. Đáng nhắc
tên chỉ vì "chúng tôi dùng HTTPS" năm 2026 không phải một tính năng bảo mật — đó
là mức sàn.

### Google Play Integrity

Một dịch vụ của Google trả lời đúng một câu hỏi: *đây có phải ứng dụng thật, chưa
bị sửa, đang chạy trên một thiết bị Android thật và chưa bị xâm phạm không?*

Câu trả lời được kiểm tra **trên máy chủ của chúng tôi**, không phải trên điện
thoại. Khác biệt đó chính là điểm mấu chốt — một ứng dụng đã bị sửa hoàn toàn có
thể bỏ qua phép kiểm tra mà nó tự thực hiện lên chính mình, nhưng nó không giả mạo
được câu trả lời có chữ ký của Google gửi cho một bên khác.

### Chấm điểm bot khi đăng nhập

Một phép kiểm tra vô hình ở mỗi lần đăng nhập, chấm điểm khả năng lần đăng nhập đó
là tự động. Bạn hoàn toàn không thấy gì trừ khi có điều bất thường. Nó tồn tại để
khiến các đợt tấn công hàng loạt, tự động, nhắm vào tài khoản trở nên tốn kém.

Nó chạy như một dịch vụ của Google, nên việc sử dụng nó chịu sự điều chỉnh của
[chính sách quyền riêng tư của Google](https://policies.google.com/privacy) bên
cạnh chính sách của chúng tôi.

## Ở phía chúng tôi

### Cloud KMS và "pepper"

**Cloud KMS** là dịch vụ quản lý khoá của Google. Một phần của nó chạy bên trong
**mô-đun bảo mật phần cứng** — thứ tương đương phía máy chủ với con chip bảo mật
trong điện thoại bạn: nó sẽ thực hiện các phép tính bằng một chiếc khoá, nhưng
không đưa chiếc khoá đó ra cho ai, kể cả chúng tôi.

**Pepper** là một bí mật nằm trong một mô-đun như vậy. Máy chủ của chúng tôi dùng
nó để tính ra mảnh thứ ba của khoá kho. Bản thân pepper không bao giờ rời khỏi
mô-đun, và không bao giờ xuất hiện trong phản hồi — kể cả phản hồi gửi cho chính
mã của chúng tôi.

### Firestore

Cơ sở dữ liệu của Google mà máy chủ chúng tôi dùng. Nó chứa thông tin tài khoản
của bạn và **dạng đã mã hoá** của một mảnh khoá.

Nó không bao giờ chứa mật khẩu bạn đã lưu. Nếu ai đó lấy được một bản sao đầy đủ
của nó, họ sẽ nắm hai trong ba mảnh khoá của bạn và không dựng được mảnh thứ ba,
bởi mảnh thứ ba chưa từng tồn tại ở đâu ngoài chính điện thoại của bạn.

### OPAQUE

Một cách chứng minh rằng bạn biết một mật khẩu mà phía bên kia không hề học được
thứ gì để đem đi thử các phương án đoán, kể cả thử ngoại tuyến.

Ở gói Titanium, nó thay thế giá trị được lưu dùng để mở kho, nên không có thứ gì
mở được kho bị ghi ra đĩa dưới bất kỳ dạng nào. Xem
[Các gói bảo mật](./security-tiers.md).

### Lõi mã hoá Rust

Một phần của ứng dụng được viết bằng ngôn ngữ Rust, vì đúng một lý do: nó có thể
**xoá sạch bí mật khỏi bộ nhớ** và chắc chắn là chúng đã biến mất. JavaScript
không làm được — chuỗi của nó bị runtime sao chép và di chuyển lung tung, và không
có cách nào xoá đáng tin cậy.

## Đọc tiếp

- [Cách hoạt động](./how-it-works.md) — các mảnh khoá, và vì sao việc chia nhỏ lại quan trọng
- [Các gói bảo mật](./security-tiers.md) — điều nào áp dụng cho gói nào
- [Mã mở khoá của bạn](./your-passcode.md) — bí mật duy nhất bạn thật sự gõ
