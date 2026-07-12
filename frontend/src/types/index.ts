export interface GeometryInstructions {
  canvas: {
    width: number;
    height: number;
    background: string;
  };
  layers: any[];
  pattern: string;
}

export interface QuizQuestion {
  question: string;
  options: string[] | null;
  answer: string;
  type: "mcq" | "short_answer" | "fill_in_the_blank";
}

export interface GemmaTeachingResponse {
  concept: string;
  symmetry: string;
  difficulty: string;
  explanation: string;
  real_life_connection: string;
  quiz: QuizQuestion[];
  rendering: GeometryInstructions;
}

export interface GenerateResponse {
  data: GemmaTeachingResponse;
}
