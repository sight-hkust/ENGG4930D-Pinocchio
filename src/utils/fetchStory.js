import firebase from "firebase/app";

var lastVisible;

export async function fetchStory({ isPublic }) {
  const db = firebase.firestore();
  return await db
    .collection("posts")
    .where("isPublic", "==", isPublic)
    .orderBy("time", "desc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        return querySnapshot;
      } else {
        throw Error("ERROR_NO_STORY");
      }
    })
    .catch((error) => console.log(error));
}

export async function fetchNextFiveStories({ isPublic }) {
  const db = firebase.firestore();
  return await db
    .collection("posts")
    .where("isPublic", "==", isPublic)
    .orderBy("time", "desc")
    .startAfter(lastVisible)
    .limit(5)
    .get()
    .then((querySnapshot) => {
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return querySnapshot;
    })
    .catch((error) => console.log(error));
}
