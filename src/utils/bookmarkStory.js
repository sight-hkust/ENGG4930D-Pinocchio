import firebase from "firebase/app";

export function bookmarkStory(storyID) {
  //check if user logged in
  var story = firebase.firestore().collection("posts").doc(storyID);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      story
        .get()
        .then((doc) => {
          if (doc.data().bookmarkUserRef.includes(user.uid)) {
            story.update({
              bookmarkUserRef: firebase.firestore.FieldValue.arrayRemove(
                user.uid
              ),
            });
          } else {
            story.update({
              bookmarkUserRef: firebase.firestore.FieldValue.arrayUnion(
                user.uid
              ),
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log("ERROR_USER_NOT_LOGGEDIN");
    }
  });
}
