import firebase from "firebase/app";
import { encodeUserUID } from "../utils/auth";

export function deleteStory(storyID) {
  const db = firebase.firestore();
  return db
    .collection("stories")
    .doc(storyID)
    .get()
    .then((doc) => {
      var storyAuthor = doc.data().userID;
      db.collection("stories")
        .doc(storyID)
        .delete()
        .then(
          db
            .collection("users")
            .doc(storyAuthor)
            .update({
              storiesID: firebase.firestore.FieldValue.arrayRemove(storyID),
            })
            .catch((err) => console.log(err))
        );
    })
    .catch((error) => console.log(error));
}

export function deleteAllStory(userUID) {
  const db = firebase.firestore();
  const encodedUserUID = encodeUserUID(userUID);
  db.collection("users")
    .doc(encodedUserUID)
    .get()
    .then((doc) => {
      var stories = doc.data().storiesID;
      stories.forEach((storyID) => {
        db.collection("stories")
          .doc(storyID)
          .delete()
          .catch((err) => console.log(err));
      });
      db.collection("users").doc(encodedUserUID).update({
        storiesID: [],
      });
    })
    .catch((error) => console.log(error));
}
