import firebase from "firebase/app";

export function deleteStory(storyID) {
  const db = firebase.firestore();
  return db
    .collection("posts")
    .doc(storyID)
    .get()
    .then((doc) => {
      var storyAuthor = doc.data().userRef;
      db.collection("posts")
        .doc(storyID)
        .delete()
        .then(
          db
            .collection("users")
            .doc(storyAuthor)
            .update({
              postsRef: firebase.firestore.FieldValue.arrayRemove(storyID),
            })
            .catch((err) => console.log(err))
        );
    })
    .catch((error) => console.log(error));
}

export function deleteAllStory(userUID) {
  const db = firebase.firestore();
  db.collection("users")
    .doc(userUID)
    .get()
    .then((doc) => {
      var posts = doc.data().postsRef;
      posts.forEach((postID) => {
        db.collection("posts")
          .doc(postID)
          .delete()
          .catch((err) => console.log(err));
      });
      db.collection("users").doc(userUID).update({
        postsRef: [],
      });
    })
    .catch((error) => console.log(error));
}
