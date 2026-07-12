<div align="center">

# 🎨 KalaSutra AI

### *"Turning equations into understanding, not just art."*

**An AI-powered educational platform that transforms mathematical equations into animated Indian cultural geometry - with a built-in multilingual AI Teacher.**

[![Python](https://img.shields.io/badge/Python-3.9%2B-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Gemma](https://img.shields.io/badge/Gemma_4_26B_MoE-Google_AI-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/gemma)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[🚀 Live Demo](#) &nbsp;·&nbsp; [📓 Kaggle Writeup](#) &nbsp;·&nbsp; [🎬 Demo Video](#)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Sample Equations to Try](#-sample-equations-to-try)
- [The Problem](#-the-problem)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Local Setup](#-local-setup)
- [API Reference](#-api-reference)
- [How Gemma Powers KalaSutra](#-how-gemma-powers-kalasutra)
- [Why Gemma 4 26B MoE?](#-why-gemma-4-26b-moe)
- [Supported Languages](#-supported-languages)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔭 Overview

**KalaSutra AI** (from Sanskrit: *Kala* = Art, *Sutra* = Formula) is an interactive AI-powered learning platform that bridges abstract mathematics and India's rich geometric art traditions. Students type any mathematical equation, and the system responds with:

- An **animated SVG artwork** rendered as Rangoli, Mandala, Kolam, or Alpana
- A structured **AI Teacher explanation** of the underlying math — in 5 Indian languages
- Auto-generated **quiz questions** to reinforce understanding
- A **real-life connection** that contextualizes the concept

> Built for the **Google — Build with Gemma Kaggle Competition**.

---

## 🧪 Sample Equations to Try

Want to test it out quickly? Copy and paste these into the **KalaSutra Canvas** (Equation Editor):

| Equation | Expected Geometry / Pattern | Best Theme |
|---|---|---|
| `r = sin(8*theta)` | 8-petal Polar Rose (Classic 8-fold symmetry) | Rangoli |
| `r = cos(12*theta)` | 12-petal Polar Rose (Complex circular pattern) | Mandala |
| `r = theta` | Archimedean Spiral (Expanding spiral shape) | Kolam |
| `r = 1 + sin(theta)` | Cardioid (Heart-shaped curve) | Alpana |
| `r = sin(theta) * cos(theta)` | 4-petal flower shape | Rangoli |

*Pro-tip: Try changing the coefficient of `theta` (e.g., change `8` to `6` in `sin(8*theta)`) to see how the symmetry changes!*

---

## 🎯 The Problem

Mathematics is one of the most challenging subjects for students because most concepts remain abstract and inaccessible:

- **Static textbooks** fail to show how changing a parameter (e.g., `sin(4θ)` → `sin(8θ)`) changes the resulting geometry.
- **Language barriers** leave millions of regional-language students without quality visual math resources.
- **Cultural disconnect** — most global EdTech uses Western visual metaphors unfamiliar to Indian students.

KalaSutra AI addresses all three by making math **visual**, **interactive**, and **culturally familiar**.

### Target Users

| Segment | Description |
|---|---|
| **Primary** | Class 9–12 students, JEE / NEET aspirants, Engineering undergraduates |
| **Secondary** | Mathematics teachers, Coaching institutes, Parents |

---

## ⭐ Features

| # | Feature | Description |
|---|---|---|
| 1 | **Equation Interpreter** | Parses polar, parametric, and algebraic equations and extracts mathematical properties |
| 2 | **AI Teacher Panel** | Gemini explains *why* the shape looks the way it does in the student's own language |
| 3 | **Cultural Geometry Generator** | Renders equations as Rangoli, Mandala, Kolam, or Alpana artwork |
| 4 | **Parameter Playground** | Change any parameter and instantly see how symmetry evolves |
| 5 | **Animated SVG Canvas** | Framer Motion sequentially draws each geometric layer for a compelling visual effect |
| 6 | **Concept & Symmetry Extraction** | Auto-detects symmetry type (e.g., "8-fold") and difficulty level |
| 7 | **Real-Life Connections** | Contextualizes math — satellite dishes, manhole covers, clock gears |
| 8 | **AI Quiz Generator** | Generates 2 targeted MCQ / short-answer questions per equation |
| 9 | **Multilingual Support** | English, Hindi, Bengali, Tamil, Telugu |
| 10 | **SVG Export** | Download the generated artwork as a scalable vector SVG file |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                             │
│                                                                 │
│  ┌──────────────┐   ┌──────────────────┐   ┌───────────────┐  │
│  │  Equation    │   │  Animated SVG    │   │  AI Teacher   │  │
│  │  Editor      │   │  Canvas          │   │  Panel        │  │
│  │  (Left Pane) │   │  (Center Pane)   │   │  (Right Pane) │  │
│  └──────┬───────┘   └────────▲─────────┘   └───────▲───────┘  │
│         │                    │                       │          │
│         └────────────────────┴───────────────────────┘         │
│                    React 19 + Vite + TailwindCSS                │
└───────────────────────────────┬─────────────────────────────────┘
                                │  HTTP POST /api/generate
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       FASTAPI BACKEND                           │
│                                                                 │
│   ① Equation Parser   →   ② Gemma Engine    →   ③ Response    │
│      (SymPy / Regex)        (Structured JSON)      (Pydantic)  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │  google-genai SDK
                                ▼
                  ┌─────────────────────────────┐
                  │  Gemma 4 26B (MoE)           │
                  │  (structured JSON output)    │
                  └─────────────────────────────┘
```

### Request Flow

1. **Input** — User enters an equation (e.g., `r = sin(8θ)`), selects a theme and language.
2. **Parse** — The backend equation parser (SymPy) extracts type, variables, functions, and symmetry order.
3. **Reason** — The parsed data is sent to **Gemma 4 26B (MoE)** with a strict Pydantic schema enforcing structured JSON output.
4. **Respond** — Gemma returns a `GemmaTeachingResponse` containing the concept, explanation, quiz, and geometry rendering instructions.
5. **Render** — The React frontend populates the AI Teacher panel and animates the SVG canvas layer by layer.

---

## 🛠 Tech Stack

### Backend

| Technology | Version | Role |
|---|---|---|
| **Python** | 3.9+ | Core language |
| **FastAPI** | Latest | REST API framework |
| **Pydantic** | v2 | Request / response validation & structured output schema |
| **google-genai** | Latest | Official Google AI Python SDK |
| **Gemma 4 26B (MoE)** | `gemma-4-26b-a4b-it` | Primary LLM inference engine (Mixture-of-Experts) |
| **SymPy** | 1.13+ | Symbolic math parsing and equation analysis |
| **python-dotenv** | — | Environment variable management |
| **Uvicorn** | — | ASGI server |

### Frontend

| Technology | Version | Role |
|---|---|---|
| **React** | 19 | UI framework |
| **TypeScript** | 6.0 | Type safety |
| **Vite** | 8 | Build tooling & dev server |
| **TailwindCSS** | 3.4 | Utility-first styling |
| **Framer Motion** | 12 | SVG path draw animations |
| **Axios** | 1.18 | HTTP client |
| **Lucide React** | 1.24 | Icon library |

---

## 📁 Project Structure

```
KalaSutra AI/
├── README.md
│
├── backend/
│   ├── .env                        # Environment variables (GEMINI_API_KEY)
│   └── app/
│       ├── main.py                 # FastAPI app entry point + CORS setup
│       ├── api/
│       │   └── generate.py         # POST /api/generate endpoint
│       ├── gemma/
│       │   └── engine.py           # Gemini API call & prompt engineering
│       ├── parser/
│       │   └── equation.py         # Equation parsing logic
│       └── schemas/
│           └── models.py           # Pydantic models (request / response schemas)
│
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
        ├── App.tsx                 # Root component, state, API calls
        ├── types/                  # TypeScript type definitions
        └── components/
            ├── EquationEditor.tsx  # Left pane — equation input form
            ├── Preview.tsx         # Center pane — animated SVG canvas
            └── AITeacherPanel.tsx  # Right pane — explanations, quiz, symmetry
```

---

## 💻 Local Setup

### Prerequisites

- **Python** 3.9 or higher
- **Node.js** 18 or higher
- A **Gemini API Key** → [Get one free at Google AI Studio](https://aistudio.google.com/app/apikey)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/kalasutra-ai.git
cd kalasutra-ai
```

---

### 2. Backend Setup

```bash
cd backend
```

Create and activate a virtual environment:

```bash
# Create venv
python -m venv venv

# Activate — Windows
venv\Scripts\activate

# Activate — Mac / Linux
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

Start the development server:

```bash
uvicorn app.main:app --reload
```

| Service | URL |
|---|---|
| REST API | `http://localhost:8000` |
| Swagger UI (interactive docs) | `http://localhost:8000/docs` |

---

### 3. Frontend Setup

Open a **new terminal**, then:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at **`http://localhost:5173`**

---

## 📡 API Reference

### `POST /api/generate`

Generates teaching materials and rendering instructions for a given mathematical equation.

**Request Body**

```json
{
  "equation": "r = sin(8*theta)",
  "theme": "rangoli",
  "complexity": "medium",
  "language": "English"
}
```

| Field | Type | Required | Options | Default |
|---|---|---|---|---|
| `equation` | `string` | ✅ | Any math expression | — |
| `theme` | `string` | ✅ | `rangoli`, `mandala`, `kolam`, `alpana` | — |
| `complexity` | `string` | ❌ | `low`, `medium`, `high` | `medium` |
| `language` | `string` | ❌ | See [Supported Languages](#-supported-languages) | `English` |

**Response Body (200 OK)**

```json
{
  "data": {
    "concept": "Polar Rose Curve",
    "symmetry": "8-fold",
    "difficulty": "Medium",
    "explanation": "The number 8 in sin(8θ) creates 8 petals evenly distributed around the origin.",
    "real_life_connection": "Used in antenna design to produce directional signal patterns.",
    "quiz": [
      {
        "question": "What determines the number of petals in r = sin(nθ)?",
        "type": "mcq",
        "options": ["The coefficient n of θ", "The amplitude", "The frequency", "The phase"],
        "answer": "The coefficient n of θ"
      },
      {
        "question": "What symmetry does r = sin(8θ) exhibit?",
        "type": "short_answer",
        "options": null,
        "answer": "8-fold rotational symmetry"
      }
    ],
    "rendering": {
      "canvas": { "width": 1000, "height": 1000, "background": "none" },
      "layers": [
        { "type": "circle", "radius": 220, "stroke": "#e0e7ff", "fill": "none", "stroke_width": 1 },
        { "type": "petal", "count": 8, "radius": 200, "stroke": "#6366f1", "fill": "#e0e7ff", "stroke_width": 1.5 },
        { "type": "dots", "count": 8, "radius": 200, "dot_radius": 5, "stroke": "#4f46e5", "fill": "#4f46e5" }
      ],
      "pattern": "8-Petal Rose Rangoli"
    }
  }
}
```

---

### `GET /health`

Returns server health status.

```json
{ "status": "ok" }
```

---

## 🧠 How Gemma Powers KalaSutra

**Gemma 4 26B (MoE)** (`gemma-4-26b-a4b-it`) is not merely generating SVG strings — it is the **reasoning core** of the entire application.

We use **Structured JSON Output** with a strict Pydantic schema (`GemmaTeachingResponse`) to enforce deterministic, parseable responses on every call.

Gemma simultaneously fulfils five roles:

| Role | What Gemma Does |
|---|---|
| **Mathematician** | Identifies equation type, symmetry order, and difficulty level |
| **Multilingual Teacher** | Explains the math in the student's chosen language (up to 40 words, clear and targeted) |
| **Storyteller** | Generates a real-life analogy to make the concept instantly relatable |
| **Quiz Creator** | Produces relevant MCQ and short-answer questions from the concept |
| **Geometry Architect** | Outputs abstract rendering instructions (layers of shapes) for the React canvas to animate |

This design separates **reasoning** (Gemma) from **rendering** (React/SVG), keeping the system modular, testable, and language-agnostic.

---

## 🎯 Why Gemma 4 26B MoE?

We evaluated multiple Gemma variants and chose **Gemma 4 26B (MoE)** (`gemma-4-26b-a4b-it`) for the following reasons:

| Factor | Why Gemma 4 26B MoE Fits |
|---|---|
| **Structured JSON Output** | Supports `response_schema` via the Google GenAI SDK, enabling deterministic Pydantic-validated responses — critical for our multi-role output (explanation + quiz + rendering instructions in a single call). |
| **Multilingual Strength** | Strong performance across Hindi, Bengali, Tamil, and Telugu — essential for our target audience of 280M+ regional-language students in India. |
| **MoE Efficiency** | The Mixture-of-Experts architecture activates only 4B of 26B parameters per token, delivering fast inference suitable for an interactive educational tool where students expect real-time feedback. |
| **Math Reasoning** | Sufficient reasoning capability to analyse polar/parametric equations, extract symmetry properties, and generate pedagogically accurate explanations and quiz questions. |
| **Instruction-Tuned** | The `-it` variant follows complex multi-constraint prompts reliably (e.g., "explain in ≤40 words in Tamil while also producing geometry layer instructions"). |

### Why Not Other Variants?

| Variant | Reason for Not Choosing |
|---|---|
| Gemma 2B/4B | Insufficient reasoning depth for math concept extraction + quiz generation + geometry instructions in a single structured call. |
| Gemma 27B Dense | Higher latency per token vs. the 26B MoE variant, with no significant quality gain for our structured-output use case. |
| Gemma 31B Dense | Overkill for this use case; the MoE variant offers better latency/quality tradeoff for interactive educational applications. |

---

## 🌏 Supported Languages

| Language | Native Script | Code |
|---|---|---|
| English | English | `English` |
| Hindi | हिंदी | `Hindi` |
| Bengali | বাংলা | `Bengali` |
| Tamil | தமிழ் | `Tamil` |
| Telugu | తెలుగు | `Telugu` |

---

## 🤝 Contributing

Contributions are welcome and appreciated! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request with a clear description of your changes

Please ensure your code is properly formatted and any new API behaviour is reflected in this README before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ for the **Google — Build with Gemma Kaggle Competition**

*Powered by Gemma 4 26B (MoE) — Bridging Mathematics and Culture, one equation at a time.*

</div>
