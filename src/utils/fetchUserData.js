import firebase from "firebase/app";

export async function getUserIsAdmin(userUID) {
  const db = firebase.firestore();
  return await db
    .collection("users")
    .doc(userUID)
    .get()
    .then((docRef) => {
      if (docRef.exists) {
        return docRef.data().isAdmin;
      } else {
        console.log("ERROR_NO_USER");
      }
    });
}

export const countStory = async ({ userUID }) => {
  var db = firebase.firestore();
  return await db
    .collection("users")
    .doc(userUID)
    .get()
    .then((docRef) => {
      if (docRef.exists) {
        if (docRef.data().postsRef.length > 0) {
          var privateStory = 0;
          var publicStory = 0;
          docRef.data().postsRef.map((postRef) => {
            if (postRef.includes("PRIVATE")) {
              privateStory += 1;
            } else {
              publicStory += 1;
            }
          });
          return { privateStory, publicStory };
        } else {
          return null;
        }
      } else {
        console.log("ERROR_NO_USER");
      }
    });
};
