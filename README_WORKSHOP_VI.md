# Workshop: AI + Tự động hóa để tăng cường hợp tác BA–Dev trong xử lý bug

**Sử dụng AI + Tự động hóa (Playwright + ChatGPT / LLM trên Codespaces) để cải thiện quy trình hợp tác BA–Dev khi xử lý lỗi.**

*Bản tiếng Việt của [README_WORKSHOP.md](./README_WORKSHOP.md).*

---

## 1. Tên workshop

**Xử lý bug có hỗ trợ AI: Từ quan sát đến Playwright — Phòng lab ghép cặp BA & Developer**

*Phụ đề (nội bộ):* Tinh chỉnh báo cáo lỗi cho sắc bén hơn nhờ AI tạo sinh, bàn giao ít mơ hồ hơn, và để lại bộ kiểm thử bảo vệ bản sửa.

---

## 2. Mục tiêu

Người tham gia trải nghiệm **vòng xử lý bug gần với thực tế** trên ứng dụng demo an toàn:

- **Business Analyst (BA)** luyện cách biến quan sát “lộn xộn” thành **báo cáo lỗi có cấu trúc, có bằng chứng**, rồi dùng **AI (ví dụ ChatGPT hoặc LLM trên Codespaces / Cursor)** để siết ngôn từ, lấp chỗ trống, và (tuỳ chọn) soạn **kịch bản Playwright** mã hoá hành vi mong đợi.
- **Developer (Dev)** dùng các báo cáo đó để **tái hiện**, **tự động hoá** (khi phù hợp), **sửa**, và **xác nhận** — vẫn có AI đồng hành cho code và test.
- **Product Owner (PO)** thống nhất **ý định nghiệm thu**, **độ ưu tiên**, và cách **tự động hoá** trở thành **lớp chắn hồi quy** sau khi release.

Workshop nhấn vào **quy trình**, không phải sự hoàn hảo: bàn giao nhanh hơn, bằng chứng rõ hơn, và tự động hoá tái sử dụng được qua các lần refactor.

---

## 3. Kết quả học được

Sau buổi này, người tham gia có thể:

- **Làm rõ** — Tách triệu chứng khỏi giả định; viết các bước mà người lạ vẫn làm theo được.
- **Tăng tốc** — Dùng AI để cải thiện cách diễn đạt, cấu trúc và độ đầy đủ của báo cáo lỗi mà không mất trách nhiệm với sự kiện thật.
- **Bằng chứng** — Đính kèm thứ cần thiết (ảnh chụp màn hình, URL, nhãn UI chính xác, trước/sau) để Dev và PO tin tưởng báo cáo.
- **Tái sử dụng** — Biến cùng một user story thành **bài kiểm Playwright** fail khi còn bug và pass sau khi sửa.
- **Hợp tác** — Trải nghiệm nhịp **1 BA + 1 Dev**: báo cáo → tái hiện → test → sửa → chạy lại.
- **Suy ngẫm** — Nêu được phần nào vẫn **thủ công** so với phần đã **tự động hoá**, và mô hình này áp dụng thêm ở đâu.

---

## 4. Đối tượng

| Vai trò | Họ là ai | Việc họ làm trong workshop |
|---------|-----------|----------------------------|
| **Business Analyst (BA)** | Thường ít kỹ thuật đến bán kỹ thuật; phụ trách yêu cầu và chất lượng bàn giao cho kỹ sư. | Khám phá app, ghi lỗi theo mẫu, dùng AI chỉnh báo cáo, tuỳ chọn nhắc AI soạn nháp Playwright. |
| **Developer (Dev)** | Xây dựng và vận hành sản phẩm; quen terminal và code ở mức cơ bản. | Đọc báo cáo BA, tái hiện lỗi, triển khai hoặc tinh chỉnh Playwright, sửa bug, xác nhận bằng test và UI. |
| **Product Owner (PO)** | Sở hữu ưu tiên và định nghĩa “xong”; có thể quan sát hoặc xoay vào cặp. | Làm rõ **tác động kinh doanh**, **ưu tiên**, và **tiêu chí nghiệm thu**; giúp cặp đôi thống nhất khi nào bản sửa đủ cho story. |

**Hình thức:** Người tham gia làm việc theo **cặp (1 BA + 1 Developer)**. **PO** có thể đi giữa các cặp hoặc cùng debrief cả lớp.

---

## 5. Công cụ & chuẩn bị

| Công cụ | Vai trò trong workshop |
|---------|-------------------------|
| **GitHub Codespaces** | Môi trường có sẵn: Node, dependency, trình duyệt cho Playwright. Mở repo này trong codespace để mọi cặp cùng baseline (xem `.devcontainer/devcontainer.json`). |
| **Playwright** | Tự động hoá end-to-end trên trình duyệt. Test nằm trong `e2e/`. File khởi đầu mô tả hành vi *mong muốn*; nhiều bài sẽ **fail** cho đến khi bug demo được sửa — đó là chủ đích. |
| **ChatGPT (hoặc tương tự)** | BA dùng để cấu trúc và cải thiện báo cáo; Dev dùng để gợi ý code test hoặc bản sửa. **Luôn dán các sự kiện bạn đã quan sát** — không nhờ mô hình bịa bước tái hiện. |
| **Cursor / Copilot / LLM tích hợp Codespaces** | Tuỳ chọn thay ChatGPT cho cùng việc chỉnh văn bản và code trong editor. |
| **Sentry** *(tuỳ chọn)* | Repo có thể có tích hợp Sentry cho demo. Nếu bật, BA có thể ghi **correlation ID** hoặc sự kiện trong mục **Bằng chứng**; không bắt buộc cho bài tập cốt lõi. |

**Checklist cặp đôi (10 phút đầu):**

- [ ] Codespace đã chạy; terminal ở **thư mục gốc project** (thư mục có `package.json`).
- [ ] Chạy `node -v` để xác nhận Node.
- [ ] Nếu cần: `npm install`
- [ ] Nếu Playwright báo thiếu trình duyệt (máy local): `npx playwright install chromium`

---

## 6. Cấu trúc workshop (luồng tổng quan)

1. **Cả BA và Dev** chạy app trên Codespaces (`npm run dev`) và mở URL được forward.
2. **Cùng nhau** kích hoạt lỗi đã biết trên UI (ví dụ **Add todo** / gửi task có vẻ thành công nhưng mục mới **không** xuất hiện trên dashboard).
3. **BA** điều tra, thu thập bằng chứng, viết bản nháp báo cáo lỗi.
4. **BA** dùng **AI** để cấu trúc và cải báo cáo (vẫn chịu trách nhiệm độ chính xác).
5. **(Nâng cao)** BA nhắc AI soạn bài test **Playwright** theo phong cách tương tự `e2e/add-todo.answer-key.spec.ts`.
6. **Dev** dùng báo cáo để **tái hiện**, **viết hoặc chỉnh** test Playwright, và **sửa** bug (có hỗ trợ AI nếu muốn).
7. **Cả hai** chạy lại **Playwright** (và smoke thủ công nhanh) để xác nhận bản sửa.
8. **Cả nhóm** (gồm PO) **suy ngẫm**: cải thiện được gì, gì vẫn thủ công, và cách nhân rộng lên ticket thật.

---

## 7. Hướng dẫn chi tiết theo vai trò

### 7.1 Business Analyst (BA)

**Trách nhiệm**

- Đại diện cho **người dùng** và **kỳ vọng kinh doanh**.
- Tạo báo cáo lỗi **sẵn sàng bàn giao** (dùng **Mục 8**).
- Dùng AI để **làm rõ ngôn từ**, không để AI bịa sự kiện.

**Các bước**

1. **Quan sát** — Cùng Dev đăng nhập và đi qua **Add todo**: nhập **tiêu đề duy nhất**, bấm **Save todo**, quay lại dashboard. Ghi nhận tiêu đề mới có hiện hay không.
2. **Mô tả (thô)** — Bằng lời của bạn, ghi: đã bấm gì, kỳ vọng gì, thực tế ra sao.
3. **Tạo báo cáo lỗi** — Chép `bug_reports/TEMPLATE.md` hoặc `bug_reports/TEMPLATE_VI.md` thành file `.md` mới trong `bug_reports/` (xem **Mục 8**); điền mọi mục có thể từ quan sát, tuỳ chọn nhờ AI đọc file mẫu.
4. **Dùng AI chỉnh báo cáo** — Ví dụ prompt: *“Đây là bản nháp báo cáo lỗi của tôi. Hãy cải thiện cấu trúc và giọng điệu để bàn giao kỹ sư. Không thêm bước tôi chưa làm. Đánh dấu chỗ chưa rõ.”* Dán bản nháp + ghi chú bằng chứng.
5. **(Tuỳ chọn / Nâng cao)** — Nhắc AI soạn **Playwright**: *“Dựa trên báo cáo lỗi này, hãy viết test Playwright bằng TypeScript: đăng nhập, thêm todo với tiêu đề duy nhất, lưu, và assert tiêu đề hiện trên dashboard. Dùng getByRole và getByLabel. Tham chiếu luồng trong `e2e/add-todo.answer-key.spec.ts`.”* Chỉ lưu output vào file mới trong `e2e/` sau khi bạn và Dev đã review.
6. **Bàn giao** — Gửi báo cáo cuối (và file test tuỳ chọn) cho Dev.

**Gợi ý khám phá thêm** (các lỗi demo khác — mỗi lỗi một báo cáo riêng nếu phát hiện):

- Đánh dấu todo **hoàn thành** — có chuyển sang **Done** không?
- Xoá **thùng rác** — đúng **dòng** bị xoá không?
- **Delete all** — danh sách có được xoá sạch không?

---

### 7.2 Developer (Dev)

**Trách nhiệm**

- Coi báo cáo BA là **nguồn sự thật** cho ý định nghiệp vụ.
- **Tái hiện** trước khi sửa code.
- Bổ sung hoặc tinh chỉnh **tự động hoá** để lỗi không quay lại âm thầm.

**Các bước**

1. **Đọc** báo cáo lỗi của BA từ đầu đến cuối; chỉ hỏi lại khi bước hoặc kết quả mong đợi còn mơ hồ.
2. **Tái hiện** — Làm đúng theo báo cáo trên app đang chạy; xác nhận **thực tế so với mong đợi**.
3. **Triển khai Playwright** — Mở rộng `e2e/add-todo.spec.ts`, dùng bản nháp AI của BA, hoặc bám theo `e2e/add-todo.answer-key.spec.ts`. Ưu tiên locator ổn định: `getByRole`, `getByLabel`, và `getByRole('main').…` khi có link trùng tên (ví dụ hai link “Add todo”).
4. **Sửa bug** — Thay đổi code tối thiểu để hành vi khớp báo cáo (dùng AI kèm báo cáo + đường dẫn file + log lỗi).
5. **Xác nhận** — Chạy Playwright; đảm bảo test **pass** và thao tác tay khớp **Expected result** của BA.
6. **Tóm tắt cho BA** — Một đoạn: đã đổi gì, xác minh thế nào.

---

## 8. Mẫu báo cáo lỗi (RẤT QUAN TRỌNG)

> **Ghi chú:** ĐÂY CHỈ LÀ **KHUYẾN NGHỊ** — BẠN HOÀN TOÀN CÓ THỂ **TỰ Ý ĐIỀU CHỈNH / BỔ SUNG** MẪU BÁO CÁO LỖI CHO PHÙ HỢP NHÓM (thêm trường, đổi tên mục, hoặc khớp schema Jira/Azure DevOps nội bộ).

Lưu mỗi báo cáo thành **file Markdown trong `bug_reports/`** để LLM đọc được **file mẫu chuẩn** cùng bản nháp của bạn và **điền sẵn các mục** thống nhất cho từng bug khác nhau (không cần chép khối dài từ tài liệu workshop).

**Cách dùng**

1. Chép `bug_reports/TEMPLATE.md` hoặc `bug_reports/TEMPLATE_VI.md` thành file mới trong cùng thư mục (ví dụ `bug_reports/add-todo-khong-hien-dashboard.md`).
2. Thêm ghi chú thô, URL, bước tái hiện, hoặc đường dẫn ảnh chụp vào file mới (hoặc gộp từ file nháp).
3. Trong ChatGPT, Cursor, hoặc LLM trên Codespaces, đưa vào ngữ cảnh **`bug_reports/TEMPLATE.md`** (hoặc **`TEMPLATE_VI.md`**) và **file `.md` mới`** (và `@` đường dẫn code nếu cần). Yêu cầu mô hình hoàn thiện từng mục **chỉ dựa trên sự kiện bạn đã quan sát** — không bịa bước tái hiện.
4. Gửi file `.md` hoàn chỉnh cho Dev. Vẫn có thể dán nội dung đó sang Jira, Azure DevOps, hoặc email nếu quy trình yêu cầu.

Mục lục thư mục: `bug_reports/README.md`. File mẫu: **`bug_reports/TEMPLATE.md`** (tiếng Anh) và **`bug_reports/TEMPLATE_VI.md`** (nhãn song ngữ / tiếng Việt).

---

## 9. Các bước thực hành (kịch bản cho facilitator)

Dùng làm **luồng mặc định** cho story cốt lõi (**add todo / gửi task**).

1. **Khởi động app** (mỗi cặp, terminal Codespaces ở thư mục gốc repo):

```bash
npm run dev
```

Mở URL mà Codespaces hiển thị (hoặc localhost) trong trình duyệt.

2. **Tái hiện** — Đăng nhập → Dashboard → **Add todo** → tiêu đề duy nhất → **Save todo** → Dashboard. Xác nhận tiêu đề có xuất hiện không.

3. **BA** chép `bug_reports/TEMPLATE.md` hoặc `TEMPLATE_VI.md` thành file `.md` mới trong `bug_reports/`, ghi hoặc dán ghi chú, rồi chỉnh với ChatGPT / LLM kèm file mẫu trong ngữ cảnh (**Mục 8**).

4. **Dev** tái hiện chỉ từ báo cáo (BA im lặng trừ khi Dev bị kẹt).

5. **Chạy test** (sẽ thấy fail khi bug còn tồn tại):

```bash
npx playwright test
```

Chạy một file:

```bash
npx playwright test e2e/add-todo.spec.ts
```

6. **Dev** triển khai bản sửa + test; cặp đôi chạy lại:

```bash
npx playwright test
```

7. **Mở báo cáo HTML** (sau khi đã chạy test):

```bash
npx playwright show-report
```

8. **Spec tham chiếu** (tuỳ chọn so sánh / đáp án — xem `playwright.config.ts`):

```bash
npm run test:e2e:answer
```

---

## 10. Thử thách nâng cao

- **BA:** Sau khi báo cáo văn bản đã ổn định, nhắc AI viết **full spec Playwright** theo mẫu `e2e/add-todo.answer-key.spec.ts` (đăng nhập → điều hướng vùng main → dữ liệu duy nhất → assert trên dashboard).
- **Dev:** Review **selector dễ flake**, bẫy link trùng, và **assertion** khớp **Expected result** của BA; gộp vào `e2e/` và gắn vào lần chạy mặc định nếu phù hợp.

Tiêu chí thành công: test **fail** trên app chưa sửa vì **đúng lý do**, và **pass** sau khi sửa.

---

## 11. Điểm chính / Bài học rút ra

- **AI giảm mơ hồ** khi tái cấu trúc bản nháp mà **bạn** đã neo vào quan sát thực tế — không thay thế bước tái hiện.
- **Bàn giao BA → Dev tốt hơn** khi mỗi ticket có **bước**, **mong đợi so với thực tế**, và **bằng chứng** ở một chỗ.
- **Tự động hoá** biến bug một lần thành **test hồi quy** mà cả nhóm có thể chạy trên CI sau này.

---

## 12. Câu hỏi suy ngẫm

- Trước workshop, phần nào vẫn **thủ công** mà trên dự án thật bạn vẫn có thể làm?
- Phần nào đã **tự động hoá** (hoặc bán tự động) nhờ Playwright và AI?
- **Ở đâu nữa** có thể áp dụng mô hình này (ví dụ: luồng onboarding, phân quyền, xuất báo cáo)?
- **PO** cần thấy gì trên backlog thật để nói “sẵn sàng release”?

---

## 13. Mở rộng tuỳ chọn

- **Bug thứ hai** — Lặp lại quy trình với **mark complete** (`e2e/mark-todo-done.spec.ts`) hoặc lỗi UI khác; báo cáo + test thứ hai.
- **Jira / Azure DevOps** — Xuất phát từ `bug_reports/TEMPLATE.md` (hoặc file đã điền trong `bug_reports/`); dán vào công cụ thật; map **Severity** theo quy ước nhóm; thêm **label** như `playwright`, `ai-assisted`.
- **CI/CD** — Chạy `npx playwright test` (hoặc `npm run test:e2e`) trên pull request để bản sửa đã merge được bảo vệ.

---

## Tham chiếu lệnh nhanh

```bash
npm run dev
npx playwright test
npx playwright test e2e/add-todo.spec.ts
npx playwright test e2e/mark-todo-done.spec.ts
npx playwright show-report
npm run test:e2e:answer
```

---

*Tài liệu này là bản tiếng Việt của `README_WORKSHOP.md`. Checklist ngắn trước đây trong `README_WORKSHOP_TODO.md` đã được gộp và mở rộng vào bản tiếng Anh.*
