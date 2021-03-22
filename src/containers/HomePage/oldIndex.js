// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Typography,
//   Button,
//   Grid,
//   useMediaQuery,
//   Snackbar,
// } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
// import firebase from "firebase/app";
// import NavigationBar from "../../components/NavigationBar";
// import backgroundImage from "../../assets/homePageBackground.png";
// import mobileBackgroundImage from "../../assets/homeMobileBg.png";
// import bookmarkButtonImage from "../../assets/bookmarkButton.png";
// import myStoriesButtonImage from "../../assets/myStoriesButton.png";
// import writeNowButtonImage from "../../assets/writeNowButton.png";
// import personalButtonImage from "../../assets/personalButton.png";
// import logoutButtonImage from "../../assets/logoutButton.png";
// import bookshelfButtonImage from "../../assets/bookshelfButton.png";
// import guideMeButtonImage from "../../assets/guideMeButton.png";
// import askHelpButtonImage from "../../assets/askHelpButton.png";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "flex",
//     height: "100vh",
//     backgroundImage: `url(${backgroundImage})`,
//     backgroundPosition: "bottom",
//     backgroundSize: "cover",
//     backgroundRepeat: "no-repeat",
//     "@media (max-width:480px)": {
//       backgroundColor: "#FFF4E3",
//       backgroundSize: "contain",
//       backgroundImage: `url(${mobileBackgroundImage})`,
//     },
//   },
//   title: {
//     fontFamily: "Times",
//     fontWeight: "bold",
//     textAlign: "center",
//     fontSize: 70,
//     width: "70%",
//     alignSelf: "center",
//     "@media (max-width:480px)": {
//       lineHeight: 1,
//       width: "100%",
//       fontSize: 40,
//       whiteSpace: "break-spaces",
//     },
//   },
//   description: {
//     fontSize: 30,
//     alignSelf: "center",
//     "@media (max-width:480px)": {
//       fontSize: 15,
//       width: 221,
//       marginLeft: 28,
//       marginTop: 8,
//       whiteSpace: "break-spaces",
//       alignSelf: "auto",
//     },
//   },
//   bookmarkButton: {
//     width: 130,
//     height: 192,
//     backgroundRepeat: "no-repeat",
//     backgroundImage: `url(${bookmarkButtonImage})`,
//   },
//   bookmarkButtonText: {
//     fontWeight: "bold",
//     color: "#D8A800",
//     marginBottom: 60,
//   },
//   myStoriesButton: {
//     width: 155,
//     height: 188,
//     backgroundImage: `url(${myStoriesButtonImage})`,
//     left: "30vw",
//   },
//   myStoriesButtonText: {
//     fontWeight: "bold",
//     color: "#3D9B3B",
//     whiteSpace: "break-spaces",
//     marginBottom: 35,
//   },
//   writeNowButton: {
//     width: 164,
//     height: 300,
//     backgroundRepeat: "no-repeat",
//     backgroundImage: `url(${writeNowButtonImage})`,
//     bottom: "40vh",
//     left: "57vw",
//   },
//   writeNowButtonText: {
//     fontSize: 24,
//     color: "#087087",
//     marginTop: 170,
//     whiteSpace: "break-spaces",
//     textTransform: "lowercase",
//     lineHeight: 1,
//   },
//   personalButton: {
//     width: 132,
//     height: 235,
//     backgroundImage: `url(${personalButtonImage})`,
//     bottom: "19vh",
//   },
//   personalButtonText: {
//     marginBottom: 15,
//     fontWeight: "bold",
//     color: "#D8A800",
//   },
//   logoutButton: {
//     width: 143,
//     height: 233,
//     backgroundImage: `url(${logoutButtonImage})`,
//     bottom: "22vh",
//     left: "32vw",
//     zIndex: 2,
//   },
//   logoutButtonText: {
//     fontWeight: "bold",
//     color: "#D38851",
//     whiteSpace: "break-spaces",
//     marginRight: 3,
//     marginTop: "3vh",
//   },
//   bookshelfButton: {
//     width: 123,
//     height: 245,
//     backgroundImage: `url(${bookshelfButtonImage})`,
//     bottom: "7vh",
//     left: "65vw",
//   },
//   bookshelfButtonText: {
//     fontWeight: "bold",
//     fontSize: 16,
//     color: "#DE2A4E",
//     marginBottom: 120,
//   },
//   guideMeButton: {
//     backgroundImage: `url(${guideMeButtonImage})`,
//     bottom: "10vh",
//     width: 202,
//     height: 150,
//     left: 10,
//   },
//   guideMeButtonText: {
//     fontWeight: "bold",
//     fontSize: 20,
//     whiteSpace: "break-spaces",
//     color: "#9D7A00",
//     margin: "48px 0px 0px 30px",
//   },
//   askHelpButton: {
//     backgroundImage: `url(${askHelpButtonImage})`,
//     width: 202,
//     height: 88,
//     bottom: 0,
//     left: 10,
//   },
//   askHelpButtonText: {
//     fontWeight: "bold",
//     whiteSpace: "break-spaces",
//     fontSize: 16,
//     color: "#234666",
//     marginBottom: "3vh",
//     backgroundSize: "cover !important",
//   },
// }));

// function HomePage() {
//   const classes = useStyles();
//   const history = useHistory();
//   const isMobile = useMediaQuery("(max-width:480px)");
//   const [isOpen, setIsOpen] = useState(false);

//   const logOut = () => {
//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         setIsOpen(true);
//         setTimeout(() => {
//           history.push("/");
//         }, 5000);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setIsOpen(false);
//   };

//   const handleCall = (e) => {
//     e.preventDefault();
//     window.location.href = "tel:+85282082688";
//   };

//   const imageButtonClasses = [
//     {
//       title: "BOOKMARK",
//       className: classes.bookmarkButton,
//       textClassName: classes.bookmarkButtonText,
//     },
//     {
//       title: "MY\nSTORIES",
//       className: classes.myStoriesButton,
//       textClassName: classes.myStoriesButtonText,
//     },
//     {
//       title: "\twrite\nnow!",
//       className: classes.writeNowButton,
//       textClassName: classes.writeNowButtonText,
//     },
//     {
//       title: "PERSONAL",
//       className: classes.personalButton,
//       textClassName: classes.personalButtonText,
//     },
//     {
//       title: "LOG\nOUT",
//       className: classes.logoutButton,
//       textClassName: classes.logoutButtonText,
//       onClick: logOut,
//     },
//     {
//       title: "BOOKSHELF",
//       className: classes.bookshelfButton,
//       textClassName: classes.bookshelfButtonText,
//     },
//     {
//       title: "GUIDE\nME!",
//       className: classes.guideMeButton,
//       textClassName: classes.guideMeButtonText,
//     },
//     {
//       title: "ASK HELP:\nBLUE FAIRY",
//       className: classes.askHelpButton,
//       textClassName: classes.askHelpButtonText,
//       onClick: handleCall,
//     },
//   ];
//   return (
//     <Grid container className={classes.container} direction='column'>
//       <NavigationBar />
//       <Typography className={classes.title}>{`HOME:\nSTORY OF US`}</Typography>
//       <Typography className={classes.description}>
//         {`if your heart is in your dream,\nno request is too extreme`}
//       </Typography>
//       <Grid container direction='row'>
//         {isMobile
//           ? imageButtonClasses.map((imageButtonClass) => (
//               <Button
//                 key={`${imageButtonClass.title}`}
//                 className={imageButtonClass.className}
//                 style={{
//                   position: "absolute",
//                   backgroundRepeat: "no-repeat",
//                   backgroundSize: "contain",
//                 }}
//                 onClick={imageButtonClass.onClick}
//               >
//                 <Typography
//                   key={`${imageButtonClass.title}`}
//                   className={imageButtonClass.textClassName}
//                 >
//                   {imageButtonClass.title}
//                 </Typography>
//               </Button>
//             ))
//           : imageButtonClasses.map((imageButtonClass) => (
//               <Grid item xs style={{ marginTop: "20vh" }}>
//                 <Button onClick={imageButtonClass.onClick}>
//                   <Typography>{imageButtonClass.title}</Typography>
//                   {/* <span className={imageButtonClass.className}></span> */}
//                 </Button>
//               </Grid>
//             ))}
//       </Grid>
//       {isMobile && (
//         <>
//           <Typography
//             style={{
//               fontWeight: "bold",
//               color: "#794B2A",
//               fontSize: 20,
//               transform: "rotate(351deg)",
//               position: "absolute",
//               bottom: 26,
//               right: 66,
//             }}
//           >
//             bookself opens:
//           </Typography>
//           <Typography
//             style={{
//               color: "#794B2A",
//               fontSize: 15,
//               transform: "rotate(352deg)",
//               position: "absolute",
//               bottom: 9,
//               right: 30,
//             }}
//           >
//             12pm-10pm everyday!
//           </Typography>
//         </>
//       )}
//       <Snackbar
//         open={isOpen}
//         onClose={handleClose}
//         anchorOrigin={
//           isMobile
//             ? { vertical: "bottom", horizontal: "center" }
//             : { vertical: "bottom", horizontal: "left" }
//         }
//         autoHideDuration={9000}
//         message={`We've cooked you dinner!\nRemember to come home🥺`}
//         style={{ width: "90vw" }}
//         ContentProps={{
//           style: {
//             backgroundColor: "#3546a2",
//             fontSize: isMobile ? "0.875rem" : "1rem",
//             whiteSpace: "break-spaces",
//           },
//         }}
//       />
//     </Grid>
//   );
// }

// export default HomePage;
