// Firebase configuration (replace with your own Firebase credentials)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",  // Replace with your Firebase API Key
    authDomain: "musicapp-3a435.firebaseapp.com",
    projectId: "musicapp-3a435",
    storageBucket: "musicapp-3a435.appspot.com",
    messagingSenderId: "224181252004",
    appId: "1:224181252004:web:4589e9da0d6400e5fd1b31",
    measurementId: "G-FY5VPQG5NZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign-In with Google
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        const user = result.user;
        document.getElementById("user-name").textContent = user.displayName;
        document.getElementById("sign-in-button").style.display = "none";
        document.getElementById("sign-out-button").style.display = "inline-block";
        document.getElementById("user-info").style.display = "block";
    }).catch((error) => {
        console.error("Error signing in: ", error);
    });
}

// Sign-Out
function signOutUser() {
    auth.signOut().then(() => {
        document.getElementById("sign-in-button").style.display = "inline-block";
        document.getElementById("sign-out-button").style.display = "none";
        document.getElementById("user-info").style.display = "none";
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
}

// Monitor auth state changes
auth.onAuthStateChanged((user) => {
    if (user) {
        document.getElementById("user-name").textContent = user.displayName;
        document.getElementById("sign-in-button").style.display = "none";
        document.getElementById("sign-out-button").style.display = "inline-block";
        document.getElementById("user-info").style.display = "block";
    } else {
        document.getElementById("sign-in-button").style.display = "inline-block";
        document.getElementById("sign-out-button").style.display = "none";
        document.getElementById("user-info").style.display = "none";
    }
});
