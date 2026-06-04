# SPEC — Career Path
### AI-powered Personalized Learning Path Generator from CV + JD

**Track:** Learning OS  
**Sản phẩm tham khảo:** Coursera Career Academy, LinkedIn Learning, Kickresume AI Career Map  
**Thành viên nhóm:**

| Mã học viên | Họ và tên |
|-------------|-----------|
| 2A202600698 | Nguyễn Quang Khánh An |
| 2A202600616 | Nguyễn Như Yến Phương |
| 2A202600676 | Đào Duy Quyền |
| 2A202600931 | Lê Sỹ Minh Quang |
| 2A202600862 | Bùi Xuân Hải |

---

## 1. Bằng chứng

Nỗi đau nhóm muốn giải đến từ quan sát trực tiếp và nguồn bên ngoài nhóm.

### Trải nghiệm trực tiếp (self-use)

| Quan sát | Hình ảnh | Pain | SPEC phải đổi gì? |
|----------|----------|------|-------------------|
| **LinkedIn Learning** gợi ý khóa dựa trên job title phổ biến trong ngành, không phân tích skill thật sự user đang thiếu → gợi ý quá chung chung | ![LinkedIn Learning](../../../Day05/Day05/Batch02-Day05-AI-Product-Labs/02-group-spec/images/linkedin_learning.jpg) | User có kinh nghiệm bị gợi ý khóa beginner không liên quan | AI phải đọc CV thật, không chỉ dùng job title |
| **ChatGPT** paste CV + JD → phân tích gap tốt nhưng output dài, không structured, không persist, mỗi session phải làm lại từ đầu | ![ChatGPT session 1](../../../Day05/Day05/Batch02-Day05-AI-Product-Labs/02-group-spec/images/chatgpt_1.jpg) ![ChatGPT session 2](../../../Day05/Day05/Batch02-Day05-AI-Product-Labs/02-group-spec/images/chatgpt_2.jpg) | AI engine đủ tốt, thiếu UX wrapper: persistence, structure, tracking | Prototype cần structured UI, không chỉ chat |
| **Kickresume AI Career Map** → chỉ list "bạn thiếu skill X, Y, Z" nhưng không gợi ý nguồn học, không có timeline | ![Kickresume 1](../../../Day05/Day05/Batch02-Day05-AI-Product-Labs/02-group-spec/images/kickresume_1.jpg) ![Kickresume 2](../../../Day05/Day05/Batch02-Day05-AI-Product-Labs/02-group-spec/images/kickresume_2.jpg) | Gap analysis → learning path là bước chưa ai làm tốt | Build slice phải end-to-end: gap → path → resources → timeline |
| **Coursera Career Track** cố định 8 khóa từ beginner dù user đã biết 60% nội dung → bị ép học lại từ đầu | _(self-use, không chụp màn hình)_ | Lãng phí thời gian → dropout | Build slice phải có CV input để skip phần đã biết |

### Nguồn bên ngoài nhóm

| Trích dẫn / Quan sát | Nguồn | Người dùng là ai? | Pain / Failure mode |
|----------------------|-------|-------------------|---------------------|
| 85% người học Coursera đăng ký để phát triển kỹ năng sự nghiệp — nhưng **gần 2/3 không biết mình cần học skill gì** để đạt mục tiêu | [Coursera Learner Outcomes Report — "From Catalog to Compass"](https://blog.coursera.org/from-catalog-to-compass) (Apr 2025) | Người đi làm muốn upskill / chuyển ngành | Lộ trình cố định không tính kinh nghiệm và mục tiêu cụ thể từng người |
| **40% người được khảo sát** nói rào cản lớn nhất khi phát triển kỹ năng là **không biết bắt đầu từ đâu** | IBM study, dẫn bởi [edX press release](https://press.edx.org/edx-launches-try-it-courses-in-high-demand-digital-and-tech-skills) | Self-learner, junior dev muốn upskill | Information overload, không biết chọn khóa nào |
| Dùng ChatGPT phân tích CV + JD là pattern phổ biến, nhưng output chỉ là **một lần duy nhất** — không lưu lại, không theo dõi tiến độ | [Jobright.ai Blog — "ChatGPT Careers"](https://jobright.ai/blog/chatgpt-careers/) (2026) | Người tìm việc, mid-career | AI analysis tốt nhưng thiếu persistence và tracking |
| Tỷ lệ dropout MOOC từ Stanford, MIT, UC Berkeley dao động **80–95%**; chỉ 7% trong 50.000 học viên hoàn thành khóa Software Engineering trên Coursera/UC Berkeley | ["MOOCs Completion Rates and Possible Methods to Improve Retention"](https://www.researchgate.net/publication/263348990_MOOCs_Completion_Rates_and_Possible_Methods_to_Improve_Retention_-_A_Literature_Review), ResearchGate (2014) | Người học online nói chung | Overwhelmed, không phù hợp level, thiếu personalization |

> **Giả định chưa có nguồn bên ngoài:** Việc user chỉnh sửa kết quả AI tạo ra sẽ cải thiện chất lượng output lần sau — đây là giả thiết kỹ thuật, chưa được kiểm chứng trong prototype này.

---

## 2. Lát cắt để build

Prototype tập trung vào **một flow duy nhất**:

> Cho **người mới tốt nghiệp hoặc đã đi làm 1–2 năm đang muốn apply vị trí mới**, đang **tự lên kế hoạch học thêm để match JD**, prototype sẽ dùng AI để: **đọc CV + JD → phân tích skill gap → tạo lộ trình học cá nhân hoá** ; tạo ra **danh sách skill gaps được ưu tiên + lộ trình học có nguồn cụ thể (link khóa/video) + timeline gợi ý** ; xử lý **trường hợp AI đánh giá sai skill level hoặc CV/JD quá mơ hồ** bằng **hiển thị confidence score cho mỗi skill + cho user review/chỉnh trước khi confirm lộ trình**.

**Không build trong Day 06 (backlog):**
- Tích hợp API Coursera/Udemy để enroll tự động
- Hệ thống tracking tiến độ + quiz/assessment sau mỗi module
- Social features (learning community)
- Mobile app / multi-language

---

## 3. AI Product Canvas

| Ô | Câu hỏi | Câu trả lời của nhóm |
|---|---------|----------------------|
| **Value — Giá trị** | Sản phẩm dành cho ai, họ đau ở đâu, AI giải được điều gì mà cách làm hiện tại chưa giải tốt? | **Đối tượng:** Người đi làm 1–2 năm muốn apply vị trí mới, đang tự học nhưng không biết học gì. <br>**Pain:** Các platform hiện tại hoặc one-size-fits-all (Coursera), hoặc chỉ dừng ở gap list mà không chỉ đường học (Kickresume), hoặc có analysis tốt nhưng không persist (ChatGPT). Tỷ lệ dropout 85–95% là bằng chứng personalization hiện tại chưa đủ. <br>**AI giải được:** end-to-end từ CV+JD → gap analysis → learning path có nguồn + timeline, dựa trên profile cá nhân thật — không phải job title chung. |
| **Trust — Niềm tin** | Khi AI trả lời sai, người dùng nhận ra bằng cách nào, và họ sửa lại, hoàn tác hay chuyển sang người thật ra sao? | AI sai skill level → user thấy **confidence score** cho mỗi skill assessment + **nguồn trích dẫn** ("skill này lấy từ JD dòng X, CV của bạn có/không mention"). User có thể **review và chỉnh từng skill** trước khi confirm lộ trình. <br>Sau khi có lộ trình, user có thể click **"Tôi đã biết skill này"** để remove và AI tự adjust timeline. Không có "chuyển sang người thật" vì đây là advisory tool — quyết định cuối luôn thuộc về user. |
| **Feasibility — Tính khả thi** | Có đáng để build không? Chi phí, độ trễ, dữ liệu cần, rủi ro lớn nhất, ngưỡng dừng? | **Chi phí:** ~$0.02–0.05/lần call GPT-4o (CV+JD khoảng 2.000 tokens). <br>**Độ trễ:** < 10 giây, chấp nhận được cho use case này. <br>**Dữ liệu cần:** CV text + JD text — user tự cung cấp, không cần thu thập thêm. <br>**Rủi ro lớn nhất:** AI không hiểu jargon chuyên ngành niche → miss hoặc thêm skills sai. <br>**Ngưỡng dừng:** Nếu accuracy skill extraction < 70% (user reject > 30% skill suggestions) → fallback về manual review + cảnh báo rõ. |
| **Tín hiệu học** | Khi người dùng chỉnh sửa kết quả, dữ liệu đó đi về đâu và giúp sản phẩm khá lên nhờ tín hiệu nào? | Trong prototype Day 06 (stateless): tín hiệu học chưa được lưu. <br>**Thiết kế tương lai:** Khi user chỉnh skill level → lưu vào preference profile. <br>Khi user mark "đã biết" → dùng làm training signal để hiệu chỉnh skill extraction. <br>Khi user reject gợi ý khóa học → record preference (free/paid, video/text, platform). <br>Tín hiệu tổng hợp → cải thiện model scoring cho users tương tự. |

---

## 4. Tăng năng lực hay tự động hóa

**Quyết định: Augmentation (tăng năng lực)**

AI gợi ý và chuẩn bị lộ trình → **con người review và quyết định cuối**.

**Con người giữ quyền ở:**
1. **Xác nhận skill level** — review từng skill AI extract được, chỉnh nếu sai
2. **Approve lộ trình** — confirm trước khi "bắt đầu học" (không tự enroll)
3. **Chỉnh sửa lộ trình** — thêm/bớt skill, đổi nguồn học, điều chỉnh timeline

**Lý do chọn mức này:**
- Skill assessment từ CV có thể sai (CV không phản ánh hết năng lực thật)
- Mỗi người có bối cảnh riêng: thời gian rảnh, budget, learning style
- **Hậu quả nếu AI tự quyết sai:** user mất weeks/months học sai thứ → high-effort, khó hoàn tác → trust collapse
- Domain không life-critical nhưng high-effort → cần user review + adjust
- So sánh: nếu học sai 1 tuần mà biết → sửa được; nếu học sai 3 tháng → thiệt hại lớn

---

## 5. Bốn đường đi của trải nghiệm

| Đường đi | Câu hỏi | Prototype thể hiện thế nào |
|----------|---------|---------------------------|
| **Đường thuận** | AI đúng và tự tin — người dùng thấy gì? | User upload CV Junior Frontend (HTML/CSS/JS/React) + paste JD Senior Frontend (TypeScript, Next.js, Testing, System Design). <br>AI hiển thị: "Bạn đã có 4/8 skills, cần bổ sung 4 skills" <br>→ show lộ trình 3 tháng, 4 modules, mỗi module có 2–3 nguồn (free YouTube + paid Udemy) + timeline tuần <br>→ user approve <br>→ xem lộ trình đầy đủ. |
| **Khi AI không chắc** | AI lưỡng lự — có hỏi lại không? | User upload CV mơ hồ ("đã làm việc với data") + JD "Advanced SQL, Python, Tableau". <br>→ AI không chắc user biết SQL ở mức nào <br>→ hiển thị: "Tôi thấy bạn có kinh nghiệm data nhưng chưa rõ mức SQL. Bạn tự đánh giá: Beginner / Intermediate / Advanced?" <br>→ user chọn <br>→ AI adjust lộ trình tương ứng. |
| **Khi AI sai** | Kết quả sai — người dùng gỡ ra thế nào? | User upload CV giáo viên Tiếng Anh + JD Software Engineer <br>→ gap quá lớn (thiếu 90% skills). AI cảnh báo: "Khoảng cách skill rất lớn, lộ trình ước tính 12–18 tháng. Bạn có muốn xem các vị trí trung gian (QA Tester, Technical Writer) gần hơn với profile hiện tại không?" <br>→ đưa ra lộ trình thay thế thực tế hơn. |
| **Khi người dùng sửa** | Người dùng chỉnh lại — dữ liệu đi về đâu? | Sau khi nhận lộ trình, user thấy AI gợi ý học "Python cơ bản" nhưng mình đã biết (chỉ là CV không ghi). User click "Tôi đã biết skill này" <br>→ AI remove khỏi lộ trình + tự adjust timeline. _(Trong prototype: preference chưa được persist; thiết kế tương lai: lưu lại cho lần sau.)_ |

---

## 6. Những kiểu lỗi đáng lo nhất

### Failure Mode 1 — CV mơ hồ / JD có jargon chuyên ngành niche

**Khi nào xảy ra:** User upload CV ghi chung chung ("worked with data", "built web apps") hoặc JD có từ ngữ chuyên ngành rất niche mà LLM không quen (ví dụ: tên thư viện nội bộ, framework ngách).

**Ai chịu thiệt và nặng đến đâu:** User nhận lộ trình sai — thiếu skill quan trọng hoặc thêm skill không cần. Hậu quả: học sai nhiều tuần/tháng <br>→ mất thời gian + mất trust vào sản phẩm.

**Prototype xử lý:** Hiển thị **confidence score** cho từng skill assessment (ví dụ: "SQL — 60% chắc, dựa trên 'worked with data'"). Show nguồn trích dẫn: "Skill này lấy từ JD dòng 12, CV của bạn có/không mention cụ thể." Cho user **review và chỉnh từng skill** trước khi confirm. Nếu confidence < 50% <br>→ hỏi lại user thay vì tự quyết.

---

### Failure Mode 2 — Gap quá lớn, lộ trình không thực tế

**Khi nào xảy ra:** User có background hoàn toàn khác ngành so với JD mục tiêu (ví dụ: giáo viên → software engineer; kế toán → data scientist). AI cố tạo lộ trình dẫn đến output 12–18 tháng học với 20+ skills.

**Ai chịu thiệt và nặng đến đâu:** User bị overwhelmed ngay từ đầu <br>→ bỏ cuộc trước khi bắt đầu. <br>→ Đây là failure mode có tỷ lệ cao nhất vì replicates vấn đề "information overload" hiện tại trên Coursera/LinkedIn.

**Prototype xử lý:** Phát hiện khi gap > 70% skills thiếu <br>→ cảnh báo rõ ("Khoảng cách skill rất lớn"). Tự động đề xuất **vị trí trung gian** gần hơn với profile hiện tại (QA Tester, Technical Writer, Data Analyst). <br>→ Cho user chọn: tiếp tục với lộ trình dài hạn hoặc chuyển sang mục tiêu gần hơn.

---

### Failure Mode 3 — User ghi skills không có vào CV (inflate CV)

**Khi nào xảy ra:** User ghi vào CV các skill mình chưa thực sự có để trông CV đẹp hơn <br>→ AI đọc CV và tin vào đó <br>→ skip skills quan trọng trong lộ trình.

**Ai chịu thiệt và nặng đến đâu:** Chủ yếu user tự hại bản thân: nhận lộ trình thiếu foundation skills <br>→ khi đi phỏng vấn hoặc làm việc thật sẽ bị lộ. <br>→ Không gây hại bên ngoài.

**Prototype xử lý:** Không thể verify CV — đây là **giới hạn thiết kế đã biết**. <br>→ Cách xử lý: ghi rõ trong UI "Lộ trình này dựa trên những gì bạn khai báo trong CV. Nếu bạn chưa chắc về skill nào, hãy tự đánh giá lại ở bước review." Có nút "Tôi chưa chắc về skill này" để user tự flag → AI suggest cách self-assess (bài test nhỏ, resource để verify level).

---

## 7. Kế hoạch kiểm thử và bằng chứng demo

### Hai input chuẩn bị sẵn để demo

**Input 1 — Happy case (Đường thuận):**
```
CV: Junior Frontend Developer, 1.5 năm kinh nghiệm
Skills: HTML, CSS, JavaScript, React, Git, REST API
JD: Senior Frontend Developer — yêu cầu thêm: TypeScript, Next.js, Jest/Testing Library, System Design cơ bản, CI/CD

Kỳ vọng output: 
- Gap: TypeScript, Next.js, Jest, System Design (4 skills)
- Lộ trình 3 tháng, 4 modules
- Mỗi module: 2–3 nguồn học (1 free YouTube, 1 paid Udemy/Pluralsight) + timeline tuần
```

**Input 2 — Hard case (AI không chắc + phục hồi):**
```
CV: "3 năm làm việc trong lĩnh vực data, quen với phân tích số liệu, 
      sử dụng các công cụ xử lý dữ liệu"
JD: Data Analyst — yêu cầu: Advanced SQL, Python (Pandas, NumPy), Tableau, 
     Power BI, Statistical Analysis

Kỳ vọng output:
- AI nhận ra CV mơ hồ → confidence thấp cho hầu hết skills
- Hỏi lại user tự đánh giá level cho SQL và Python
- Sau khi user chọn level → generate lộ trình adjusted
```

### Artifacts giữ lại trong quá trình làm

- [ ] Screenshots kết quả 4 test paths (happy / low-confidence / failure / correction)
- [ ] Prompt log — prompt system đã dùng, version nào, thay đổi gì
- [ ] Test case document — input, expected output, actual output, pass/fail
- [ ] Video screen recording demo chạy live (backup nếu demo live gặp sự cố)
- [ ] Danh sách đánh đổi đã cân nhắc: tại sao chọn augment không phải automate, tại sao confidence threshold 50%, tại sao không persist trong prototype

---

## 8. Phân công

| Thành viên | Phụ trách | Bằng chứng cần có trong repo |
|------------|-----------|------------------------------|
| **Nguyễn Quang Khánh An** | SPEC hoàn chỉnh (`spec/spec.md`) + evidence pack (screenshots, trích dẫn nguồn) | File `spec/spec.md` này + thư mục `images/` trong evidence Day 5 |
| **Nguyễn Như Yến Phương** | AI Product Canvas + failure modes + test script 4 paths | Section Canvas, Failure modes, Test plan trong spec + file test script |
| **Đào Duy Quyền** | Prototype code: upload CV+JD → AI gap analysis → learning path output | Toàn bộ code trong `codebase/` + README chạy prototype |
| **Lê Sỹ Minh Quang** | Test 4 paths (happy / low-confidence / failure / correction), ghi kết quả, quay video demo | Screenshots kết quả test + video demo backup |
| **Bùi Xuân Hải** | Repo GitHub nhóm (cấu trúc, README danh sách thành viên, .gitignore) + demo script 5 phút + slide nếu có | `README.md` repo nhóm + file demo script |
