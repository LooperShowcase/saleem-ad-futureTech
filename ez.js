let ConversationHistory;
ConversationHistory = [
  {
    role: "system",
    content:
      "I will always give you how happy am i out of 10 but you use this number only when it is relevant",
  },
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi,how can I help you today" },
];
async function ConversationUserAdd(question, happiness) {
  ConversationHistory.push({
    role: "user",
    content:
      "My Happiness out of 10: " +
      happiness +
      " . " +
      "My input is: " +
      question,
  });
}

async function ConversationAssistantAdd(answer) {
  ConversationHistory.push({ role: "assistant", content: answer });
}
async function GPT_talk(question) {
  var data = {
    model: "gpt-3.5-turbo",
    messages: ConversationHistory,
  };
  var url = "https://api.openai.com/v1/chat/completions";
  var apikey1 = "sk-jewzlrJimdKCWoNC";
  var apikey2 = "x6CUT3BlbkFJ7rh";
  var apikey3 = "AWckdyi3eQRL4AA4w";
  var apiKey = apikey1 + apikey2 + apikey3;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;

      ConversationAssistantAdd(message); // Add GPT's response to the conversation history

      const utterance = new SpeechSynthesisUtterance(message); // Create the audio object
      speechSynthesis.speak(utterance); // Play the audio
      return message;
    } else {
      console.log("Request failed with status:", response.status);
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
}
