function adduser() {
    username = document.getElementById("Username").value;
    localStorage.setItem("Username", username);
    window.location="HeyChat_room.html";
}