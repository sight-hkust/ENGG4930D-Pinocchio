import firebase from "firebase/app";

export async function fetchStory({ isPublic, index }) {
  var db = firebase.firestore();
  return await db
    .collection("posts")
    .where("isPublic", "==", isPublic)
    .orderBy("time", "desc")
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        if (querySnapshot.docs[index]) {
          return querySnapshot.docs[index].data().text; //FIXME: get all posts
        } else {
          throw Error("ERROR_WRONG_INDEX");
        }
      } else {
        throw Error("ERROR_NO_STORY");
      }
    });
}
