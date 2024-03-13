// @ts-check
import OpenAI from "openai";
import sharp from "sharp";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

export const generateImageAsJpgBuffer = async (prompt) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });
  console.log('generateImage', { response })
  const b64JsonImg = response.data[0].b64_json;
  if (!b64JsonImg) {
    throw new Error('Unexpected Image Generation Response')
  }
  const imgBuffer = Buffer.from(b64JsonImg, 'base64');
  const compressedBuffer = await sharp(imgBuffer).jpeg({ quality: 86 }).toBuffer();

  return compressedBuffer
}

export default generateImageAsJpgBuffer;
