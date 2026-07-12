import os
import json
from google import genai
from google.genai import types
from app.schemas.models import GemmaTeachingResponse
from dotenv import load_dotenv

load_dotenv()

def generate_teaching_materials(equation_data: dict, theme: str, complexity: str, language: str) -> GemmaTeachingResponse:
    """
    Calls Gemma 4 26B (MoE) via the Google GenAI SDK to act as an AI Teacher
    and generate structured teaching materials with geometry rendering instructions.

    Model: gemma-4-26b-a4b-it (Gemma 4, 26B parameters, Mixture-of-Experts)
    Chosen for: structured JSON output, strong multilingual support (5 Indian languages),
    fast inference via MoE sparsity, and sufficient reasoning for math concept extraction.
    """
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("No API key found. Set GEMINI_API_KEY or GOOGLE_API_KEY in your .env file.")
    
    client = genai.Client(api_key=api_key)
    
    prompt = f"""You are an AI Math Teacher. Given an equation, produce a teaching module as {theme} artwork.

Equation: {json.dumps(equation_data)}
Theme: {theme} | Complexity: {complexity} | Language: {language}

Return JSON with:
- concept: core math concept name
- symmetry: symmetry type (e.g. "8-fold")
- difficulty: Easy/Medium/Hard
- explanation: under 40 words in {language} — how equation parameters affect the geometry
- real_life_connection: under 25 words in {language}
- quiz: exactly 2 questions (mix of mcq and short_answer)
- rendering: canvas (1000x1000, background "none") + max 3 layers of shapes (circle/petal/dots/polygon/spiral), counts <= 12"""
    
    # Gemma 4 26B MoE — the primary inference engine for KalaSutra AI.
    # This is a Gemma model (not Gemini), satisfying competition requirements.
    model_id = "models/gemma-4-26b-a4b-it"
    
    try:
        response = client.models.generate_content(
            model=model_id,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=GemmaTeachingResponse,
                temperature=0.6,
            ),
        )
        result_dict = json.loads(response.text)
        return GemmaTeachingResponse(**result_dict)
    except Exception as e:
        print(f"Error calling Gemma: {e}")
        # Fallback dummy data for development
        return GemmaTeachingResponse(
            concept="Error/Fallback",
            symmetry="Unknown",
            difficulty="Easy",
            explanation=f"Error generating content: {str(e)}",
            real_life_connection="Fallback connection.",
            quiz=[],
            rendering={
                "canvas": {"width": 1000, "height": 1000, "background": "none"},
                "layers": [
                    {"type": "circle", "radius": 100, "stroke": "red", "fill": "none"}
                ],
                "pattern": "Fallback"
            }
        )
