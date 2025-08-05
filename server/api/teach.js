const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post('/teach', async (req, res) => {
  const { query, context } = req.body;
  if (!query) return res.status(400).json({ success: false, message: 'Query is required.' });

  try {
    const infoPrompt = `Analyze the following user query...`;
    const infoResult = await model.generateContent(infoPrompt);
    const infoText = infoResult.response.text();
    const match = infoText.match(/```json\n([\s\S]*?)\n```/);
    const extractedInfo = match ? JSON.parse(match[1]) : {};

    const finalContext = { ...extractedInfo, ...context };

    const teachingPrompt = `Based on the following information...`;
    const planResult = await model.generateContent(teachingPrompt);
    const planText = planResult.response.text();
    const planMatch = planText.match(/```json\n([\s\S]*?)\n```/);
    const generatedPlan = planMatch ? JSON.parse(planMatch[1]) : null;

    if (!generatedPlan) throw new Error('Plan generation failed');

    res.json({
      success: true,
      plan: {
        ...generatedPlan,
        subject: finalContext.subject,
        grade: finalContext.grade
      },
      message: "Teaching plan generated successfully."
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 👇 Export as Vercel handler
module.exports = app;
