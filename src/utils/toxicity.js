import { uploadStory, uploadToxicStory } from "./uploadStory";
require("dotenv").config();

const Perspective = require("perspective-api-client");
const perspective = new Perspective({
  apiKey: process.env.REACT_APP_PERSPECTIVE_API_KEY,
});

export async function getToxicity(text) {
  const result = await perspective.analyze({
    comment: { text },
    requestedAttributes: { TOXICITY: {} },
    languages: ["en"],
  });
  const score = result.attributeScores.TOXICITY.summaryScore.value;
  return score;
}

export function processStory(
  userUID,
  title,
  storyText,
  storyTextHTML,
  category
) {
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
              titleScore,
              textScore
            );
          } else {
            uploadStory(userUID, storyTextHTML, title, category, true);
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
