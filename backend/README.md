# ⚙️ KalaSutra AI — Backend

The FastAPI-based backend for **KalaSutra AI** — responsible for equation parsing, prompt engineering, and structured JSON inference via **Gemma 4 26B (MoE)** through the Google GenAI SDK.

---

## 🗂️ Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── __init__.py
│   │   └── generate.py       # POST /api/generate endpoint
│   ├── gemma/
│   │   ├── __init__.py
│   │   └── engine.py         # Gemma 4 26B inference + prompt engineering
│   ├── parser/
│   │   ├── __init__.py
│   │   └── equation.py       # SymPy-based equation parser
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── models.py         # Pydantic request/response schemas
│   └── main.py               # FastAPI app entry point + CORS middleware
├── .env                      # Environment variables (not committed)
├── requirements.txt          # Python dependencies
└── venv/                     # Virtual environment (not committed)
```

---

## ⚙️ Tech Stack

| Package | Version | Purpose |
|---|---|---|
| **Python** | 3.9+ | Core language |
| **FastAPI** | ≥0.115 | REST API framework with automatic OpenAPI docs |
| **Uvicorn** | ≥0.34 | ASGI server |
| **Pydantic** | v2 | Request/response validation + structured output schema |
| **google-genai** | ≥1.0 | Official Google GenAI Python SDK |
| **SymPy** | ≥1.13 | Symbolic math expression parsing |
| **python-dotenv** | ≥1.0 | `.env` file loading |

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.9** or higher
- A **Gemini/Gemma API Key** — [Get one free at Google AI Studio](https://aistudio.google.com/app/apikey)

### 1. Create & Activate a Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-3.5-flash
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

### 4. Start the Server

```bash
uvicorn app.main:app --reload
```

| Service | URL |
|---|---|
| REST API | `http://localhost:8000` |
| Swagger UI (interactive docs) | `http://localhost:8000/docs` |
| ReDoc | `http://localhost:8000/redoc` |

---

## 📡 API Reference

### `POST /api/generate`

The core endpoint — orchestrates the full pipeline:
**Equation → Parser → Gemma AI → Structured Response**

**Request Body**

```json
{
  "equation": "r = sin(8*theta)",
  "theme": "rangoli",
  "complexity": "medium",
  "language": "Hindi"
}
```

| Field | Type | Required | Options |
|---|---|---|---|
| `equation` | `string` | ✅ | Any math expression |
| `theme` | `string` | ✅ | `rangoli`, `mandala`, `kolam`, `alpana` |
| `complexity` | `string` | ❌ | `low`, `medium`, `high` (default: `medium`) |
| `language` | `string` | ❌ | `English`, `Hindi`, `Bengali`, `Tamil`, `Telugu` |

**Response Body (200 OK)**

```json
{
  "data": {
    "concept": "Polar Rose Curve",
    "symmetry": "8-fold",
    "difficulty": "Medium",
    "explanation": "...",
    "real_life_connection": "...",
    "quiz": [...],
    "rendering": {
      "canvas": { "width": 1000, "height": 1000, "background": "none" },
      "layers": [...],
      "pattern": "8-Petal Rose Rangoli"
    }
  }
}
```

---

### `GET /health`

Health check endpoint.

```json
{ "status": "ok" }
```

---

## 🧠 Core Modules

### `app/parser/equation.py`

Uses **SymPy** to safely parse mathematical expressions:
- Detects equation type: `polar` or `cartesian`
- Extracts free variables, trigonometric functions, and symmetry order
- Handles both `theta` and `θ` inputs
- Falls back gracefully on parse errors

### `app/gemma/engine.py`

The inference core — calls **Gemma 4 26B (MoE)** (`gemma-4-26b-a4b-it`):
- Reads `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) from the environment
- Uses `response_mime_type="application/json"` + `response_schema=GemmaTeachingResponse` for deterministic structured output
- Temperature set to `0.6` — balances creativity with consistency
- Includes a fallback response for development/debug if the API call fails

### `app/schemas/models.py`

All Pydantic v2 models:

| Model | Purpose |
|---|---|
| `GenerateRequest` | Validates incoming user request |
| `GemmaTeachingResponse` | Full structured response schema sent to Gemma |
| `GeometryInstructions` | Canvas + layer rendering instructions |
| `ShapeBase` + subtypes | Discriminated union: `CircleShape`, `PetalShape`, `DotsShape`, `SpiralShape`, `PolygonShape` |
| `QuizQuestion` | MCQ / short answer / fill-in-the-blank |
| `GenerateResponse` | Outer wrapper for the HTTP response |

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ | Your Google AI API key (used first if present) |
| `GOOGLE_API_KEY` | Optional | Fallback if `GEMINI_API_KEY` is not set |
| `GEMINI_MODEL` | Optional | Google GenAI model ID. Defaults to `gemini-3.5-flash` |

---

## 🧪 Testing the API

Once the server is running, open **Swagger UI** at `http://localhost:8000/docs` to interactively test the `/api/generate` endpoint — no frontend required.

Or use `curl`:

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "equation": "r = sin(8*theta)",
    "theme": "rangoli",
    "complexity": "medium",
    "language": "English"
  }'
```
