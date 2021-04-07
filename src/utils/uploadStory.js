import firebase from "firebase/app";

export function uploadStory(storyText, title, category, isPublic) {
  var db = firebase.firestore();
  //check if user logged in
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      db.collection("posts")
        .add({
          userRef: db.collection("users").doc(user.uid),
          category: category,
          title: title,
          text: storyText,
          time: firebase.firestore.Timestamp.now(),
          isPublic: isPublic,
          bookmarkUserRef: [],
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
