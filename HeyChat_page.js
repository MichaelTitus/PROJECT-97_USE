//YOUR FIREBASE LINKS

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
roomname = localStorage.getItem("Roomname");

function send() {
    mesg = document.getElementById("mesg").value;
    firebase.database().ref(roomname).push({
          name: username,
          message: mesg,
          like: 0
    });
    document.getElementById("mesg").value = "";

}

function getData() {
    firebase.database().ref("/" + roomname).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                      firebase_message_id = childKey;
                      message_data = childData;
                      //Start code
                      name = message_data['name'];
                      message = message_data['message'];
                      like = message_data['like'];

                      NameWithTag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                      MessageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
                      LikeButton = "<button class='btn btn-danger' id=" + firebase_message_id +
                            "value=" + like + " onclick='updateLike(this.id)'>";
                      spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like +
                            "</span></button><hr>";
                      row = NameWithTag + MessageWithTag + LikeButton + spanWithTag;
                      document.getElementById("output").innerHTML += row;
                      //End code
                }
          });
    });
}
getData();
function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    console.log(button_id);
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(roomname).child(message_id).update({
          like: updated_likes
    });
}

function logout() {
    localStorage.removeItem("Roomname");
    localStorage.removeItem("username")
    window.location = "index.html";
}