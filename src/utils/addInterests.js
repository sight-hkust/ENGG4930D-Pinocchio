import firebase from "firebase/app";
import { encodeUserUID } from "../utils/auth";

export function addInterests(userUID, selectedInterests) {
  firebase
    .firestore()
    .collection("users")
    .doc(encodeUserUID(userUID))
    .set(
      {
        interests: [...selectedInterests],
      },
      { merge: true }
    );
}
