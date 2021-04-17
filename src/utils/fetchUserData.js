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
