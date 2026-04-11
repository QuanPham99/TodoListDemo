# Báo cáo lỗi

## Title (Tiêu đề)

Sửa title todo bị ghi đè sai — title mới bị bỏ qua, title cũ bị mangle thành dạng lặp

## Business Context (Bối cảnh kinh doanh)

Khi người dùng chỉnh sửa tên todo (ví dụ sửa lỗi chính tả hoặc cập nhật nội dung), giá trị mới bị bỏ qua hoàn toàn. Thay vào đó, title cũ bị biến đổi thành dạng vô nghĩa (ví dụ "Buy milk" → "Buymilk Buymilk"). Người dùng mất nội dung gốc và không thể cập nhật todo.

## Preconditions (Điều kiện tiên quyết)

- Environment: GitHub Codespaces hoặc local `npm run dev`, Vite dev server tại `http://localhost:5173`
- Account / data: Demo login — email và password bất kỳ (khác rỗng) tại `/login`
- Version / branch: `main`

## Steps to Reproduce (Các bước tái hiện)

1. Mở app, vào `/login`. Nhập email và password bất kỳ, bấm **Log in**.
2. Tại Dashboard, bấm icon bút chì (✏️) bên phải todo **"Buy milk"**.
3. Ô input hiện ra với title hiện tại "Buy milk". Xoá và nhập title mới: **"Buy almond milk"**.
4. Bấm nút **Save** hoặc nhấn **Enter**.
5. Quan sát title của todo vừa sửa.

## Expected Result (Kết quả mong đợi)

Title todo được cập nhật thành "Buy almond milk" đúng như người dùng đã nhập.

## Actual Result (Kết quả thực tế)

Title mới "Buy almond milk" bị bỏ qua hoàn toàn. Title cũ "Buy milk" bị biến đổi thành **"Buymilk Buymilk"** — các từ bị ghép lại không dấu cách, viết hoa chữ cái đầu, rồi lặp lại 2 lần. Nội dung gốc bị mất và không thể khôi phục.

Các ví dụ khác:
- "Buy eggs" → "Buyeggs Buyeggs"
- "Buy chicken breast" → "Buychickenbreast Buychickenbreast"

## Severity (Mức độ nghiêm trọng)

**Medium** — Tính năng edit không hoạt động đúng và gây mất dữ liệu (title gốc bị phá). Tuy nhiên workaround là xoá todo cũ và tạo mới (nếu các tính năng đó hoạt động).

## Priority (Độ ưu tiên)

**P2** — Cần sửa nhưng có thể xếp sau các bug P1 (tick, add, delete). Nên sửa trong cùng sprint.

## Evidence (Bằng chứng)

- Tái hiện thủ công: lặp lại 100% trên mọi todo. Kết quả luôn là dạng "XxxYyy XxxYyy" bất kể nhập title mới gì.
- Code review: `src/context/AppContext.tsx`, hàm `updateTodoTitle` — tham số `_newTitle` bị bỏ qua, logic lấy title cũ, ghép từ và lặp lại.

```ts
// Code lỗi:
const words = t.title.trim().split(/\s+/).filter(Boolean);
const squashed = words
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
  .join("");
return { ...t, title: `${squashed} ${squashed}` };
```

## Recommendation (Đề xuất)

- **Engineering:** Sửa hàm `updateTodoTitle` để sử dụng `newTitle` thay vì mangle title cũ: `return { ...t, title: newTitle }`.
- **Acceptance test:** Login → bấm edit "Buy milk" → nhập "Buy almond milk" → Save → assert title hiển thị đúng "Buy almond milk".
- **Release note (sau fix):** "Chỉnh sửa tên todo giờ đã lưu đúng nội dung người dùng nhập."
