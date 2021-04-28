import firebase from "firebase/app";
import { encodeUserUID } from "../utils/auth";

export function uploadStory(userUID, storyText, title, category, isPublic) {
  var db = firebase.firestore();
  db.collection("stories")
    .add({
      bookmarkUsersID: [],
      category: category,
      comments: [],
      isPublic: isPublic,
      text: storyText,
      createdTime: firebase.firestore.Timestamp.now(),
      title: title,
      userID: encodeUserUID(userUID),
      weighting: category === "Motivation" ? 50 : 1,
    })
    .then((documentRef) =>
      db
        .collection("users")
        .doc(encodeUserUID(userUID))
        .update({
          storiesID: firebase.firestore.FieldValue.arrayUnion(
            documentRef.id + (isPublic ? "PUBLIC" : "PRIVATE")
          ),
        })
    )
    .catch((error) => console.log(error));
}

export function uploadToxicStory(
  userUID,
  storyText,
  title,
  category,
  titleToxicity,
  textToxicity
) {
  var db = firebase.firestore();
  db.collection("toxicStories")
    .add({
      bookmarkUsersID: [],
      category: category,
      comments: [],
      text: storyText,
      createdTime: firebase.firestore.Timestamp.now(),
      title: title,
      userID: encodeUserUID(userUID),
      textToxicity: textToxicity,
      titleToxicity: titleToxicity,
    })
    .catch((error) => console.log(error));
}
