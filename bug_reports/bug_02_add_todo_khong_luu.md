# Báo cáo lỗi

## Title (Tiêu đề)

Todo mới không hiển thị trên dashboard sau khi bấm "Save todo"

## Business Context (Bối cảnh kinh doanh)

Mọi người dùng tạo task qua **Add todo** đều bị ảnh hưởng. Quy trình tạo task có vẻ hoàn tất (user quay về dashboard), nhưng item mới không xuất hiện. Điều này chặn hoàn toàn chức năng tạo task — tính năng cốt lõi của ứng dụng. Nếu release, người dùng sẽ mất các task họ tin rằng đã lưu.

## Preconditions (Điều kiện tiên quyết)

- Environment: GitHub Codespaces hoặc local `npm run dev`, Vite dev server tại `http://localhost:5173`
- Account / data: Demo login — email và password bất kỳ (khác rỗng) tại `/login`
- Version / branch: `main`

## Steps to Reproduce (Các bước tái hiện)

1. Mở app, vào `/login`. Nhập email (ví dụ `test@example.com`) và password bất kỳ, bấm **Log in**.
2. Tại Dashboard, bấm **Add todo** (từ header hoặc nút trên trang chính).
3. Tại trang **Add todo**, nhập title duy nhất (ví dụ `Test todo 2026-04-11`) và tuỳ chọn due date, bấm **Save todo**.
4. Xác nhận đã quay về dashboard (`/dashboard`). Cuộn danh sách **To do** và tìm title vừa nhập.

## Expected Result (Kết quả mong đợi)

Sau khi bấm **Save todo**, dashboard phải hiển thị todo mới dưới mục **To do** với đúng title đã nhập. Người dùng có thể tiếp tục thao tác với item đó (tick hoàn thành, sửa, xoá...).

## Actual Result (Kết quả thực tế)

App điều hướng về dashboard, nhưng mục **To do** chỉ hiển thị các todo mặc định (grocery items). **Todo mới không xuất hiện** ở bất kỳ đâu trên dashboard.

## Severity (Mức độ nghiêm trọng)

**High** — Luồng tạo task chính có vẻ thành công nhưng dữ liệu không được lưu. Người dùng không thể tin tưởng tính năng này.

## Priority (Độ ưu tiên)

**P1** — Luồng chính của sản phẩm; phải sửa trước bất kỳ release nào quảng bá tính năng tạo task.

## Evidence (Bằng chứng)

- Tái hiện thủ công: lặp lại 100% mỗi lần save với bất kỳ title nào.
- Playwright test tham khảo: `e2e/add-todo.answer-key.spec.ts` — test FAIL khi chạy `npm run test:e2e:answer`.
- Code review: `src/pages/AddTodoPage.tsx`, hàm `handleSubmit` — không gọi `addTodo()` từ context trước khi `navigate("/dashboard")`.

## Recommendation (Đề xuất)

- **Engineering:** Trong `AddTodoPage.handleSubmit`, gọi `addTodo({ title: title.trim(), dueDate, completed: false })` trước khi navigate về dashboard.
- **Acceptance test:** Login → Add todo → nhập title duy nhất → Save todo → assert title xuất hiện trong mục "To do" trên dashboard.
- **Release note (sau fix):** "Lưu todo mới giờ đã hiển thị đúng trên dashboard."
