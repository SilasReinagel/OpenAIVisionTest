// @ts-check
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

export const explainImageAtUrl = async (imgUrl) => {
  const response = await openai.chat.completions.create({
    max_tokens: 1092,
    model: "gpt-4-vision-preview",
    messages: [
      { role: "system", content: "You are an Senior Technical Artist with skills in photography and digital art. You are proficient at creating technical descriptions for the artists on your team."},
      {
        role: "user",
        content: [
          { type: "text", text: "Explain in great detail what you see in this image." },
          {
            type: "image_url",
            image_url: {
              "url": imgUrl,
            },
          },
        ],
      },
    ],
  });
  return response.choices[0].message.content;
}

export default explainImageAtUrl;
