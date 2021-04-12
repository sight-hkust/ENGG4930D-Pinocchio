import firebase from "firebase/app";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk("auth/login", async (data) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  return await firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
      var user = userCredential.user;
      return user.uid;
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
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      return { userUID: action.payload, isLoggedIn: true };
    },
    [logout.fulfilled]: (state, action) => {
      return { userUID: "", isLoggedIn: false };
    },
    [signup.fulfilled]: (state, action) => {
      return { userUID: action.payload, isLoggedIn: true };
    },
  },
});

export default authSlice.reducer;
