export type message = {
  role: "user" | "model" | "think";
  parts: [
    {
      text: string;
    }
  ];
};

type Part = {
  text: string;
};

export type Content = {
  role: "user" | "model";
  parts: Part[];
};

type SafetyRating = {
  category:
    | "HARM_CATEGORY_SEXUALLY_EXPLICIT"
    | "HARM_CATEGORY_HATE_SPEECH"
    | "HARM_CATEGORY_HARASSMENT"
    | "HARM_CATEGORY_DANGEROUS_CONTENT";
  probability: "NEGLIGIBLE";
};

type Candidate = {
  content: Content;
  finishReason: String;
  index: number;
  safetyRatings: SafetyRating[];
};

type UsageMetadata = {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
};

export type Message = {
  candidates?: Candidate[];
  contents: Content[];
  usageMetadata?: UsageMetadata;
  generationConfig?: any;
  safetySettings?: any;
};
