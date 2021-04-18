import firebase from "firebase/app";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk("auth/login", async (data) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  return await firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(async (userCredential) => {
      var userUID = userCredential.user.uid;
      return await firebase
        .firestore()
        .collection("users")
        .doc(userUID)
        .get()
        .then((result) => {
          return { userUID: userUID, isAdmin: result.data().isAdmin };
        });
    })
    .catch((error) => console.log(error));
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return await firebase
    .auth()
    .signOut()
    .catch((error) => {
      console.log(error);
    });
});

export const signup = createAsyncThunk("auth/signup", async (data) => {
  return await firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
      var user = userCredential.user;
      firebase.firestore().collection("users").doc(user.uid).set(
        {
          email: user.email,
          emailVerified: user.emailVerified,
          isAdmin: false,
        },
        { merge: true }
      );
      user.sendEmailVerification().catch((error) => {
        console.log("ERROR_EMAIL_VERIFY", error);
      });
      return user.uid;
    })
    .catch((error) => {
      console.log(error);
    });
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userUID: "",
    isAdmin: false,
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      return {
        userUID: action.payload.userUID,
        isAdmin: action.payload.isAdmin,
      };
    },
    [logout.fulfilled]: (state, action) => {
      return { userUID: "", isAdmin: false };
    },
    [signup.fulfilled]: (state, action) => {
      return { userUID: action.payload, isAdmin: false };
    },
  },
});

export default authSlice.reducer;
