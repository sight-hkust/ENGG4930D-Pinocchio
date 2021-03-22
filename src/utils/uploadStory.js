import firebase from "firebase/app";

export function uploadStory(storyText, isPublic) {
  //check if user logged in
  var db = firebase.firestore();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      db.collection("posts")
        .add({
          userRef: db.collection("users").doc(user.uid),
          text: storyText,
          time: firebase.firestore.Timestamp.now(),
          isPublic: isPublic,
        })
        .then((documentRef) =>
          db
            .collection("users")
            .doc(user.uid)
            .update({
              postsRef: firebase.firestore.FieldValue.arrayUnion(documentRef),
            })
        )
        .catch((error) => console.log(error));
    } else {
      console.log("ERROR_USER_NOT_LOGGEDIN");
    }
  });
}
