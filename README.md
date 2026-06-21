 https://nguyenvanvu230319.github.io/ajt-devdash-Nguyen-Van-Vu/


# AJT DEVDASH - ASYNCHRONOUS DASHBOARD APPLICATION

Dự án Bài tập lớn xây dựng Bảng tin trang đơn (Single-Page Dashboard) xử lý dữ liệu bất đồng bộ. Ứng dụng triển khai trên nền tảng **Vite + TypeScript** với cấu hình kiểm soát kiểu dữ liệu nghiêm ngặt bậc nhất (`"strict": true`), triệt tiêu hoàn toàn kiểu lỏng lẻo `any` và áp dụng các kỹ thuật tối ưu hiệu năng nâng cao.

---

## 🚀 Tính năng Kỹ thuật của Dự án

1. **Xử lý Bất đồng bộ Song song (Promise.all):** Đồng bộ hóa dữ liệu từ hai đầu mút API độc lập (`/posts` giới hạn 20 phần tử và toàn bộ người dùng `/users`). Gom luồng giúp giảm thời gian phản hồi mạng và tối ưu tốc độ render.
2. **Kiểm soát Tần suất Giao diện (Debounce):** Trì hoãn xử lý sự kiện gõ tìm kiếm văn bản trong thời gian 350ms. Tránh tình trạng trình duyệt bị quá tải hoặc giật lag do render liên tục theo từng phím gõ.
3. **Bộ nhớ đệm Tìm kiếm (Memoization):** Sử dụng cơ chế Closure để lưu trữ các kết quả của bộ lọc mảng tiêu đề bài viết dựa trên từ khóa. Nếu người dùng tìm lại từ khóa cũ, kết quả sẽ xuất hiện lập tức từ cache thay vì tính toán lại từ đầu.
4. **Bộ lọc Phân loại Đa tầng (Cascading Filters):** Kết hợp đồng thời bộ lọc danh mục theo Tác giả (Category) và bộ lọc tìm kiếm văn bản tiêu đề (Debounced Text Search).
5. **Giao diện Khối Thao tác Chuyên nghiệp (UX/UI):** Định kiểu thiết kế giao diện tối (Dark Mode) hiện đại bằng biến CSS Variables. Sử dụng cấu hình lưới Responsive Grid tự động co giãn theo thiết bị, thanh hiển thị chi tiết cố định vị trí (`position: sticky`).

---

## 📂 Quy hoạch Thư mục Mô-đun Dự án

Mã nguồn được phân rã thành các mô-đun độc lập theo nguyên lý tách biệt mối quan tâm (Separation of Concerns):

```text
ajt-devdash-nguyen-van-a/
├── index.html          # Khung cấu trúc HTML và định kiểu CSS (Dark Theme)
├── tsconfig.json       # Thiết lập các điều luật biên dịch nghiêm ngặt của TypeScript
├── package.json        # Định nghĩa tập lệnh thực thi và khai báo thư viện (Vite/TS)
└── src/
    ├── main.ts         # Điểm khởi chạy hệ thống, gọi Promise.all và đính kèm sự kiện DOM
    ├── types.ts        # Quản lý tập trung các Interface dữ liệu và Discriminated Union State
    ├── api.ts          # Hàm tiện ích Generic fetchJson bọc kết nối mạng an toàn
    ├── state.ts        # Quản trị bộ nhớ AppState, bộ nhớ đệm Memoization và hàm Debounce
    └── ui.ts           # Phụ trách kết xuất cấu trúc HTML động lên màn hình dựa trên State
