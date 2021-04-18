import firebase from "firebase/app";

export async function bookmarkStory(userUID, storyID) {
  var story = firebase.firestore().collection("posts").doc(storyID);
  story
    .get()
    .then((doc) => {
      if (doc.data().bookmarkUserRef.includes(userUID)) {
        story.update({
          bookmarkUserRef: firebase.firestore.FieldValue.arrayRemove(userUID),
        });
      } else {
        story.update({
          bookmarkUserRef: firebase.firestore.FieldValue.arrayUnion(userUID),
        });
      }
    })
    .catch((error) => console.log(error));
}

export async function checkStoryBookmarked(userUID, storyID) {
  //check if user logged in
  var story = firebase.firestore().collection("posts").doc(storyID);
  return await story
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        return doc.data().bookmarkUserRef.includes(userUID);
      }
    })
    .catch((error) => console.log(error));
}
