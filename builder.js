import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function callBuilder(task) {
  const spec = fs.readFileSync("./spec.txt", "utf8");

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash"
  });

  const prompt = `
YOU ARE A CODE GENERATOR.

ABSOLUTE RULES (NO EXCEPTIONS):
- Output ONLY raw JavaScript code
- NO explanations
- NO markdown
- NO backticks
- NO comments
- NO text before or after code
- Start output with: export
- If unsure, still output valid JavaScript

SPEC:
${spec}

TASK:
${JSON.stringify(task, null, 2)}

OUTPUT:
`;


  const result = await model.generateContent(prompt);
  const response = result.response.text();

  return { code: response };
}
