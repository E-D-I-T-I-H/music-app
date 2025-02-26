import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Get the Auth instance
const auth = getAuth();

// Set persistence for the auth session
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    // The sign-in flow continues here if needed
  })
  .catch((error) => {
    console.error("Persistence error:", error);
  });

// Check if the user is signed in (this runs every time the page is refreshed)
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    document.getElementById("user-info").innerText = "Logged in as: " + user.displayName;
    document.getElementById("sign-in-button").style.display = "none"; // Hide the sign-in button
  } else {
    // No user is signed in
    document.getElementById("user-info").innerText = "";
    document.getElementById("sign-in-button").style.display = "block"; // Show the sign-in button
  }
});
