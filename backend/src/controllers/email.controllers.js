import axios from 'axios';

export const fixGrammar = async (req, res) => {
  const { sector, subject, message, name } = req.body;

  //Input validation
  if (!subject || !message || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Prompt for the AI model
  const prompt = `
    You're a professional email assistant.
    Based on the following context:

    Sector: ${sector}
    Subject: ${subject}
    User Message: ${message}
    Sender Name: ${name}

    Generate a complete professional email. Expand and correct the message with proper grammar, tone, and relevant content for this subject.
      `;

  const payload = {
    model: "llama3-70b-8192",
    messages: [
      { role: 'system', content: 'You are a professional email writer.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.4
  };

  try {
      const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

     // ✅ Groq uses message.content, not choices[0].text
    const enhanced = response.data.choices?.[0]?.message?.content?.trim();

    if (!enhanced) {
      return res.status(500).json({ message: 'AI did not return a valid response.' });
    }


    res.json({ enhancedEmail: enhanced });

  } catch (err) {
    console.error("❌ AI Enhancement Error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to enhance email" });
  }
};
