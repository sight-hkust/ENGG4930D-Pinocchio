import firebase from "firebase/app";

export function uploadComment(storyID, comment) {
  var story = firebase.firestore().collection("posts").doc(storyID);
  //check if user logged in
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      story
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment),
        })
        .catch((error) => console.log(error));
    } else {
      console.log("ERROR_USER_NOT_LOGGEDIN");
    }
  });
}
