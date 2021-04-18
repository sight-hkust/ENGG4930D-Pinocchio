import firebase from "firebase/app";
import { getToxicity } from "./toxicity";

export function uploadComment(userUID, storyID, comment) {
  var db = firebase.firestore();
  getToxicity(comment).then((score) => {
    if (score > 0.5) {
      db.collection("toxic")
        .add({
          userRef: userUID,
          comment: comment,
          toxicity: score,
          time: firebase.firestore.Timestamp.now(),
        })
        .catch((error) => console.log(error));
    } else {
      var story = db.collection("posts").doc(storyID);
      story
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment),
        })
        .catch((error) => console.log(error));
    }
  });
}
