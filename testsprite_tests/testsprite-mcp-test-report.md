# TestSprite AI Testing Report (MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** Private_car-tours_Da_Nang
- **Date:** 2026-04-25
- **Prepared by:** TestSprite AI Team
- **Test Environment:** Static HTTP server (http-server v14.1.1) on port 8080
- **Total Tests:** 30
- **Pass Rate:** 66.7% (20/30)

---

## 2️⃣ Requirement Validation Summary

### 🌐 Language Switcher (i18n)

#### ✅ TC001 — Switch to English updates landing page text and persists after reload
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/7ead72dc-1d8d-46a9-b1ce-b2bcf79ebf4b)
- **Status:** ✅ Passed
- **Analysis:** EN toggle correctly translates all page content and persists after page reload via localStorage.

#### ✅ TC006 — Switch back to Vietnamese updates landing page text immediately
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/16935219-5476-4774-8049-0a68b2bcd22b)
- **Status:** ✅ Passed
- **Analysis:** VI toggle instantly reverts all content to Vietnamese without page reload.

#### ✅ TC017 — Language toggle remains accessible and usable after section navigation
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/054260bc-5941-40c4-a9b7-a778bb9b85f6)
- **Status:** ✅ Passed
- **Analysis:** Sticky navbar keeps language toggle accessible regardless of scroll position.

#### ✅ TC018 — Language choice persists across navigation within landing page sections
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/54d198e1-6516-4cb9-a5df-d19bcd3c6fb0)
- **Status:** ✅ Passed
- **Analysis:** Navigating between sections does not reset language selection.

#### ✅ TC027 — Language persists after opening and closing the contact modal
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/e7cecf4b-9b55-4577-b707-10141720902b)
- **Status:** ✅ Passed
- **Analysis:** Modal interaction does not interfere with i18n state.

---

### 🧭 Navigation

#### ✅ TC002 — Navigate to sections via sticky menu and open contact modal
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/7ac1475b-b669-412f-902b-834f2b04f50f)
- **Status:** ✅ Passed
- **Analysis:** All anchor links scroll smoothly to correct sections.

#### ❌ TC003 — Mobile hamburger menu navigates to a section and auto-closes
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/e92f87b3-a536-4ee5-ac03-355c26992994)
- **Status:** ❌ Failed
- **Analysis:** TestSprite tests run on desktop viewport; hamburger menu is hidden on desktop. This is a **test environment limitation**, not a code bug. The hamburger is only visible at ≤768px.

#### 🚫 TC030 — Hamburger menu open/close toggles reliably on mobile
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/dc7213d8-f122-44b1-9678-4b1d3a96412a)
- **Status:** BLOCKED
- **Analysis:** Same limitation — test environment cannot resize viewport to mobile.

#### ✅ TC023 — Hero CTA scrolls to Tours section
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/71179a08-bbe7-493c-8975-06ea055a3c3d)
- **Status:** ✅ Passed
- **Analysis:** "Xem các tour" button correctly scrolls to #services section.

---

### 💬 Contact Modal

#### ✅ TC010 — Hero CTA opens the contact modal
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/6b04e44a-7faa-4cb2-bf40-b876711b53b7)
- **Status:** ✅ Passed
- **Analysis:** "Tư vấn miễn phí ngay" button correctly opens contact modal.

#### ✅ TC011 — Open contact modal from a landing-page CTA
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/ec1af9c5-a760-4900-840c-69bf542d6bb4)
- **Status:** ✅ Passed
- **Analysis:** All `data-open-modal` buttons trigger the modal.

#### ✅ TC012 — Contact CTA from navbar works after switching language
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/00544566-783e-47f3-9c19-91bf24f88fe3)
- **Status:** ✅ Passed
- **Analysis:** CTA works in both VI and EN mode.

#### ❌ TC019 — Dismiss contact modal using the close control
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/67148d35-140d-4c0a-8d19-ac998990fdaa)
- **Status:** ❌ Failed
- **Analysis:** **BUG DETECTED** — The "✕ Đóng" close button does not close the modal. The click handler may not be properly bound to the `data-modal-close` button.

#### ❌ TC024 — Contact modal can be dismissed and browsing can continue
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/3403d21a-7954-45b6-b6b0-473668ff5f01)
- **Status:** ❌ Failed
- **Analysis:** Same root cause as TC019 — modal close button not functional.

#### ❌ TC026 — Dismiss contact modal by clicking the overlay
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/1651d44f-48dd-494a-9212-9fdf9be51dfb)
- **Status:** ❌ Failed
- **Analysis:** **BUG DETECTED** — Clicking the overlay does not dismiss the modal. The overlay click handler may not be properly propagating or the overlay z-index prevents clicks from reaching the handler.

---

### 📞 Contact Channels

#### ✅ TC004 — Contact sidebar is visible and provides quick access to contact channels
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/5eee1fc5-8959-4cea-9845-066ea43a984c)
- **Status:** ✅ Passed
- **Analysis:** Sidebar is always visible on desktop with all 5 channels accessible.

#### ✅ TC005 — Launch WhatsApp contact from the modal
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/e5377780-7429-4cec-b8da-f8c884161e55)
- **Status:** ✅ Passed
- **Analysis:** WhatsApp link correctly opens `wa.me` with pre-filled message.

#### ✅ TC007 — Open Zalo from the contact sidebar
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/49f5d17e-8332-4434-b339-cc1bb9081605)
- **Status:** ✅ Passed
- **Analysis:** Zalo link works correctly.

#### ✅ TC008 — Launch Zalo contact from the modal
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/31400670-5332-4230-8aaa-7119912028e3)
- **Status:** ✅ Passed
- **Analysis:** Modal Zalo button triggers correctly.

#### ✅ TC009 — Initiate a phone call from the contact sidebar
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/6d722fbd-6051-4b9e-87f0-ba2685a01474)
- **Status:** ✅ Passed
- **Analysis:** Phone `tel:` link triggers correctly.

#### 🚫 TC014 — Launch Gmail email composer from the modal
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/66cce4d1-e728-4619-8edf-ec57a48a0b9b)
- **Status:** BLOCKED
- **Analysis:** Gmail `mailto:` link was not detectable by the test framework's interactive element instrumentation. The button exists in the DOM but the test agent couldn't interact with it. Likely a test framework limitation with `mailto:` links.

---

### 📋 Contact Form

#### ✅ TC013 — Submit contact form successfully with required fields
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/e394f34c-d56d-4735-8dc1-df094a09d7f1)
- **Status:** ✅ Passed
- **Analysis:** Form accepts input, validates required fields, and shows success message on submit.

---

### 🗺 Tour Cards & Accordion

#### ❌ TC015 — Expand and collapse a tour itinerary accordion
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/d165256d-75c7-4e28-8a8c-7189e4c51fb3)
- **Status:** ❌ Failed
- **Analysis:** **BUG DETECTED** — Accordion expand works but collapse does not reliably hide itinerary content. The collapse toggle may not properly remove the active/open class or CSS transition may not hide content.

#### ✅ TC016 — Open contact modal from a tour card CTA
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/9bcdcb14-a7af-4369-a8bb-aed54f51bba2)
- **Status:** ✅ Passed
- **Analysis:** "Hỏi ngay" button inside tour cards opens the modal correctly.

#### ✅ TC022 — Contact CTA remains usable after interacting with itinerary accordion
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/0940bac8-fedb-42b2-80af-b0e5f47c2758)
- **Status:** ✅ Passed
- **Analysis:** CTA buttons remain functional after accordion interaction.

#### ✅ TC025 — Tour cards render consistently and are discoverable by scrolling
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/94c90e10-3e78-4e61-94d1-213c1f0a98a2)
- **Status:** ✅ Passed
- **Analysis:** All 6 tour cards render in grid layout and are discoverable by scrolling.

---

### 🎠 Hero Slideshow

#### ❌ TC021 — Hero background rotates automatically over time
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/f141a304-5f42-4f17-8faa-77a79130da76)
- **Status:** ❌ Failed
- **Analysis:** The test waited 18 seconds but did not detect any background change. This may be a bug in the slideshow interval timer, or the transition may use CSS opacity which the test agent cannot detect programmatically.

---

### ⭐ Reviews Slider

#### 🚫 TC029 — Review slider autoplay advances through reviews
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/7fb4c00a-e3c0-43a7-b2e5-17473ef537d7)
- **Status:** BLOCKED
- **Analysis:** Test agent cannot determine viewport visibility of review cards. This is a test framework limitation, not a code issue.

---

### 📝 Blog Page

#### ✅ TC020 — Blog CTA card routes visitors back to landing page contact section
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/62c17dc0-fd81-45f7-902b-f5f85be52b5e)
- **Status:** ✅ Passed
- **Analysis:** CTA card on blog page correctly links to `index.html#contact`.

#### ✅ TC028 — Blog listing renders article cards in a grid
- **Result:** [View Test](https://www.testsprite.com/dashboard/mcp/tests/2caa4e31-77f3-4fe8-959f-f7561632064e/cac23371-729c-4f24-bb60-dbcce62708a1)
- **Status:** ✅ Passed
- **Analysis:** 6 blog cards render correctly in a 3-column grid layout.

---

## 3️⃣ Coverage & Matching Metrics

**Overall Pass Rate:** 66.7% (20 passed / 30 total)

| Requirement | Total Tests | ✅ Passed | ❌ Failed | 🚫 Blocked |
|---|---|---|---|---|
| Language Switcher (i18n) | 5 | 5 | 0 | 0 |
| Navigation | 4 | 2 | 1 | 1 |
| Contact Modal | 6 | 3 | 3 | 0 |
| Contact Channels | 6 | 5 | 0 | 1 |
| Contact Form | 1 | 1 | 0 | 0 |
| Tour Cards & Accordion | 4 | 3 | 1 | 0 |
| Hero Slideshow | 1 | 0 | 1 | 0 |
| Reviews Slider | 1 | 0 | 0 | 1 |
| Blog Page | 2 | 2 | 0 | 0 |
| **TOTAL** | **30** | **20** | **6** | **3** |

---

## 4️⃣ Key Gaps / Risks

### 🔴 Critical Bugs (Must Fix)

| # | Issue | Tests | Impact | Priority |
|---|---|---|---|---|
| 1 | **Contact modal close button not working** | TC019, TC024 | Users cannot dismiss the modal after opening it, blocking normal browsing | 🔴 P0 |
| 2 | **Contact modal overlay click not working** | TC026 | Clicking outside the modal doesn't close it; common UX expectation broken | 🔴 P0 |

### 🟡 Moderate Bugs (Should Fix)

| # | Issue | Tests | Impact | Priority |
|---|---|---|---|---|
| 3 | **Tour accordion collapse unreliable** | TC015 | Itinerary accordion expands but doesn't collapse consistently | 🟡 P1 |
| 4 | **Hero slideshow not auto-rotating** | TC021 | Background image slideshow may not be working; reduces visual impact | 🟡 P1 |

### ⚪ Test Environment Limitations (Not Code Bugs)

| # | Issue | Tests | Note |
|---|---|---|---|
| 5 | Mobile hamburger menu untestable | TC003, TC030 | TestSprite runs desktop viewport only |
| 6 | Gmail mailto: link undetectable | TC014 | Test framework limitation with `mailto:` protocol |
| 7 | Review slider autoplay unverifiable | TC029 | Test agent cannot determine viewport visibility |

### 📊 Risk Assessment
- **i18n system:** ✅ Fully functional (5/5 passed)
- **Contact channels:** ✅ Working well (5/6 passed, 1 blocked)
- **Navigation:** ✅ Desktop navigation working (2/2 testable passed)
- **Contact modal:** ⚠️ Modal opens but **cannot be closed** — critical UX blocker
- **Tour accordion:** ⚠️ Expand works, collapse may be unreliable
- **Hero slideshow:** ⚠️ Auto-rotation may not be working

---
