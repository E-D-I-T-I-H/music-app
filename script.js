const firebaseConfig = {
    apiKey: "AIzaSyBFfY5CZScu8FdE2oLjaCTQ3H5WbAQXos8",
    authDomain: "edith.firebaseapp.com",
    databaseURL: "https://edith-default-rtdb.firebaseio.com",
    projectId: "edith",
    storageBucket: "edith.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdefghij"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

let player, currentVideoId = "", playlist = [];

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '225',
        width: '400',
        events: { 'onReady': () => {} }
    });
}

// Play/Pause
document.getElementById("play-pause-btn").addEventListener("click", () => {
    if (player.getPlayerState() === 1) { player.pauseVideo(); } 
    else { player.playVideo(); }
});

// Seek Bar
document.getElementById("seek-bar").addEventListener("input", (e) => {
    player.seekTo(e.target.value, true);
});

// Next & Prev
document.getElementById("prev-btn").addEventListener("click", () => playPlaylistVideo(-1));
document.getElementById("next-btn").addEventListener("click", () => playPlaylistVideo(1));

function playPlaylistVideo(direction) {
    const index = playlist.findIndex(v => v.id === currentVideoId);
    if (index !== -1) {
        let newIndex = (index + direction + playlist.length) % playlist.length;
        playVideo(playlist[newIndex].id);
    }
}

// Search YouTube
document.getElementById("search-button").addEventListener("click", async () => {
    let query = document.getElementById("search-input").value;
    let res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=YOUR_YT_API_KEY`);
    let data = await res.json();
    let resultsDiv = document.getElementById("search-results");
    resultsDiv.innerHTML = "";
    data.items.forEach(video => {
        let div = document.createElement("div");
        div.innerHTML = `• <a href="#" onclick="playVideo('${video.id.videoId}')">${video.snippet.title}</a>`;
        resultsDiv.appendChild(div);
    });
});

// Play Video
function playVideo(videoId) {
    currentVideoId = videoId;
    player.loadVideoById(videoId);
}

// Add to Playlist
document.getElementById("add-to-playlist").addEventListener("click", () => {
    if (currentVideoId) {
        let videoTitle = player.getVideoData().title;
        playlist.push({ id: currentVideoId, title: videoTitle });
        updatePlaylistUI();
        savePlaylist();
    }
});

function updatePlaylistUI() {
    let list = document.getElementById("playlist");
    list.innerHTML = "";
    playlist.forEach(video => {
        let li = document.createElement("li");
        li.innerHTML = `• <a href="#" onclick="playVideo('${video.id}')">${video.title}</a>`;
        list.appendChild(li);
    });
}

function savePlaylist() {
    if (auth.currentUser) {
        db.ref("playlists/" + auth.currentUser.uid).set(playlist);
    }
}

// Google Auth
document.getElementById("login-btn").addEventListener("click", () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
});

document.getElementById("logout-btn").addEventListener("click", () => auth.signOut());

auth.onAuthStateChanged(user => {
    document.getElementById("login-btn").style.display = user ? "none" : "block";
    document.getElementById("logout-btn").style.display = user ? "block" : "none";
});
