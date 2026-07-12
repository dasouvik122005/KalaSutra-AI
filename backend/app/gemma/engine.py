import json
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from app.schemas.models import GemmaTeachingResponse

load_dotenv()

DEFAULT_MODEL_ID = "gemini-3.5-flash"


def generate_teaching_materials(
    equation_data: dict,
    theme: str,
    complexity: str,
    language: str,
) -> GemmaTeachingResponse:
    """
    Calls the Google GenAI SDK to act as an AI Teacher and generate structured
    teaching materials with geometry rendering instructions.
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
- explanation: under 40 words in {language} - how equation parameters affect the geometry
- real_life_connection: under 25 words in {language}
- quiz: exactly 2 questions (mix of mcq and short_answer)
- rendering: canvas (1000x1000, background "none") + max 3 layers of shapes (circle/petal/dots/polygon/spiral), counts <= 12"""

    # Keep this configurable because Google retires older model IDs over time.
    model_id = os.getenv("GEMINI_MODEL") or os.getenv("GOOGLE_GENAI_MODEL") or DEFAULT_MODEL_ID

    try:
        response = _generate_content(client, model_id, prompt)
        result_dict = json.loads(response.text)
        return GemmaTeachingResponse(**result_dict)
    except Exception as e:
        if _is_model_not_found_error(e) and model_id != DEFAULT_MODEL_ID:
            try:
                response = _generate_content(client, DEFAULT_MODEL_ID, prompt)
                result_dict = json.loads(response.text)
                return GemmaTeachingResponse(**result_dict)
            except Exception as fallback_error:
                e = fallback_error

        print(f"Error calling Google GenAI model {model_id}: {e}")
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
                "pattern": "Fallback",
            },
        )


def _generate_content(client: genai.Client, model_id: str, prompt: str):
    return client.models.generate_content(
        model=model_id,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=GemmaTeachingResponse,
            temperature=0.6,
        ),
    )


def _is_model_not_found_error(error: Exception) -> bool:
    error_text = str(error)
    return "404" in error_text and "NOT_FOUND" in error_text
