# Báo cáo lỗi

## Title (Tiêu đề)

Tick checkbox để đánh dấu todo hoàn thành không hoạt động

## Business Context (Bối cảnh kinh doanh)

Tất cả người dùng bị ảnh hưởng. Tính năng đánh dấu hoàn thành là chức năng cốt lõi của ứng dụng todo — nếu không hoạt động, người dùng không thể theo dõi tiến độ công việc. Todo luôn nằm ở mục "To do", không bao giờ chuyển sang "Done", khiến dashboard mất ý nghĩa phân loại.

## Preconditions (Điều kiện tiên quyết)

- Environment: GitHub Codespaces hoặc local `npm run dev`, Vite dev server tại `http://localhost:5173`
- Account / data: Demo login — email và password bất kỳ (khác rỗng) tại `/login`
- Version / branch: `main`

## Steps to Reproduce (Các bước tái hiện)

1. Mở app, vào `/login`. Nhập email (ví dụ `test@example.com`) và password bất kỳ, bấm **Log in**.
2. Tại Dashboard, quan sát danh sách todo mặc định dưới mục **To do** (ví dụ "Buy milk", "Buy eggs"...).
3. Click vào checkbox bên trái bất kỳ todo nào (ví dụ "Buy milk").
4. Quan sát mục **To do** và mục **Done**.

## Expected Result (Kết quả mong đợi)

Sau khi tick checkbox, todo "Buy milk" phải biến mất khỏi mục **To do** và xuất hiện trong mục **Done** với trạng thái đã hoàn thành.

## Actual Result (Kết quả thực tế)

Click checkbox không có bất kỳ thay đổi nào. Todo vẫn nằm nguyên ở mục **To do**, checkbox không được check, mục **Done** vẫn hiển thị "No completed todos yet".

## Severity (Mức độ nghiêm trọng)

**High** — Chức năng cốt lõi của ứng dụng todo hoàn toàn không hoạt động. Người dùng không thể phân biệt việc đã làm và chưa làm.

## Priority (Độ ưu tiên)

**P1** — Phải sửa trước khi release. Đây là tính năng chính mà mọi người dùng sẽ sử dụng hàng ngày.

## Evidence (Bằng chứng)

- Tái hiện thủ công: lặp lại 100% mỗi lần click checkbox trên bất kỳ todo nào.
- Playwright test tham khảo: `e2e/mark-todo-done.answer-key.spec.ts` — test FAIL khi chạy `npm run test:e2e:answer`.
- Code review: `src/context/AppContext.tsx`, hàm `toggleTodoComplete` — logic `setTodos` bị comment out, hàm là no-op.

## Recommendation (Đề xuất)

- **Engineering:** Bỏ comment logic `setTodos` trong hàm `toggleTodoComplete` để cập nhật `completed` state khi user click checkbox.
- **Acceptance test:** Login → tick checkbox "Buy milk" → assert "Buy milk" biến mất khỏi "To do" và xuất hiện trong "Done".
- **Release note (sau fix):** "Đánh dấu hoàn thành todo bằng checkbox giờ đã hoạt động đúng."
