require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5000;

console.log("Serverless function initializing...");

app.use(cors());
app.use(express.json());

// Initialize Gemini API
console.log("Initializing GoogleGenerativeAI...");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("GoogleGenerativeAI initialized.");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"}); // Using gemini-2.5-flash for text generation

app.get('/', (req, res) => {
  res.send('AI Tutor Backend is running!');
});

app.post('/api/teach', async (req, res) => {
  console.log("Received request for /api/teach");
  const { query, context } = req.body;

  if (!query) {
    return res.status(400).json({ success: false, message: 'Query is required.' });
  }

  try {
    // Stage 1: Extract key information from the user's query
    const infoPrompt = `Analyze the following user query and extract the subject, grade/level, location/school board (if mentioned), and any prerequisite knowledge. Respond in a JSON format like:
    {
      "subject": "Math",
      "grade": "8th Grade",
      "location": "Ontario Curriculum",
      "prerequisites": "Basic algebra"
    }
    If a piece of information is not explicitly mentioned, use "N/A".

    User Query: "${query}"`;

    const infoResult = await model.generateContent(infoPrompt);
    const infoResponse = await infoResult.response;
    const infoResponseText = infoResponse.text();
    const extractedInfoMatch = infoResponseText.match(/```json\n([\s\S]*?)\n```/);
    let extractedInfo;
    if (extractedInfoMatch && extractedInfoMatch[1]) {
      try {
        extractedInfo = JSON.parse(extractedInfoMatch[1]);
      } catch (parseError) {
        console.error("Failed to parse extracted info as JSON (after markdown strip):", extractedInfoMatch[1]);
        extractedInfo = { subject: "N/A", grade: "N/A", location: "N/A", prerequisites: "N/A" };
      }
    } else {
      console.error("Could not find JSON markdown block for extracted info:", infoResponseText);
      extractedInfo = { subject: "N/A", grade: "N/A", location: "N/A", prerequisites: "N/A" };
    }

    // Merge with provided context, if any
    const finalContext = { ...extractedInfo, ...context };

    // Stage 2: Generate the teaching plan
    const teachingPrompt = `Based on the following information, create a step-by-step teaching plan with examples.
    Subject: ${finalContext.subject}
    Grade/Level: ${finalContext.grade}
    Location/School Board: ${finalContext.location}
    Prerequisites: ${finalContext.prerequisites}
    User Query: "${query}"

    For Math/Science, focus on logical steps and problem-solving. For Geography/History/Languages, emphasize memorization techniques and contextual understanding.

    Respond in a JSON format like:
    {
      "title": "Learning [Concept]",
      "steps": [
        {
          "stepNumber": 1,
          "description": "Step 1 description",
          "details": "Detailed explanation for step 1.",
          "example": "Example for step 1."
        },
        {
          "stepNumber": 2,
          "description": "Step 2 description",
          "details": "Detailed explanation for step 2.",
          "example": "Example for step 2."
        }
      ],
      "summary": "A brief summary of the plan."
    }
    `;

    const planResult = await model.generateContent(teachingPrompt);
    const planResponse = await planResult.response;
    const generatedPlanText = planResponse.text();
    const generatedPlanMatch = generatedPlanText.match(/```json\n([\s\S]*?)\n```/);
    let generatedPlan;
    if (generatedPlanMatch && generatedPlanMatch[1]) {
      try {
        generatedPlan = JSON.parse(generatedPlanMatch[1]);
      } catch (parseError) {
        console.error("Failed to parse generated plan as JSON (after markdown strip):", generatedPlanMatch[1]);
        return res.status(500).json({ success: false, message: 'Failed to generate a valid teaching plan format.' });
      }
    } else {
      console.error("Could not find JSON markdown block for generated plan:", generatedPlanText);
      return res.status(500).json({ success: false, message: 'Failed to generate a valid teaching plan format.' });
    }

    res.json({
      success: true,
      plan: {
        ...generatedPlan,
        subject: finalContext.subject,
        grade: finalContext.grade
      },
      message: "Teaching plan generated successfully."
    });

  } catch (error) {
    console.error('--- DETAILED ERROR ---');
    console.error('Error generating teaching plan:', error);
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    console.error('--- END DETAILED ERROR ---');
    res.status(500).json({ success: false, message: 'Failed to generate teaching plan.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;