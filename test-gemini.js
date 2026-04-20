import { GoogleGenerativeAI } from "@google/generative-ai";

(async () => {
  try {
    const apiKey = "AIzaSyCauWh8p_tSssMcKYEHyZ5iZKPdDr6rByM";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    console.log("Testing Gemini API...");
    const result = await model.generateContent("Hello, test");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.error("TEST FAILED:", error);
  }
})();
