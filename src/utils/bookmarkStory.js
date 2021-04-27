import firebase from "firebase/app";
import { encodeUserUID } from "../utils/auth";

export async function bookmarkStory(userUID, storyID) {
  const story = firebase.firestore().collection("stories").doc(storyID);
  const encodedUserUID = encodeUserUID(userUID);
  story
    .get()
    .then((doc) => {
      if (doc.data().bookmarkUsersID.includes(encodedUserUID)) {
        story.update({
          bookmarkUsersID: firebase.firestore.FieldValue.arrayRemove(
            encodedUserUID
          ),
        });
      } else {
        story.update({
          bookmarkUsersID: firebase.firestore.FieldValue.arrayUnion(
            encodedUserUID
          ),
        });
      }
    })
    .catch((error) => console.log(error));
}

export async function checkStoryBookmarked(userUID, storyID) {
  const story = firebase.firestore().collection("stories").doc(storyID);
  return await story
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        return doc.data().bookmarkUsersID.includes(encodeUserUID(userUID));
      }
    })
    .catch((error) => console.log(error));
}
