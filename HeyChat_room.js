// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyAMv3jclpAhHqKUKGhLT6NUVS0xMBEpIDs",
      authDomain: "heychat-18a18.firebaseapp.com",
      databaseURL: "https://heychat-18a18-default-rtdb.firebaseio.com",
      projectId: "heychat-18a18",
      storageBucket: "heychat-18a18.appspot.com",
      messagingSenderId: "389125520984",
      appId: "1:389125520984:web:725a7e39b155f75005542d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");

document.getElementById("username").innerHTML = "WELCOME " + username + "!";

function addroom() {
      roomname = document.getElementById("roomname").value;
      firebase.database().ref("/").child(roomname).update({
            purpose: "Adding Roomname"
      });
      localStorage.setItem("Roomname", roomname);
      window.location = "HeyChat_page.html"
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomname(this.id)'>#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToRoomname(name) {
      localStorage.setItem("Roomname", name);
      console.log(name);
      window.location = "HeyChat_page.html";
}

function logout(){
      localStorage.removeItem("Roomname");
      localStorage.removeItem("username")
      window.location="index.html";
  }