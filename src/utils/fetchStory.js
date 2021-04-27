import firebase from "firebase/app";
import { encodeUserUID } from "../utils/auth";

export async function fetchStory({ isPublic, numberOfStory }) {
  const db = firebase.firestore();
  return await db
    .collection("stories")
    .where("isPublic", "==", isPublic)
    .orderBy("createdTime", "desc")
    .limit(numberOfStory)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        window.sessionStorage.setItem(
          "lastVisible",
          querySnapshot.docs[querySnapshot.docs.length - 1]
        );
        return querySnapshot;
      }
    })
    .catch((error) => console.log(error));
}

export async function fetchStoryByID({ storyID }) {
  const db = firebase.firestore();
  return await db
    .collection("stories")
    .doc(storyID)
    .get()
    .then((docRef) => {
      if (docRef.exists) {
        return docRef;
      } else {
        console.log("ERROR_NO_STORY");
      }
    })
    .catch((error) => console.log(error));
}

export async function fetchNextFiveStories({ isPublic }) {
  const db = firebase.firestore();
  return await db
    .collection("stories")
    .where("isPublic", "==", isPublic)
    .orderBy("createdTime", "desc")
    .startAfter(window.sessionStorage.getItem("lastVisible"))
    .limit(5)
    .get()
    .then((querySnapshot) => {
      window.sessionStorage.setItem(
        "lastVisible",
        querySnapshot.docs[querySnapshot.docs.length - 1]
      );
      return querySnapshot;
    })
    .catch((error) => {
      console.log(
        "lastVisible: ",
        window.sessionStorage.getItem("lastVisible")
      );
      console.log(error);
    });
}

export async function fetchBookmarkedStories({ userUID, numberOfStory }) {
  const db = firebase.firestore();
  return await db
    .collection("stories")
    .where("bookmarkUsersID", "array-contains", encodeUserUID(userUID))
    .orderBy("createdTime", "desc")
    .limit(numberOfStory)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        window.sessionStorage.setItem(
          "lastVisible",
          querySnapshot.docs[querySnapshot.docs.length - 1]
        );
        return querySnapshot;
      } else {
        console.log("ERROR_NO_STORY");
      }
    })
    .catch((error) => console.log(error));
}

export async function fetchNextFiveBookmarkedStories({
  userUID,
  numberOfStory,
}) {
  const db = firebase.firestore();
  return await db
    .collection("stories")
    .where("bookmarkUsersID", "array-contains", encodeUserUID(userUID))
    .orderBy("createdTime", "desc")
    .startAfter(window.sessionStorage.getItem("lastVisible"))
    .limit(numberOfStory)
    .get()
    .then(async (querySnapshot) => {
      if (!querySnapshot.empty) {
        window.sessionStorage.setItem(
          "lastVisible",
          querySnapshot.docs[querySnapshot.docs.length - 1]
        );
        return await querySnapshot;
      } else {
        console.log("ERROR_NO_STORY");
      }
    })
    .catch((error) => {
      console.log(
        "lastVisible: ",
        window.sessionStorage.getItem("lastVisible")
      );
      console.log(error);
    });
}

export async function fetchUserStory({ userUID, numberOfStory }) {
  const db = firebase.firestore();
  return await db
    .collection("stories")
    .where("userID", "==", encodeUserUID(userUID))
    .orderBy("createdTime", "desc")
    .limit(numberOfStory)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        window.sessionStorage.setItem(
          "lastVisible",
          querySnapshot.docs[querySnapshot.docs.length - 1]
        );
        return querySnapshot;
      }
    })
    .catch((error) => console.log(error));
}

export async function fetchNextFiveUserStories({ userUID, numberOfStory }) {
  const db = firebase.firestore();
  return await db
    .collection("stories")
    .where("userID", "==", encodeUserUID(userUID))
    .orderBy("createdTime", "desc")
    .startAfter(window.sessionStorage.getItem("lastVisible"))
    .limit(numberOfStory)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        window.sessionStorage.setItem(
          "lastVisible",
          querySnapshot.docs[querySnapshot.docs.length - 1]
        );
        return querySnapshot;
      }
    })
    .catch((error) => console.log(error));
}
