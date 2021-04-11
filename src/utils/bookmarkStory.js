import firebase from "firebase/app";

export async function bookmarkStory(storyID) {
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

export async function checkStoryBookmarked(storyID) {
  //check if user logged in
  var userRef;
  var story = firebase.firestore().collection("posts").doc(storyID);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      userRef = user;
    } else {
      console.log("ERROR_USER_NOT_LOGGEDIN");
    }
  });
  return await story
    .get()
    .then(async (doc) => {
      return await doc.data().bookmarkUserRef.includes(userRef.uid);
    })
    .catch((error) => console.log(error));
}
