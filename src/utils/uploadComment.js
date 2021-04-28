import firebase from "firebase/app";
import { getToxicity } from "./toxicity";

export function uploadComment(userUID, storyID, comment) {
  var db = firebase.firestore();
  getToxicity(comment).then((score) => {
    if (score > 0.7) {
      db.collection("toxicComments")
        .add({
          userID: userUID,
          text: comment,
          toxicity: score,
          createdTime: firebase.firestore.Timestamp.now(),
        })
        .catch((error) => console.log(error));
    } else {
      var story = db.collection("stories").doc(storyID);
      story
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment),
        })
        .catch((error) => console.log(error));
    }
  });
}
