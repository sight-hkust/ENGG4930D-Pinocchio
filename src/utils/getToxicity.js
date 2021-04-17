require("dotenv").config();
const Perspective = require("perspective-api-client");
const perspective = new Perspective({
  apiKey: process.env.REACT_APP_PERSPECTIVE_API_KEY,
});

export async function getToxicity({ text }) {
  const result = await perspective.analyze(text);
  const score = result.attributeScores.TOXICITY.summaryScore.value;
  console.log(score);
  return score;
}
