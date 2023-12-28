export type message = {
  role: "user" | "model" | "think";
  parts: [
    {
      text: string;
    }
  ];
};
