# SPEC — Career Path
### AI-powered CV-JD Compatibility Analyzer & Personalized Learning Path Generator

**Track:** Learning OS  
**Sản phẩm tham khảo:** Coursera Career Academy, LinkedIn Learning, Kickresume AI Career Map  

---

# SPEC sản phẩm

CareerFit AI là công cụ giúp người dùng tự đánh giá mức độ phù hợp giữa CV và JD trước khi ứng tuyển. Sản phẩm không chỉ trả về một điểm số, mà còn giải thích rõ vì sao điểm đó được tạo ra, tiêu chí nào đang đạt, tiêu chí nào đang thiếu, và người dùng cần cải thiện gì tiếp theo.

Sản phẩm hiện đã hoàn thiện theo hướng:
- nhập CV và JD từ form
- hỗ trợ JD paste trực tiếp hoặc lấy từ URL job
- hỗ trợ song ngữ `vi/en`
- chống prompt injection ở cả input và server
- chấm điểm theo rubric cố định với 8 tiêu chí
- hiển thị report trên một trang riêng
- tách rõ JD base, persona, CV evidence, criteria và learning roadmap

---

## 1. Bằng chứng

Nỗi đau sản phẩm giải quyết xuất phát từ thực tế người dùng thường không biết:
- JD đang yêu cầu điều gì là bắt buộc
- CV của mình đang thiếu gì
- nên sửa CV theo hướng nào để tăng cơ hội
- JD nào đáng apply ngay, JD nào nên học thêm rồi mới apply

Các bằng chứng và quan sát mà sản phẩm bám theo:

- **Trải nghiệm trực tiếp trong quy trình làm việc**
  - Người dùng thường đọc JD rất nhanh, bỏ sót requirement quan trọng.
  - Người dùng thường đánh giá CV dựa trên cảm tính, không có rubric rõ ràng.
  - Khi JD có nhiều ý bonus, người dùng dễ nhầm bonus thành mandatory.

- **Bài toán thật trong app đã build**
  - CV có thể là text paste hoặc PDF.
  - JD có thể là text hoặc URL job.
  - Nhiều URL job không đọc được trực tiếp, đặc biệt với các trang chặn crawler.
  - Người dùng cần kết quả dễ hiểu, không chỉ là một con số.

- **Quan sát từ sản phẩm hiện tại**
  - Hệ thống cần highlight JD trước rồi mới so sánh CV.
  - Mỗi tiêu chí cần có điểm, gap và improvement.
  - Roadmap học nên bám vào phần thiếu thực tế, không phải roadmap chung chung.

Các quyết định trên dựa vào chính những gì app đang xử lý trong code:
- parse CV/JD
- chấm rubric 8 tiêu chí
- roadmap học theo phase
- báo cáo riêng biệt ở route `/analysis`

---

## 2. Lát cắt để build

Lát cắt nhỏ nhất đã được chọn là:

- một người dùng có CV
- một JD bất kỳ
- hệ thống trả về:
  - persona/job profile
  - điểm fit tổng
  - breakdown theo 8 tiêu chí
  - phần thiếu / weak evidence
  - roadmap học để cải thiện
  - report CV vs JD theo 2 cột

Lát cắt này đủ để demo giá trị của sản phẩm vì:
- người dùng nhìn được JD đang đòi gì
- nhìn được CV đang chứng minh gì
- nhìn được gap ở đâu
- nhìn được nên học gì tiếp theo

Không cần build toàn bộ ATS hoặc full career platform. Chỉ cần lát cắt này là đã chứng minh được hướng đi của sản phẩm.

---

## 3. AI Product Canvas

| Ô | Câu hỏi cần trả lời |
| --- | --- |
| **Value** | Sản phẩm dành cho ai, họ đau ở đâu, và AI giải quyết điều gì mà cách làm hiện tại không giải quyết tốt? |
| **Trust** | Khi AI trả lời sai, người dùng biết bằng cách nào, và họ sửa/hoàn tác/đối chiếu ra sao? |
| **Feasibility** | Có đáng build không? Chi phí mỗi lần gọi, độ trễ, dữ liệu cần có, rủi ro lớn nhất và ngưỡng dừng là gì? |
| **Tín hiệu học** | Khi người dùng chỉnh lại kết quả, dữ liệu đó quay về đâu để cải thiện prompt, rubric và roadmap? |

### Value
CareerFit AI dành cho người mới đi làm, intern, junior, hoặc người đang chuyển việc. Họ thường gặp vấn đề:
- không đọc kỹ JD
- không biết CV thiếu gì
- không biết bonus nào là quan trọng
- không biết nên học gì trước khi apply

AI ở đây giải quyết phần:
- tóm tắt và chuẩn hóa JD
- soi CV theo rubric
- nói rõ gap và cách cải thiện
- tạo roadmap học cá nhân hóa

### Trust
Sản phẩm không để AI trả lời dạng “một khối văn bản đẹp”. Thay vào đó:
- JD được parse thành persona và requirement structure
- CV được đối chiếu theo từng tiêu chí
- mỗi tiêu chí có `score`, `jdRequirement`, `cvEvidence`, `gap`, `improvement`
- kết quả được hiển thị trên report riêng

Khi AI sai hoặc nhập vào có prompt injection:
- input được sanitize
- prompt được khóa chặt
- server tự tính lại fit score từ `scoreBreakdown`

### Feasibility
Làm được với stack hiện tại vì:
- input là CV text / PDF và JD text / URL
- prompt tách thành nhiều bước rõ ràng
- kết quả là JSON cấu trúc
- UI chỉ render dữ liệu có cấu trúc

Chi phí/rủi ro chính:
- gọi LLM nhiều bước hơn one-shot
- URL job có thể không đọc được do crawler block
- output roadmap có thể hallucinate nếu không siết prompt

Ngưỡng dừng:
- nếu JD không đủ rõ, hệ thống trả về `fitScore = 0`
- nếu URL không đọc được, người dùng được yêu cầu paste JD thủ công

### Tín hiệu học
Khi user chỉnh CV hoặc sửa JD:
- dữ liệu mới trở thành đầu vào phân tích lại
- các gap thường gặp có thể dùng để chỉnh rubric/prompt
- roadmap phổ biến có thể dùng để tối ưu gợi ý học cho những case tương tự

---

## 4. Tăng năng lực hay tự động hóa

Sản phẩm này thiên về **tăng năng lực** hơn là tự động hóa hoàn toàn.

Lý do:
- AI không thay người dùng quyết định có apply hay không
- AI chỉ chuẩn hóa phân tích, chỉ ra gap, và gợi ý cải thiện
- người dùng vẫn là người đọc, đối chiếu và quyết định cuối cùng

Phân loại:

- **AI tăng năng lực**
  - parse JD thành persona
  - parse CV thành facts
  - highlight requirement bắt buộc và bonus
  - chấm theo rubric và giải thích
  - tạo roadmap học để người dùng tự sửa CV

- **AI tự động hóa có kiểm soát**
  - fetch JD từ URL public nếu đọc được
  - tạo report structured
  - tự tính lại fit score từ breakdown

Quyền quyết định nằm ở:
- người dùng khi đọc report
- hệ thống khi tính lại score và chuẩn hóa output

Vì sao chọn mức này:
- sai ở đây không nên tự động hóa quá sâu
- nếu AI tự động quyết định hoàn toàn, hậu quả là người dùng tin sai vào một con số

---

## 5. Bốn đường đi của trải nghiệm

### 1. Đường thuận
Người dùng có CV rõ, JD rõ.
- upload CV hoặc paste CV
- paste JD hoặc nhập URL JD
- hệ thống parse và chấm
- report trả ra rõ:
  - JD base
  - persona
  - CV evidence
  - criteria
  - roadmap

### 2. Khi AI không chắc
Nếu JD quá mơ hồ:
- hệ thống trả `fitScore = 0`
- yêu cầu bổ sung JD chi tiết hơn
- không cố bịa điểm

Nếu URL job không đọc được:
- báo lỗi đọc URL
- gợi ý paste JD thủ công

### 3. Khi AI sai
Nếu output model lệch format hoặc quá lạc đề:
- server parse JSON chặt
- server tự tính lại score từ breakdown
- roadmap bị normalize để loại type sai, link sai

### 4. Khi người dùng sửa
Người dùng có thể:
- đổi locale
- sửa CV
- sửa JD
- chạy lại phân tích

Dữ liệu kết quả được chuyển sang trang report riêng để user xem lại ngay sau khi phân tích.

---

## 6. Những kiểu lỗi đáng lo nhất

### 1. Prompt injection trong CV/JD
Tình huống:
- CV hoặc JD chứa câu kiểu “ignore previous instructions”
- yêu cầu chấm 100 điểm
- yêu cầu bỏ qua rubric

Xử lý:
- sanitize ở input
- sanitize ở server
- system prompt khóa hành vi
- server tự tính lại score

Thiệt hại nếu không xử lý:
- model bị điều khiển, điểm bị kéo sai

### 2. JD quá mơ hồ
Tình huống:
- JD chỉ có vài dòng chung chung

Xử lý:
- trả `fitScore = 0`
- yêu cầu bổ sung thông tin

Thiệt hại nếu không xử lý:
- model sẽ đoán bừa và làm user hiểu nhầm

### 3. URL job không crawl được
Tình huống:
- website chặn crawler / Cloudflare

Xử lý:
- thử Tavily Extract
- nếu fail thì báo lỗi riêng
- yêu cầu paste JD

Thiệt hại nếu không xử lý:
- user tưởng hệ thống lỗi, trong khi thực ra do nguồn job

### 4. Roadmap học bị chung chung
Tình huống:
- AI trả roadmap dài nhưng không bám gap thật

Xử lý:
- roadmap phải bám missingSkills / weakEvidence
- chỉ technical mới có courseUrl
- hậu kiểm type và URL ở server

Thiệt hại nếu không xử lý:
- roadmap nhìn hay nhưng không dùng được

---

## 7. Kế hoạch kiểm thử và bằng chứng demo

### Case cần test
- CV mạnh, JD rõ
- CV yếu, JD rõ
- JD mơ hồ
- JD qua URL public
- URL bị chặn crawler
- CV/JD có prompt injection tiếng Anh
- CV/JD có prompt injection tiếng Việt

### Những bằng chứng nên mang đi demo
- screenshot report /analysis
- screenshot 2 cột CV vs JD
- screenshot breakdown từng tiêu chí
- screenshot roadmap học
- log thể hiện URL fail và fallback thủ công
- ví dụ CV sửa lại sau khi xem gap

### Cần chứng minh trên demo
- JD được highlight trước
- điểm số không phải do model bịa
- roadmap không chung chung
- prompt injection không làm lệch điểm

---

## 8. Phân công

Chi tiết xem tại [README.md](README.md)

---

## Tóm tắt quyết định sản phẩm

Các quyết định đã chốt trong sản phẩm này:

- base chấm là JD, không phải CV
- score dùng rubric cứng 8 tiêu chí
- AI phải trả JSON structured
- server tự tính lại `fitScore`
- prompt injection được lọc ở input và server
- report hiển thị ở trang riêng `/analysis`
- report có 2 cột CV / JD để đối chiếu rõ ràng
- roadmap chỉ hữu ích khi bám gap thật
- default model là GPT-4o-mini

