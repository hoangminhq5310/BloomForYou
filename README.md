# Bloom for You 🌷

Web app mini dành cho Ngày Phụ nữ Việt Nam 20/10, thiết kế cute pastel, React + Tailwind CSS v4 + Vite.

## Tính năng
- Khu vườn hoa tương tác, hiệu ứng cánh hoa bay và lời chúc ngẫu nhiên.
- Tạo thiệp cá nhân hóa theo tên người nhận, người gửi và lời nhắn.
- 3 phong cách thiệp: Pastel, Garden, Sunset.
- Chia sẻ link thiệp bằng Web Share API hoặc sao chép link.
- Tải lời chúc dạng `.txt`.
- Danh sách lời chúc có thể chọn để dùng cho thiệp.
- Responsive cho desktop, tablet và điện thoại.
- Không cần backend: dữ liệu thiệp được mã hóa trong query string của link.

## Yêu cầu
- Node.js 20.19+ hoặc 22.12+ (khuyến nghị bản LTS hiện hành)
- npm

## Chạy local
```bash
npm install
npm run dev
```
Mở địa chỉ local mà Vite hiển thị, thường là http://localhost:5173.

## Kiểm tra bản production
```bash
npm run build
npm run preview
```
Bản build nằm trong thư mục `dist/`.

## Deploy lên Vercel
1. Giải nén project và push toàn bộ thư mục lên một repository GitHub.
2. Vào https://vercel.com/new và import repository.
3. Vercel thường tự nhận diện Vite. Đặt:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Bấm Deploy.

## Deploy lên Netlify
1. Push project lên GitHub và import vào Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy site.

## Lưu ý
- Nút nhạc hiện chỉ là nút bật/tắt trạng thái giao diện; chưa phát âm thanh thực tế.
- Nút tải về xuất lời chúc dưới dạng file text, không phải ảnh PNG.
- Để link chia sẻ hoạt động, hãy chia sẻ link của website đã deploy. Link dùng query string nên không cần database.
- Google Fonts cần internet; nếu không có mạng, trình duyệt sẽ dùng font dự phòng.
