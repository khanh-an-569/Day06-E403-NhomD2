# CareerFit AI — Nhóm D2 · Lớp E403

> Công cụ AI phân tích mức độ tương thích giữa CV và JD, chỉ ra khoảng trống năng lực và gợi ý lộ trình học tập cá nhân hóa.

**Demo:** https://career-path-coach-46.vercel.app/


---

## Thành viên & Phân công

| Mã học viên | Họ và tên | Vai trò |
|:-----------:|-----------|---------|
| 2A202600931 | Lê Sỹ Minh Quang | Bằng chứng (Evidence) & SPEC |
| 2A202600862 | Bùi Xuân Hải | Người viết & kiểm thử Prompt |
| 2A202600676 | Đào Duy Quyền | Người dựng giao diện & Codebase |
| 2A202600616 | Nguyễn Như Yến Phương | Người viết kịch bản demo và slide |
| 2A202600698 | Nguyễn Quang Khánh An | Người giữ Repo & Quản trị hệ thống |

---

## Mô tả sản phẩm

**CareerFit AI** giúp ứng viên tự đánh giá hồ sơ trước khi nộp việc — không chỉ trả về một con số, mà giải thích rõ **tại sao**, **thiếu gì**, và **nên học gì tiếp theo**.

### Ý tưởng cốt lõi

Người tìm việc thường không biết:
- JD đang yêu cầu kỹ năng nào là bắt buộc
- CV của mình đang thiếu gì so với JD
- Nên cải thiện theo hướng nào để tăng cơ hội

-> **CareerFit AI** phân tích độ tương thích CV <-> JD bằng AI, chấm điểm theo **Rubric 8 tiêu chí** và chỉ rõ các khoảng trống năng lực (Gaps).

### Tính năng chính

| Tính năng | Mô tả |
|-----------|-------|
| Nhập CV | Dán text hoặc tải file PDF |
| Nhập JD | Dán text hoặc nhập URL tuyển dụng |
| Báo cáo phân tích | So sánh song song 2 cột CV / JD |
| Chấm điểm | Rubric cố định 8 tiêu chí, server tự tính lại fitScore |
| Lộ trình học | Learning Roadmap cá nhân hóa theo gap thực tế |
| Bảo mật | Lọc Prompt Injection ở cả input lẫn server |