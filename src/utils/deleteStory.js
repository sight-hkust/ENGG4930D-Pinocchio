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
