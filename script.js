// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAF8R4iNFv3oAZVOZcw5fWUPz8FScTeBXM",
    authDomain: "musicapp-3a435.firebaseapp.com",
    projectId: "musicapp-3a435",
    storageBucket: "musicapp-3a435.appspot.com",
    messagingSenderId: "224181252004",
    appId: "1:224181252004:web:4589e9da0d6400e5fd1b31",
    measurementId: "G-FY5VPQG5NZ"
};

// Initialize Firebase (Make sure this is done before using any Firebase services)
const app = initializeApp(firebaseConfig); // Make sure to initialize the app first
const auth = getAuth(app); // Now, you can use Firebase Authentication

// Sign-in with Google function
export function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User signed in: ", user.displayName);
        })
        .catch((error) => {
            console.error("Error during sign-in: ", error.message);
        });
}

// Check if the user is signed in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // If user is logged in, show their name and hide the sign-in button
        document.getElementById("user-info").innerText = "Logged in as: " + user.displayName;
        document.getElementById("sign-in-button").style.display = "none";
    } else {
        // If no user is logged in, show the sign-in button
        document.getElementById("user-info").innerText = "";
        document.getElementById("sign-in-button").style.display = "block";
    }
});
