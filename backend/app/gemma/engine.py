import os
import json
from google import genai
from google.genai import types
from app.schemas.models import GemmaTeachingResponse
from dotenv import load_dotenv

load_dotenv()
# Need to ensure the API key is set in the environment
# os.environ["GEMINI_API_KEY"] = "your-api-key"

def generate_teaching_materials(equation_data: dict, theme: str, complexity: str, language: str) -> GemmaTeachingResponse:
    """
    Calls the Gemini model to act as an AI Teacher and generate structured teaching materials.
    Uses gemini-2.0-flash-lite for low latency.
    """
    client = genai.Client() # Uses GEMINI_API_KEY from environment
    
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
- rendering: canvas (1000x1000, background "none") + max 3 layers of shapes (circle/petal/dots/polygon), counts <= 12"""
    
    # gemini-2.5-flash: generous free tier quota with fast structured output
    model_id = "gemini-2.5-flash"
    
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
        print(f"Error calling LLM: {e}")
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
