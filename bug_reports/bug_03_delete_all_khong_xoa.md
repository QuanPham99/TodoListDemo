# Báo cáo lỗi

## Title (Tiêu đề)

Nút "Delete all" không xoá bất kỳ todo nào

## Business Context (Bối cảnh kinh doanh)

Người dùng muốn xoá sạch danh sách todo (ví dụ reset lại, hoặc dọn dẹp sau khi hoàn thành tất cả) không thể thực hiện được. Nút **Delete all** không phản hồi, buộc người dùng phải xoá từng item một — gây mất thời gian và trải nghiệm kém.

## Preconditions (Điều kiện tiên quyết)

- Environment: GitHub Codespaces hoặc local `npm run dev`, Vite dev server tại `http://localhost:5173`
- Account / data: Demo login — email và password bất kỳ (khác rỗng) tại `/login`
- Version / branch: `main`

## Steps to Reproduce (Các bước tái hiện)

1. Mở app, vào `/login`. Nhập email và password bất kỳ, bấm **Log in**.
2. Tại Dashboard, xác nhận có ít nhất 1 todo trong danh sách (mặc định có 12 grocery items).
3. Bấm nút **Delete all** ở góc trên bên phải dashboard.
4. Quan sát danh sách todo.

## Expected Result (Kết quả mong đợi)

Sau khi bấm **Delete all**, toàn bộ danh sách todo phải bị xoá. Mục **To do** hiển thị "No open todos" và mục **Done** hiển thị "No completed todos yet". Counter hiển thị "Nothing here yet — add your first todo."

## Actual Result (Kết quả thực tế)

Bấm **Delete all** không có bất kỳ thay đổi nào. Danh sách todo vẫn giữ nguyên, tất cả 12 items vẫn hiển thị.

## Severity (Mức độ nghiêm trọng)

**High** — Tính năng quản lý hàng loạt hoàn toàn không hoạt động. Với danh sách dài, người dùng không có cách nào xoá nhanh.

## Priority (Độ ưu tiên)

**P2** — Quan trọng nhưng có workaround (xoá từng item). Nên sửa trong sprint tiếp theo.

## Evidence (Bằng chứng)

- Tái hiện thủ công: lặp lại 100% mỗi lần bấm Delete all.
- Code review: `src/context/AppContext.tsx`, hàm `deleteAllTodos` — body rỗng (no-op), không gọi `setTodos([])`.

## Recommendation (Đề xuất)

- **Engineering:** Trong hàm `deleteAllTodos`, thêm `setTodos([])` để xoá toàn bộ danh sách.
- **Acceptance test:** Login → xác nhận có todo → bấm Delete all → assert danh sách rỗng, hiển thị "Nothing here yet".
- **Release note (sau fix):** "Nút Delete all giờ đã xoá toàn bộ danh sách todo đúng cách."
