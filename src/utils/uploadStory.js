import firebase from "firebase/app";

export function uploadStory(userUID, storyText, title, category, isPublic) {
  var db = firebase.firestore();
  db.collection("posts")
    .add({
      userRef: userUID,
      category: category,
      title: title,
      text: storyText,
      time: firebase.firestore.Timestamp.now(),
      isPublic: isPublic,
      bookmarkUserRef: [],
      comments: [],
    })
    .then((documentRef) =>
      db
        .collection("users")
        .doc(userUID)
        .update({
          postsRef: firebase.firestore.FieldValue.arrayUnion(documentRef),
        })
    )
    .catch((error) => console.log(error));
}

export function uploadToxicStory(
  userUID,
  storyText,
  title,
  category,
  isPublic,
  titleToxicity,
  textToxicity
) {
  var db = firebase.firestore();
  db.collection("toxicPosts")
    .add({
      userRef: userUID,
      category: category,
      title: title,
      text: storyText,
      time: firebase.firestore.Timestamp.now(),
      isPublic: isPublic,
      bookmarkUserRef: [],
      comments: [],
      titleToxicity: titleToxicity,
      textToxicity: textToxicity,
    })
    .catch((error) => console.log(error));
}
