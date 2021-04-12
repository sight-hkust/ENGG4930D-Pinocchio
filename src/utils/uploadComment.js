import firebase from "firebase/app";

export function uploadComment(storyID, comment) {
  var story = firebase.firestore().collection("posts").doc(storyID);
  story
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion(comment),
    })
    .catch((error) => console.log(error));
}
