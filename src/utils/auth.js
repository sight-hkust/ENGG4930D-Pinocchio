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
    .catch(() => {
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

export function encodeUserUID(userUID) {
  var encrypted = userUID
    .replace(/P/g, "S")
    .replace(/i/g, "t")
    .replace(/N/g, "a")
    .replace(/0/g, "N")
    .replace(/c/g, "l")
    .replace(/C/g, "E")
    .replace(/h/g, "y")
    .replace(/I/g, "h")
    .replace(/O/g, "A");

  return encrypted.split("").reverse().join("");
}

export function decodeUserUID(encoded) {
  var text = encoded.split("").reverse().join("");
  var decrypted = text
    .replace(/A/g, "O")
    .replace(/h/g, "I")
    .replace(/y/g, "h")
    .replace(/E/g, "C")
    .replace(/l/g, "c")
    .replace(/N/g, "0")
    .replace(/a/g, "N")
    .replace(/t/g, "i")
    .replace(/S/g, "P");
  return decrypted;
}
