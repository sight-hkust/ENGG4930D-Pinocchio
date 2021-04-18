import { uploadStory, uploadToxicStory } from "./uploadStory";
require("dotenv").config();

const Perspective = require("perspective-api-client");
const perspective = new Perspective({
  apiKey: process.env.REACT_APP_PERSPECTIVE_API_KEY,
});

export async function getToxicity(text) {
  const result = await perspective.analyze(text);
  const score = result.attributeScores.TOXICITY.summaryScore.value;
  console.log(score);
  return score;
}

export function processStory(userUID, title, storyText, category) {
  //processStory only process public posts
  getToxicity(title)
    .then((titleScore) => {
      getToxicity(storyText)
        .then((textScore) => {
          if (titleScore > 0.5 || textScore > 0.5) {
            uploadToxicStory(
              userUID,
              storyText,
              title,
              category,
              true,
              titleScore,
              textScore
            );
          } else {
            uploadStory(userUID, storyText, title, category, true);
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
