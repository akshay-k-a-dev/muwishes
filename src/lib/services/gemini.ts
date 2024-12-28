import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function generateFestiveMessage(senderName: string, recipientName: string, relationship: string): Promise<string> {
  const prompt = `Write a short, warm Christmas(2024) and New Year(2025) message (maximum 2-3 sentences) from ${senderName} 
    to their ${relationship} named ${recipientName}. Keep it personal but concise. Include both holiday wishes 
    and a personal touch about their relationship.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}