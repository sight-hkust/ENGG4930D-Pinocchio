import firebase from "firebase/app";
import { encodeUserUID } from "../utils/auth";

export async function getUserIsAdmin(userUID) {
  const db = firebase.firestore();
  return await db
    .collection("users")
    .doc(encodeUserUID(userUID))
    .get()
    .then((docRef) => {
      if (docRef.exists) {
        return docRef.data().isAdmin;
      } else {
        console.log("ERROR_NO_USER");
      }
    });
}

export async function isCompletedSignUp(userUID) {
  const db = firebase.firestore();
  return await db
    .collection("users")
    .doc(encodeUserUID(userUID))
    .get()
    .then((docRef) => {
      if (docRef.exists) {
        return docRef.data().q1 && docRef.data().interests;
      } else {
        console.log("ERROR_NO_USER");
      }
    });
}

export const countStory = async ({ userUID }) => {
  var db = firebase.firestore();
  return await db
    .collection("users")
    .doc(encodeUserUID(userUID))
    .get()
    .then((docRef) => {
      if (docRef.exists) {
        if (docRef.data().storiesID?.length > 0) {
          var privateStory = 0;
          var publicStory = 0;
          docRef.data().storiesID.forEach((storiesID) => {
            if (storiesID.includes("PRIVATE")) {
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
