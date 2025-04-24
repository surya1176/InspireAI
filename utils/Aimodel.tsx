import { ConsoleLogWriter } from "drizzle-orm";

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY });

// Add async keyword to the function declaration
export const generateImage = async (prompt: string) => {
  try {
    // Generate content with the AI model
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: prompt,
      config: {
        responseModalities: ["Image","Text"],
      },
    });

    // Ensure the response structure is correct before processing
    if (response && response.candidates && response.candidates[0]?.content?.parts) {
      // Loop through the response parts to handle text or image data
      for (const part of response.candidates[0].content.parts) {
        console.log(part)
        if (part.text) {
          console.log("Text content:", part.text); // Log text content
        } else if (part.inlineData) {
          const imageData = part.inlineData.data;
          return imageData;
        }
      }
    } else {
      console.error("Unexpected response structure:", response);
    }
  } catch (error) {
    console.error("Error generating content:", error);
  }
};

generateImage("generate image of trump win elections")