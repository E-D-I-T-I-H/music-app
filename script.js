import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

// Keep the user signed in even after page refresh
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    // This is where you continue with your sign-in logic
  })
  .catch((error) => {
    console.error("Persistence error:", error);
  });

// Listen for changes to the user's sign-in state (this runs on page refresh too)
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    document.getElementById("user-info").innerText = "Logged in as: " + user.displayName;
    document.getElementById("sign-in-button").style.display = "none"; // Hide the sign-in button
  } else {
    // User is signed out
    document.getElementById("user-info").innerText = "";
    document.getElementById("sign-in-button").style.display = "block"; // Show the sign-in button
  }
});
