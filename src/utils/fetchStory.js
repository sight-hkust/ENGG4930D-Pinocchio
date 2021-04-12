import firebase from "firebase/app";

var lastVisible;

export async function fetchStory({ isPublic, numberOfStory }) {
  const db = firebase.firestore();
  return await db
    .collection("posts")
    .where("isPublic", "==", isPublic)
    .orderBy("time", "desc")
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

export async function fetchStoryByID({ storyID }) {
  const db = firebase.firestore();
  return await db
    .collection("posts")
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
    .catch((error) => {
      console.log("lastVisible: ", lastVisible);
      console.log(error);
    });
}

export async function fetchBookmarkedStories({ userUID, numberOfStory }) {
  const db = firebase.firestore();
  return await db
    .collection("posts")
    .where("bookmarkUserRef", "array-contains", userUID)
    .orderBy("time", "desc")
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
    .collection("posts")
    .where("bookmarkUserRef", "array-contains", userUID)
    .orderBy("time", "desc")
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
    .collection("posts")
    .where("userRef", "==", userUID)
    .orderBy("time", "desc")
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
    .collection("posts")
    .where("userRef", "==", userUID)
    .orderBy("time", "desc")
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
