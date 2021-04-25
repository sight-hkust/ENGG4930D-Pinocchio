import firebase from "firebase/app";

export function sendPasswordResetEmail(email) {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .catch((error) => {
      console.log(error);
    });
}

export async function checkIfUserExists(email) {
  return await firebase
    .auth()
    .fetchSignInMethodsForEmail(email)
    .then((result) => {
      return result.length > 0;
    })
    .catch((error) => {
      return true;
    });
}

export function updatePassword(newPassword) {
  return firebase
    .auth()
    .currentUser.updatePassword(newPassword)
    .catch((err) => {
      console.log(err);
    });
}
