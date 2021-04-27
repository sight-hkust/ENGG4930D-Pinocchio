import firebase from "firebase/app";
import { encodeUserUID } from "../utils/auth";

export function uploadSurvey(q1, q2, q3, userUID) {
  var db = firebase.firestore();
  db.collection("users").doc(encodeUserUID(userUID)).set(
    {
      q1: q1,
      q2: q2,
      q3: q3,
    },
    { merge: true }
  );
}
