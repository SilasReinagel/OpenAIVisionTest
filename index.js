// @ts-check
import explainImageAtUrl from "./explain.js";
import { generateImageAsJpgBuffer } from "./generate.js";
import { exec } from 'child_process';
import { writeFileSync } from "fs";

const telestration = async (imgUrl) => {
  const explanation = await explainImageAtUrl(imgUrl)
  const generated = await generateImageAsJpgBuffer(explanation)
  const generatedUrl = `./output/${new Date().toISOString()}.jpg`
  writeFileSync(generatedUrl, generated, { encoding: 'base64' })
  exec(`open ${imgUrl}`);
  exec(`open ${generatedUrl}`)
}

const inputImgUrl = process.argv[2]
if (!inputImgUrl || inputImgUrl.length < 1) {
  console.error('Please provide a valid image URL');
  process.exit(1);
}

telestration(process.argv[2])
  .then((response) => {
    console.log('Finished');
  })
  .catch((error) => {
    console.error(error);
  });
