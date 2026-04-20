import { GoogleGenerativeAI } from "@google/generative-ai";

(async () => {
  try {
    const apiKey = "AIzaSyCauWh8p_tSssMcKYEHyZ5iZKPdDr6rByM";
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await res.json();
    console.log("Models:", data.models.map(m => m.name));
  } catch (error) {
    console.error("TEST FAILED:", error);
  }
})();
