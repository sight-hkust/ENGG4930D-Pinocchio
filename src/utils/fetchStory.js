import firebase from "firebase/app";
import { encodeUserUID } from "../utils/auth";

var lastVisible;

export async function fetchStory({ isPublic, numberOfStory }) {
  const db = firebase.firestore();
  return await db
    .collection("stories")
    .where("isPublic", "==", isPublic)
    .orderBy("createdTime", "desc")
    .limit(15)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
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
  var firstDoc = await db
    .collection("stories")
    .orderBy("createdTime", "desc")
    .limit(1)
    .get();
  var afterDoc = lastVisible ?? firstDoc;
  return await db
    .collection("stories")
    .where("isPublic", "==", isPublic)
    .orderBy("createdTime", "desc")
    .startAfter(afterDoc)
    .limit(5)
    .get()
    .then((querySnapshot) => {
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return querySnapshot;
    })
    .catch((error) => {
      console.log("lastVisible: ", lastVisible);
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
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
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
    .startAfter(lastVisible)
    .limit(numberOfStory)
    .get()
    .then(async (querySnapshot) => {
      if (!querySnapshot.empty) {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        return await querySnapshot;
      } else {
        console.log("ERROR_NO_STORY");
      }
    })
    .catch((error) => {
      console.log("lastVisible: ", lastVisible);
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
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
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
    .startAfter(lastVisible)
    .limit(numberOfStory)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        return querySnapshot;
      }
    })
    .catch((error) => console.log(error));
}
