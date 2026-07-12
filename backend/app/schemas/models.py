from pydantic import BaseModel, Field
from typing import List, Optional, Union, Literal

class GenerateRequest(BaseModel):
    equation: str = Field(..., description="The mathematical equation to draw, e.g., 'r=sin(8*theta)'")
    theme: str = Field(..., description="The cultural theme, e.g., 'rangoli', 'mandala', 'kolam'")
    complexity: str = Field("medium", description="The complexity level: 'low', 'medium', 'high'")
    language: str = Field("English", description="The language for the AI teacher explanations")


class ParsedEquation(BaseModel):
    type: str
    expression: str
    variables: List[str]
    functions: List[str]
    symmetry: int

class CanvasOptions(BaseModel):
    width: int = Field(1000, description="Canvas width")
    height: int = Field(1000, description="Canvas height")
    background: str = Field("none", description="Background color")

class ShapeBase(BaseModel):
    type: Literal["circle", "petal", "dots", "spiral", "polygon"]
    stroke: Optional[str] = "black"
    stroke_width: Optional[float] = 1.0
    fill: Optional[str] = "none"
    rotation: Optional[float] = 0.0

class CircleShape(ShapeBase):
    type: Literal["circle"] = "circle"
    radius: float

class PetalShape(ShapeBase):
    type: Literal["petal"] = "petal"
    count: int = Field(..., description="Number of petals")
    radius: float = Field(..., description="Radius of the petal arrangement")
    rotation: Optional[float] = 0.0
    control_point_ratio: Optional[float] = Field(0.5, description="Ratio for bezier control point relative to radius")

class DotsShape(ShapeBase):
    type: Literal["dots"] = "dots"
    count: int
    radius: float = Field(..., description="Distance of dots from center")
    dot_radius: float = Field(2.0, description="Radius of each individual dot")

class SpiralShape(ShapeBase):
    type: Literal["spiral"] = "spiral"
    turns: float = Field(..., description="Number of turns")
    max_radius: float

class PolygonShape(ShapeBase):
    type: Literal["polygon"] = "polygon"
    sides: int
    radius: float

# Using discriminated union for shapes
Shape = Union[CircleShape, PetalShape, DotsShape, SpiralShape, PolygonShape]

class GeometryInstructions(BaseModel):
    canvas: CanvasOptions
    layers: List[Shape] = Field(..., description="List of geometric shapes to render, drawn back to front")
    pattern: str = Field(..., description="The name of the generated pattern")

class QuizQuestion(BaseModel):
    question: str = Field(..., description="The quiz question")
    options: Optional[List[str]] = Field(None, description="Provide 4 options if type is mcq")
    answer: str = Field(..., description="The correct answer")
    type: Literal["mcq", "short_answer", "fill_in_the_blank"]

class GemmaTeachingResponse(BaseModel):
    concept: str = Field(..., description="The core mathematical concept, e.g., 'Polar Equation'")
    symmetry: str = Field(..., description="Type of symmetry detected, e.g., '8-fold'")
    difficulty: str = Field(..., description="Estimated difficulty level")
    explanation: str = Field(..., description="Detailed AI Teacher explanation of the math behind the geometry")
    real_life_connection: str = Field(..., description="Where is this used in real life? Explain it like a story.")
    quiz: List[QuizQuestion]
    rendering: GeometryInstructions

class GenerateResponse(BaseModel):
    data: GemmaTeachingResponse
