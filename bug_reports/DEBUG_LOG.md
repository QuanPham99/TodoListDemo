# Debug Log — Todo App

> Ngày: 2026-04-11
> Người thực hiện: Dev (assisted by Kiro)

---

## BUG-01: Tick checkbox không chuyển todo sang Done

| Mục | Chi tiết |
|-----|----------|
| File | `src/context/AppContext.tsx` |
| Hàm | `toggleTodoComplete` |
| Root cause | Toàn bộ logic `setTodos` bị comment out. Hàm nhận `_id` (unused) và là no-op hoàn toàn. |
| Fix | Bỏ comment, khôi phục logic: `setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))` |
| Trạng thái | ✅ Đã fix |

**Before:**
```ts
const toggleTodoComplete = useCallback((_id: string) => {
  // INTENTIONAL DEMO BUG: completion toggle does not update state
  // setTodos((prev) =>
  //   prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
  // );
}, []);
```

**After:**
```ts
const toggleTodoComplete = useCallback((id: string) => {
  setTodos((prev) =>
    prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
  );
}, []);
```

---

## BUG-02: Add todo không lưu vào dashboard

| Mục | Chi tiết |
|-----|----------|
| File | `src/pages/AddTodoPage.tsx` |
| Hàm | `handleSubmit` |
| Root cause | Form submit chỉ gọi `navigate("/dashboard")` mà không gọi `addTodo()` từ context. Thêm vào đó, Sentry logging code chiếm chỗ thay vì logic persist. |
| Fix | Import `useApp`, gọi `addTodo({ title, dueDate, completed: false })` trước navigate. Xoá Sentry demo code. |
| Trạng thái | ✅ Đã fix |

**Before:**
```ts
import * as Sentry from "@sentry/react";
// ...
function handleSubmit(e: FormEvent) {
  // ... validation
  // INTENTIONAL DEMO BUG: todo is not persisted
  Sentry.addBreadcrumb({ ... });
  Sentry.captureMessage("Add todo: submitted but todo was not persisted...", { ... });
  navigate("/dashboard");
}
```

**After:**
```ts
import { useApp } from "../context/AppContext";
// ...
const { addTodo } = useApp();
function handleSubmit(e: FormEvent) {
  // ... validation
  addTodo({
    title: title.trim(),
    dueDate: dueDate || undefined,
    completed: false,
  });
  navigate("/dashboard");
}
```

---

## BUG-03: Delete All không xoá được

| Mục | Chi tiết |
|-----|----------|
| File | `src/context/AppContext.tsx` |
| Hàm | `deleteAllTodos` |
| Root cause | Body hàm rỗng (no-op), không gọi `setTodos`. |
| Fix | Thêm `setTodos([])` để xoá toàn bộ danh sách. |
| Trạng thái | ✅ Đã fix |

**Before:**
```ts
const deleteAllTodos = useCallback(() => {
  // INTENTIONAL: broken — no-op
}, []);
```

**After:**
```ts
const deleteAllTodos = useCallback(() => {
  setTodos([]);
}, []);
```

---

## BUG-04: Delete từng todo xoá sai item (random)

| Mục | Chi tiết |
|-----|----------|
| File | `src/context/AppContext.tsx` |
| Hàm | `deleteTodo` |
| Root cause | Tham số `_id` bị bỏ qua. Thay vào đó dùng `Math.random()` chọn index ngẫu nhiên để xoá. |
| Fix | Filter theo đúng `id` được truyền vào: `prev.filter(t => t.id !== id)` |
| Trạng thái | ✅ Đã fix |

**Before:**
```ts
const deleteTodo = useCallback((_id: string) => {
  setTodos((prev) => {
    if (prev.length === 0) return prev;
    const victimIndex = Math.floor(Math.random() * prev.length);
    return prev.filter((_, i) => i !== victimIndex);
  });
}, []);
```

**After:**
```ts
const deleteTodo = useCallback((id: string) => {
  setTodos((prev) => prev.filter((t) => t.id !== id));
}, []);
```

---

## BUG-05: Edit title bị mangle

| Mục | Chi tiết |
|-----|----------|
| File | `src/context/AppContext.tsx` |
| Hàm | `updateTodoTitle` |
| Root cause | Tham số `_newTitle` bị bỏ qua. Logic lấy title cũ, ghép các từ không dấu cách (PascalCase), rồi lặp lại 2 lần. Ví dụ: "Buy milk" → "Buymilk Buymilk". |
| Fix | Sử dụng `newTitle` trực tiếp: `{ ...t, title: newTitle }` |
| Trạng thái | ✅ Đã fix |

**Before:**
```ts
const updateTodoTitle = useCallback((id: string, _newTitle: string) => {
  setTodos((prev) =>
    prev.map((t) => {
      if (t.id !== id) return t;
      const words = t.title.trim().split(/\s+/).filter(Boolean);
      const squashed = words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join("");
      return { ...t, title: `${squashed} ${squashed}` };
    }),
  );
}, []);
```

**After:**
```ts
const updateTodoTitle = useCallback((id: string, newTitle: string) => {
  setTodos((prev) =>
    prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t)),
  );
}, []);
```

---

## Tổng kết

| Bug | File thay đổi | Trạng thái |
|-----|---------------|------------|
| BUG-01: Toggle complete | `src/context/AppContext.tsx` | ✅ Fixed |
| BUG-02: Add todo persist | `src/pages/AddTodoPage.tsx` | ✅ Fixed |
| BUG-03: Delete all | `src/context/AppContext.tsx` | ✅ Fixed |
| BUG-04: Delete single | `src/context/AppContext.tsx` | ✅ Fixed |
| BUG-05: Edit title | `src/context/AppContext.tsx` | ✅ Fixed |

**Files changed:** 2 (`AppContext.tsx`, `AddTodoPage.tsx`)
**Diagnostics:** 0 errors, 0 warnings
