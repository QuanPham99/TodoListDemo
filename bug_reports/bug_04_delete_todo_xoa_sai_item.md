# Báo cáo lỗi

## Title (Tiêu đề)

Xoá từng todo bằng nút thùng rác xoá sai item — xoá ngẫu nhiên thay vì item được chọn

## Business Context (Bối cảnh kinh doanh)

Khi người dùng bấm icon thùng rác để xoá một todo cụ thể, ứng dụng xoá một item ngẫu nhiên khác trong danh sách. Điều này gây mất dữ liệu không mong muốn — người dùng mất task quan trọng mà họ không có ý định xoá. Đây là lỗi nghiêm trọng về tính toàn vẹn dữ liệu.

## Preconditions (Điều kiện tiên quyết)

- Environment: GitHub Codespaces hoặc local `npm run dev`, Vite dev server tại `http://localhost:5173`
- Account / data: Demo login — email và password bất kỳ (khác rỗng) tại `/login`
- Version / branch: `main`

## Steps to Reproduce (Các bước tái hiện)

1. Mở app, vào `/login`. Nhập email và password bất kỳ, bấm **Log in**.
2. Tại Dashboard, ghi nhớ danh sách todo hiện tại (ví dụ: "Buy milk", "Buy eggs", "Buy bread"...).
3. Bấm icon thùng rác (🗑) bên phải todo **"Buy milk"**.
4. Quan sát danh sách todo sau khi xoá.
5. Lặp lại bước 3-4 vài lần để thấy rõ pattern ngẫu nhiên.

## Expected Result (Kết quả mong đợi)

Sau khi bấm icon thùng rác của "Buy milk", chỉ "Buy milk" bị xoá khỏi danh sách. Các todo khác không bị ảnh hưởng.

## Actual Result (Kết quả thực tế)

Bấm xoá "Buy milk" nhưng một item **ngẫu nhiên** bị xoá thay vì "Buy milk". Ví dụ: "Buy eggs" hoặc "Buy bread" biến mất, trong khi "Buy milk" vẫn còn. Mỗi lần bấm, item bị xoá khác nhau (random).

## Severity (Mức độ nghiêm trọng)

**High** — Gây mất dữ liệu không kiểm soát. Người dùng mất task quan trọng mà không có ý định xoá. Nghiêm trọng hơn bug "không xoá được" vì dữ liệu bị phá huỷ sai.

## Priority (Độ ưu tiên)

**P1** — Lỗi mất dữ liệu phải được sửa ngay. Workaround duy nhất là không sử dụng tính năng xoá.

## Evidence (Bằng chứng)

- Tái hiện thủ công: bấm xoá cùng 1 item nhiều lần, mỗi lần item bị xoá khác nhau (do `Math.random()`).
- Code review: `src/context/AppContext.tsx`, hàm `deleteTodo` — tham số `_id` bị bỏ qua, thay vào đó dùng `Math.floor(Math.random() * prev.length)` để chọn victim index.

```ts
// Code lỗi:
const victimIndex = Math.floor(Math.random() * prev.length);
return prev.filter((_, i) => i !== victimIndex);
```

## Recommendation (Đề xuất)

- **Engineering:** Sửa hàm `deleteTodo` để filter theo đúng `id` được truyền vào: `prev.filter((t) => t.id !== id)`.
- **Acceptance test:** Login → ghi nhớ danh sách → bấm xoá "Buy milk" → assert chỉ "Buy milk" biến mất, các item khác không đổi.
- **Release note (sau fix):** "Xoá todo giờ đã xoá đúng item được chọn thay vì item ngẫu nhiên."
