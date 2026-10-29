# A1-MART — Enterprise Retail ERP System (React Migration & Redesign)

A modern, production-grade React application migrated from the legacy HTML/CSS/JavaScript codebase. Redesigned with a premium, clean aesthetic inspired by the modern **Shoplay** design language.

---

## 🚀 Key Highlights & Architectural Improvements

- **Framework & Tooling**: Migrated to **React 18** with **Vite 6** for instant hot module reloading and fast production builds.
- **Design System**: Shoplay-inspired UI tokens:
  - Soft neutral background (`#F6F5FA`)
  - Elevated white cards with soft borders (`#EBE9F1`) and generous rounded corners (`18px–22px`)
  - Refined A1-MART purple accent (`#7950F2`) with smooth hover interactions (`#6840DC`)
  - Shoplay KPI Stat Cards featuring diagonal directional arrows (`↗`) and percentage trend pill badges (`+2.3% ↑`, `-12.0% ↓`)
  - Hero Welcome Banner with vibrant purple gradient, white CTA pill, and custom SVG retail graphics
  - Consistent icon set via `lucide-react`
- **Data & Workflow Preservation**:
  - All **63+ enterprise modules and subroutes** preserved (Accounts, Attendance, Payroll, Stock Checker, Price Checker, Logistics Transport, Master Data, Sales Targets, Checklist, Materials, and Approvals).
  - Complete Task Management System with React state CRUD (Create, Read, Update, Delete).
  - Preserved demographic, biometric attendance calendar, and multi-branch revenue doughnut charts via Chart.js.
  - Search command palette (`Ctrl+K` / `⌘K`) for instant keyboard navigation across all modules.
  - CSV export capabilities for Price Checker, Transports, and Records.
- **Responsiveness**: Fully responsive layout adapting across mobile, tablet, laptop, and ultra-wide desktop monitors with a slide-out drawer navigation on mobile.

---

## 🛠️ Project Structure

```
A1MART_FINAL_VERSION/
├── src/
│   ├── assets/              # Icons and visual assets
│   ├── components/
│   │   ├── common/          # StatCard, HeroBanner, DataTable, Modal, Toast, SearchModal
│   │   ├── layout/          # Sidebar, Topbar
│   │   └── pages/           # AccountsDashboard, EmployeeDashboard, PayrollDashboard,
│   │                        # AttendanceDashboard, TasksPage, PriceCheckerPage,
│   │                        # TransportPage, SettingsPage, GenericWorkflowPage
│   ├── context/             # AppContext (Navigation, Modal, Toast, Theme, Tasks State)
│   ├── data/                # navigation.js, mockData.js, htmlPagesData.js
│   ├── styles/              # index.css (Shoplay tokens, animations, responsive rules)
│   ├── App.jsx              # Application router & layout orchestration
│   └── main.jsx             # React DOM entry point
├── legacy/                  # Preserved original HTML/CSS/JS backup files
├── dist/                    # Optimized production build artifacts
├── vite.config.js           # Vite build configuration
└── package.json             # React 18, Vite 6, Chart.js, Lucide
```

---

## ⚡ How to Run Locally

### 🪟 Windows (1-Click Run)
Simply double-click:
```
START_ON_WINDOWS.bat
```
*(Automatically checks for Node.js, runs `npm install` on first launch, and opens `http://localhost:3000` in your default browser).*

---

### 🍎 macOS (1-Click Run)
Simply double-click:
```
START_ON_MAC.command
```
*(If prompted by macOS Gatekeeper on first open: Right-click -> Open).*

---

### 💻 Standard Terminal (Windows / Mac / Linux)

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 3. Build for Production
```bash
npm run build
```

#### 4. Preview Production Build
```bash
npm run preview
```

