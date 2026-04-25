# Product Specification Document
## Private Car Tours Da Nang — Website

| Trường | Nội dung |
|---|---|
| **Sản phẩm** | Website marketing & booking cho dịch vụ xe riêng / tour Miền Trung |
| **Phiên bản** | v1.0 |
| **Ngày** | 24/04/2026 |
| **Tác giả** | Đặng Văn Nghĩa |
| **Liên hệ** | dangvannghia1983@gmail.com · +84 90 595 18 42 |
| **Trạng thái** | ✅ Production-ready |

---

## 1. Tổng quan sản phẩm

**Private Car Tours Da Nang** là website marketing một trang (landing page + blog) dành cho dịch vụ cho thuê xe riêng và tổ chức tour du lịch ở Miền Trung Việt Nam. Mục tiêu cốt lõi là **chuyển đổi khách truy cập thành khách hàng liên hệ** thông qua các kênh trực tiếp (Zalo, WhatsApp, Messenger, Gmail, điện thoại).

### Giá trị cốt lõi (USP)
- 🔒 **An toàn** — Xe đời mới (Toyota), tài xế có kinh nghiệm
- ⏰ **Đúng giờ** — Đón tận nơi tại khách sạn/sân bay/ga tàu
- 💰 **Minh bạch giá** — Báo giá trọn gói, không phụ phí ẩn
- 🌍 **Quốc tế hóa** — Hỗ trợ VI/EN, tài xế giao tiếp tiếng Anh cơ bản

---

## 2. Đối tượng người dùng (Target Audience)

| Phân khúc | Đặc điểm | Nhu cầu chính |
|---|---|---|
| **Khách nội địa** | Du khách từ HN, HCM, gia đình/nhóm bạn | Tiếng Việt, Zalo, giá rõ ràng |
| **Khách quốc tế** | Châu Âu (Pháp), Mỹ, Hàn Quốc, Úc | Tiếng Anh, WhatsApp/Messenger, tour linh hoạt |
| **Cặp đôi/Honeymoon** | Muốn trải nghiệm lãng mạn (Hải Vân, Hội An) | Private, riêng tư, chụp ảnh đẹp |
| **Gia đình có trẻ em** | Cần xe rộng, an toàn, linh hoạt giờ giấc | Xe 7 chỗ, đón tại hotel |
| **Khách thích văn hóa** | Muốn tham quan Huế, Mỹ Sơn (UNESCO) | Tài xế hiểu biết địa phương |

---

## 3. Kiến trúc kỹ thuật

### Stack
| Layer | Công nghệ |
|---|---|
| **Frontend** | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| **Styling** | CSS Custom Properties (Design Tokens), Flexbox, Grid |
| **Icons** | Font Awesome 6.5.1 (CDN) |
| **Fonts** | Google Fonts: Playfair Display + Inter |
| **i18n** | Custom JS module ([i18n.js](file:///e:/Code/Private_car-tours_Da_Nang/i18n.js)) — CSS-selector based |
| **Hosting** | Static (tương thích GitHub Pages, Netlify, VPS) |
| **Analytics** | Chưa tích hợp (roadmap) |

### Cấu trúc file
```
Private_car-tours_Da_Nang/
├── index.html       # Trang chủ (landing page chính)
├── blog.html        # Trang blog / danh sách bài viết
├── style.css        # Toàn bộ styles (Design System)
├── script.js        # Logic UI, animations, forms
├── i18n.js          # Bản đồ dịch thuật VI/EN
└── images/          # Assets hình ảnh
    ├── tour_hoi_an.png
    ├── tour_ba_na.png
    ├── tour_hue.png
    ├── tour_danang.png
    ├── tour_my_son.png
    ├── tour_custom.png
    └── team_driver.png
```

### Design System (CSS Tokens)
```css
--navy-dark: #051525      /* Primary dark */
--navy:      #0a1d37      /* Primary */
--gold:      #c9a84c      /* Accent / CTA */
--gold-light: #e2c165     /* Hover states */
--white:     #ffffff
--off-white: #f8f6f4      /* Section backgrounds */
--radius-lg: 16px
--transition: all .3s ease
```

---

## 4. Các tính năng chi tiết

### 4.1 Navigation
| Feature | Mô tả |
|---|---|
| **Sticky Navbar** | Cố định khi scroll, đổi shadow khi scroll > 50px |
| **Logo** | Emoji 🚗 + tên thương hiệu + tagline |
| **Menu links** | Anchor links đến các section (smooth scroll) |
| **Language Toggle** | Nút VI 🇻🇳 / EN 🇬🇧 hiển thị trong navbar và mobile menu |
| **CTA button** | "Tư vấn ngay" mở Contact Modal |
| **Hamburger** | Menu mobile (toggle slide-down) |

### 4.2 Hero Section
| Feature | Mô tả |
|---|---|
| **Slideshow** | 5 ảnh nền tự động chuyển (fade), interval 5 giây |
| **Badge** | "⭐ Dịch vụ xe riêng cao cấp Miền Trung" |
| **H1** | "Private Car Tours Da Nang" |
| **Tagline** | 5 điểm đến chính (Đà Nẵng, Hội An, Huế, Bà Nà, Mỹ Sơn) |
| **CTAs** | "Tư vấn miễn phí ngay" (modal) + "Xem các tour" (anchor) |
| **Social Quick Links** | Zalo, WhatsApp, Messenger, Gmail (floating bottom-left) |
| **Scroll indicator** | Animated dot gợi ý cuộn trang |

### 4.3 About Us
| Feature | Mô tả |
|---|---|
| **Grid layout** | 2 cột: ảnh trái + nội dung phải |
| **Image badge** | "8+ Năm kinh nghiệm" overlay |
| **Animated Counters** | 8 năm · 1,000+ khách · 500+ điểm · 4.9⭐ (count-up animation khi scroll vào viewport) |

### 4.4 Why Us
| Feature | Mô tả |
|---|---|
| **4 USP Cards** | Xe Đời Mới · Tài Xế Chuyên Nghiệp · Lịch Trình Linh Hoạt · Giá Minh Bạch |
| **Background** | Dark navy gradient |
| **Icons** | Emoji 🚗 👨‍✈️ 🗺️ 💰 |

### 4.5 Tours Section
| Tour | Điểm nổi bật | Thời gian |
|---|---|---|
| **Đà Nẵng – Hội An** | Ngũ Hành Sơn, Làng Lụa, Thuyền Dừa, Phố Cổ | 1 ngày |
| **Đà Nẵng – Bà Nà Hills** | Cầu Vàng, Le Jardin, Làng Pháp, Fantasy Park | 1 ngày |
| **Đà Nẵng – Huế** | Đèo Hải Vân, Đại Nội, Chùa Thiên Mụ, Lăng tẩm | 1 ngày |
| **Đà Nẵng – Mỹ Sơn** | Tháp Chăm, Vũ điệu Chăm Pa | 4–6 tiếng |
| **Đà Nẵng City Tour** | Cầu Rồng, Chùa Linh Ứng, Ngũ Hành Sơn, Mỹ Khê | 1 ngày |
| **Custom Tour** | Thiết kế theo yêu cầu | 1–5 ngày |

Mỗi tour card gồm: ảnh + badge + highlights + "Xem lịch trình" (accordion) + "Hỏi ngay" (modal).

### 4.6 Reviews / Testimonials
- **Slider** tự động (2 slides, 3+2 reviews/slide)
- Đánh giá đa quốc gia: 🇻🇳 Việt Nam, 🇫🇷 Pháp, 🇺🇸 Mỹ, 🇰🇷 Hàn Quốc
- **Rating**: 4.9/5 sao (1,000+ đánh giá)
- Navigation: prev/next buttons + dot indicators

### 4.7 Contact Section
| Component | Mô tả |
|---|---|
| **Form** | Họ tên, SĐT, Email, Tour quan tâm, Số người, Ngày, Ghi chú |
| **Validation** | HTML5 native required fields |
| **Success message** | Hiện "#form-success" khi submit |
| **Channel buttons** | Zalo · WhatsApp · Messenger · Gmail với số/email hiển thị |
| **Hotline box** | +84 90 595 18 42 · giờ làm việc 6:00–22:00 |

### 4.8 FAQ Section
8 câu hỏi thường gặp với accordion expand/collapse:
1. Đặt tour như thế nào?
2. Giá bao gồm những gì?
3. Hủy được không?
4. Xe đón tận nơi không?
5. Có hướng dẫn viên không?
6. Tour tiếng Anh không?
7. Thanh toán như thế nào?
8. Xe có bao nhiêu chỗ?

### 4.9 Blog
- **index.html**: Preview 3 bài viết mới nhất
- **blog.html**: Grid 6 bài + 1 CTA card "Tư vấn lộ trình riêng"
- **Danh mục**: Kinh nghiệm · So sánh · Ẩm thực · Địa điểm · Lịch trình · Tư vấn
- Bài nổi bật:
  - Hội An 3 ngày 2 đêm A–Z
  - Bà Nà Hills: tour hay tự đi?
  - 15 món ăn Đà Nẵng không thể bỏ lỡ
  - Đèo Hải Vân đẹp nhất lúc nào?
  - Tour Huế 1 ngày có đủ chơi không?

### 4.10 Conversion Elements (Luôn hiển thị)

| Element | Vị trí | Nội dung |
|---|---|---|
| **Contact Sidebar** | Cố định bên phải (desktop) | Zalo · WhatsApp · Messenger · Gmail · Gọi ngay |
| **Mobile Sticky Bar** | Dưới cùng (mobile) | Gọi ngay · Zalo · WhatsApp · Messenger |
| **Contact Modal** | Popup toàn màn hình | 4 channel buttons + đóng |
| **FAB (blog.html)** | Bottom-right | Toggle menu 4 kênh |

### 4.11 Internationalization (i18n)
- **Engine**: [i18n.js](file:///e:/Code/Private_car-tours_Da_Nang/i18n.js) — mapping CSS selector → translated string
- **Ngôn ngữ**: VI (mặc định) / EN
- **Scope**: Toàn bộ UI — navbar, hero, sections, tours, FAQ, footer, modal, sidebar
- **Trigger**: Nút VI/EN trong navbar và mobile menu
- **Persistence**: LocalStorage lưu ngôn ngữ đã chọn
- **Bao phủ**: ~150 string keys đã được dịch hoàn chỉnh

---

## 5. SEO & Metadata

| Tag | Giá trị |
|---|---|
| `<title>` | Private Car Tours Da Nang — Tour Đà Nẵng Hội An Huế Trọn Gói |
| `meta description` | Dịch vụ tour và xe riêng Miền Trung uy tín... |
| `meta keywords` | tour đà nẵng hội an, thuê xe đà nẵng theo ngày, danang private car tour... |
| `og:title` | Private Car Tours Da Nang |
| `og:type` | website |
| **Schema.org** | `TravelAgency` + `FAQPage` (JSON-LD) |
| **`loading="lazy"`** | Tất cả ảnh |
| **Semantic HTML** | `<nav>`, `<section>`, `<footer>`, `<h1>–<h3>` |

---

## 6. Hiệu năng & UX

| Feature | Mô tả |
|---|---|
| **Fade-up animations** | IntersectionObserver kích hoạt khi phần tử vào viewport |
| **Count-up counters** | Chạy số từ 0 → target khi section About vào viewport |
| **Smooth scroll** | CSS `scroll-behavior: smooth` |
| **Responsive** | Mobile-first, breakpoint chính: 768px |
| **No JavaScript dependencies** | Thuần Vanilla JS, không framework/library |
| **Font loading** | Google Fonts preconnect |

---

## 7. Thông tin doanh nghiệp

| Trường | Giá trị |
|---|---|
| **Tên** | Private Car Tours Da Nang |
| **Điện thoại / Zalo** | +84 90 595 18 42 |
| **Email** | dangvannghia1983@gmail.com |
| **Địa chỉ** | Đà Nẵng, Việt Nam |
| **Giờ làm việc** | 6:00 – 22:00 mỗi ngày |
| **Facebook** | m.me/61579280855597 |
| **Kinh nghiệm** | 8+ năm |
| **Đội xe** | Toyota 4 chỗ / 7 chỗ / 16 chỗ VAN |
| **Thị trường** | Khách nội địa + quốc tế (EN) |

---

## 8. Roadmap phát triển

### 🔴 Còn thiếu / Cần làm (v1.1)
- [ ] **Pricing table** — Hiển thị bảng giá tham khảo (hiện tại chỉ "Liên hệ báo giá")
- [ ] **Form backend** — Kết nối form liên hệ với email (EmailJS / Formspree)
- [ ] **Blog detail pages** — Hiện tại các link blog đang link về `#` (placeholder)
- [ ] **Google Analytics** — Tracking lượt truy cập và conversion
- [ ] **Google Tag Manager** — Event tracking (click CTA, form submit)
- [ ] **i18n cho blog.html** — Blog page chưa có language toggle

### 🟡 Cải tiến UX (v1.2)
- [ ] **Booking calendar** — Tích hợp Calendly hoặc datepicker cho phép đặt lịch trực tiếp
- [ ] **WhatsApp Business API** — Tự động trả lời khi đặt tour
- [ ] **Google Reviews embed** — Hiển thị đánh giá Google thực tế
- [ ] **TikTok / Instagram feed** — Embed social content
- [ ] **Live Chat widget** — Tawk.to hoặc Crisp

### 🟢 Mở rộng dài hạn (v2.0)
- [ ] **Online payment** — Cổng thanh toán VNPay/Momo để đặt cọc
- [ ] **CMS** — Quản lý bài blog và tour mà không cần sửa code
- [ ] **Đa ngôn ngữ mở rộng** — Thêm 🇰🇷 KO, 🇨🇳 ZH, 🇯🇵 JA
- [ ] **PWA** — Progressive Web App (offline support, add to homescreen)

---

## 9. Định nghĩa "Done"

Tính năng được coi là hoàn thiện khi:
1. ✅ Hiển thị đúng trên Chrome/Safari/Firefox (desktop + mobile)
2. ✅ Responsive tốt ở 375px (iPhone SE), 768px (iPad), 1440px (Desktop)
3. ✅ Dịch đầy đủ sang tiếng Anh khi toggle EN
4. ✅ Tất cả CTA links mở đúng kênh liên hệ
5. ✅ Lighthouse Performance ≥ 80, Accessibility ≥ 90
6. ✅ Schema.org JSON-LD validate không lỗi (Google Rich Results Test)
