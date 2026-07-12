from fastapi import APIRouter, HTTPException
from app.schemas.models import GenerateRequest, GenerateResponse
from app.parser.equation import parse_equation
from app.gemma.engine import generate_teaching_materials

router = APIRouter()

@router.post("/generate", response_model=GenerateResponse)
async def generate_artwork(request: GenerateRequest):
    """
    Main endpoint that orchestrates the flow:
    Equation -> Parser -> Gemma AI Teacher -> Response
    """
    # 1. Parse the equation
    parsed_eq = parse_equation(request.equation)
    
    # 2. Call Gemma reasoning engine (AI Teacher)
    try:
        teaching_materials_json = generate_teaching_materials(
            parsed_eq, 
            request.theme, 
            request.complexity, 
            request.language
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM Generation failed: {str(e)}")
        
    return GenerateResponse(data=teaching_materials_json)
