import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebase from "firebase/app";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import InterestsPage from "./InterestsPage";
import SignUpPage from "./SignUpPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import GuidelinesPage from "./GuidelinesPage";
import WritingPage from "./WritingPage";
import ForumPage from "./ForumPage";
import WritingCategoryPage from "./WritingCategoryPage";
import StoryPage from "./StoryPage";
import CommentPage from "./CommentPage";
import BookmarkPage from "./BookmarkPage";
import LookBackPage from "./LookBackPage";

function RouteCollection() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/signup'>
          <SignUpPage />
        </Route>
        <Route exact path='/login'>
          <LoginPage />
        </Route>
        <Route exact path='/interests'>
          <InterestsPage />
        </Route>
        <Route exact path='/guidelines'>
          <GuidelinesPage />
        </Route>
        <Route exact path='/home'>
          {isLoggedIn ? <HomePage /> : <Redirect to={{ pathname: "/" }} />}
        </Route>
        <Route exact path='/writing'>
          {isLoggedIn ? <WritingPage /> : <Redirect to={{ pathname: "/" }} />}
        </Route>
        <Route exact path='/writingCategory'>
          {isLoggedIn ? (
            <WritingCategoryPage />
          ) : (
            <Redirect to={{ pathname: "/" }} />
          )}
        </Route>
        <Route exact path='/forum'>
          <ForumPage />
        </Route>
        <Route exact path='/story/:id' children={<StoryPage />} />
        <Route exact path='/comment/:id' children={<CommentPage />} />
        <Route exact path='/bookmark' children={<BookmarkPage />} />
        <Route exact path='/lookback' children={<LookBackPage />} />
        <Route exact path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default RouteCollection;
