from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.generate import router as generate_router

app = FastAPI(
    title="KalaSutra AI",
    description="API for converting mathematical equations into culturally inspired geometric artwork",
    version="1.0.0"
)

# CORS middleware for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate_router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok"}
