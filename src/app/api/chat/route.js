export async function POST(req) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Graceful fallback for demo/testing when API key is not configured
      return Response.json({
        response: "Hello there! I am Marty, your TechMart AI assistant. I'm currently running in **offline demo mode** because the `GEMINI_API_KEY` is not configured in the backend `.env` file. \n\nTo enable the live AI chatbot, please add your key to `.env`:\n```env\nGEMINI_API_KEY=your_actual_key\n```\nHow can I help you browse our products today?"
      });
    }

    // Format message history for the Gemini API
    // Frontend structure: { role: 'user' | 'assistant', content: string }
    // Gemini structure: { role: 'user' | 'model', parts: [{ text: string }] }
    const contents = (messages || []).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // If empty messages array is passed, seed it with a default
    if (contents.length === 0) {
      contents.push({
        role: "user",
        parts: [{ text: "Hello" }],
      });
    }

    // Call Google Gemini 2.5 Flash API using native fetch
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Request Failed:", errorText);
      return Response.json(
        {
          response: `Gemini API returned an error status: ${response.status}. Please check your API key and connection.`,
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    const botResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I received your message, but I was unable to generate a text response. Please try again.";

    return Response.json({ response: botResponse });
  } catch (error) {
    console.error("Error in api/chat route handler:", error);
    return Response.json(
      { response: "Oops! An internal server error occurred while processing your chat request." },
      { status: 500 }
    );
  }
}
