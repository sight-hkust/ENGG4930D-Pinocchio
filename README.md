# Pinocchio

## Dare to Care, Dare to Share

Pinocchio is a student-initiated project that targets mental health issues among university students. Our solution is to provide an online anonymous forum for everyone to talk about their mental health difficulties.

<br>

## Want to know more about this project?

Check out our Help Center here:
https://www.notion.so/Help-Center-3da55e08068e48339572536e58537f10

Or directly contact us via Instagram: @pinocchio.hkust

<br>

## Project Structure

```
/src
├── assets                          # Images
├── components                      # Reusable components
│   ├── DialogBox
│   │   └── index.js
│   ├── Input
│   │   └── index.js
│   ├── NavigationBar
│   │   └── index.js
│   ├── NextButton
│   │   └── index.js
│   ├── StoryInput
│   │   └── index.js
│   └── StoryPreviewCard
│       └── index.js
├── containers                      # Different pages
│   ├── BookmarkPage
│   │   └── index.js
│   ├── CommentPage
│   │   └── index.js
│   ├── ForgetPasswordPage
│   │   └── index.js
│   ├── ForumPage
│   │   └── index.js
│   ├── GuidePage
│   │   └── index.js
│   ├── HomePage
│   │   └── index.js
│   ├── LandingPage
│   │   └── index.js
│   ├── LoginPage
│   │   └── index.js
│   ├── LookBackPage
│   │   └── index.js
│   ├── PersonalPage
│   │   └── index.js
│   ├── SignUpPage
│   │   └── index.js
│   ├── StoryPage
│   │   └── index.js
│   ├── SurveyPage
│   │   └── index.js
│   ├── WritingCategoryPage
│   │   └── index.js
│   ├── WritingPage
│   │   └── index.js
│   └── RouteCollection.js
├── i18n                            # translation
│   ├── en
│   │   └── translation.json
│   └── zh
│       └── translation.json
├── store                           # Redux store
│   └── authSlice.js
├── utils                           # Reusable functions
│   ├── auth.js
│   ├── bookmarkStory.js
│   ├── deleteStory.js
│   ├── fetchStory.js
│   ├── fetchUserData.js
│   ├── toxicity.js
│   ├── uploadComment.js
│   ├── uploadStory.js
│   └── uploadSurvey.js
├── App.test.js                     # Automated testing
├── i18n.js                         # Configuration File for i18n
├── index.css                       # Root css file
├── index.js                        # Website entry point
├── reportWebVitals.js              # For PWA
├── service-worker.js               # For PWA
├── serviceWorkerRegistration.js    # For PWA
├── setupTests.js                   # Automated testing
└── store.js                        # Configuration File for Redux
```
