# 🎨 KalaSutra AI — Frontend

The React-based user interface for **KalaSutra AI** — an interactive educational platform that animates mathematical equations as Indian cultural geometry (Rangoli, Mandala, Kolam, Alpana) with a multilingual AI Teacher powered by Gemma.

---

## 🗂️ Project Structure

```
frontend/
├── public/
│   ├── logo.png              # Full KalaSutra logo (used in header & README)
│   └── favicon.png           # Icon-only logo (used as browser tab favicon)
├── src/
│   ├── components/
│   │   ├── EquationEditor.tsx   # Left pane — equation input, theme, language selector
│   │   ├── Preview.tsx          # Centre pane — animated SVG canvas renderer
│   │   └── AITeacherPanel.tsx   # Right pane — concept, explanation, quiz
│   ├── types/
│   │   └── index.ts             # Shared TypeScript type definitions
│   ├── App.tsx                  # Root component — layout, state, API calls
│   ├── main.tsx                 # Vite entry point
│   ├── index.css                # Tailwind base + Inter font
│   └── App.css                  # Reserved for component-level overrides
├── index.html                   # HTML entry point with SEO meta tags
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Tech Stack

| Package | Version | Purpose |
|---|---|---|
| **React** | 19 | UI framework |
| **TypeScript** | 6.0 | Type safety across all components |
| **Vite** | 8 | Dev server and production bundler |
| **TailwindCSS** | 3.4 | Utility-first styling |
| **Framer Motion** | 12 | Animated SVG path drawing |
| **Axios** | 1.18 | HTTP client for backend API calls |
| **Lucide React** | 1.24 | Icon library |
| **Inter (Google Fonts)** | — | Typography |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- The **backend server** must be running at `http://localhost:8000`

### Install & Run

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **`http://localhost:5173`**

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| Dev server | `npm run dev` | Start Vite dev server with HMR |
| Production build | `npm run build` | Type-check + bundle for production |
| Lint | `npm run lint` | Run oxlint code quality checks |
| Preview build | `npm run preview` | Preview the production build locally |

---

## 🖼️ Component Overview

### `EquationEditor.tsx`
The **left pane** — accepts user input:
- Mathematical equation (e.g. `r = sin(8*theta)`)
- Cultural theme: **Rangoli / Mandala / Kolam / Alpana**
- Complexity: **Low / Medium / High**
- Language: **English / Hindi / Bengali / Tamil / Telugu**

### `Preview.tsx`
The **centre pane** — the animated SVG canvas:
- Renders geometry instructions from the Gemma AI response
- Supports shape types: `circle`, `petal`, `dots`, `polygon`, `spiral`
- Each layer animates sequentially using **Framer Motion** path drawing
- Includes an SVG **export / download** button

### `AITeacherPanel.tsx`
The **right pane** — the AI Teacher output:
- Displays `concept`, `symmetry`, `difficulty` from Gemma
- Shows the multilingual **Concept Explanation**
- Shows the **Real-Life Connection** analogy
- Renders an interactive **Knowledge Check Quiz** (MCQ + short answer)

---

## 🔗 API Integration

The frontend communicates with the FastAPI backend via a single endpoint:

```
POST http://localhost:8000/api/generate
```

**Request body:**
```json
{
  "equation": "r = sin(8*theta)",
  "theme": "rangoli",
  "complexity": "medium",
  "language": "Hindi"
}
```

**Response:** A `GemmaTeachingResponse` object with `concept`, `symmetry`, `difficulty`, `explanation`, `real_life_connection`, `quiz`, and `rendering` fields.

See the root [`README.md`](../README.md) for the full API reference.

---

## 🌐 Environment

The backend URL is currently hardcoded to `http://localhost:8000` inside `App.tsx`. To point to a deployed backend, update the Axios call:

```ts
// App.tsx
const res = await axios.post<GenerateResponse>('https://your-backend-url.com/api/generate', ...);
```

---

## 📐 Supported Equation Formats

| Format | Example |
|---|---|
| Polar | `r = sin(8*theta)` |
| Polar (Cardioid) | `r = 1 + sin(theta)` |
| Spiral | `r = theta` |
| Parametric-style polar | `r = sin(theta) * cos(theta)` |

> **Tip:** Use `theta` or `θ` interchangeably. The backend normalises both.
