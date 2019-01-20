// Initialize Firebase
var config = {
  apiKey: "AIzaSyDZwIxXFNk928XzjMRZ6bpXVkeuEMbwIUI",
  authDomain: "in-the-know-a0b16.firebaseapp.com",
  databaseURL: "https://in-the-know-a0b16.firebaseio.com",
  projectId: "in-the-know-a0b16",
  storageBucket: "",
  messagingSenderId: "447330895711"
};
firebase.initializeApp(config);

//create a variable to reference the database
var database = firebase.database();


window.onload = function () {
  $("#Login-Warning").hide();
  //get login elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');

  //add login event
  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    auth.signInWithEmailAndPassword(email, pass);
    //sign in 
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  //add signup
  btnSignUp.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in 
    const promise = auth.signInWithEmailAndPassword(email, pass);
    auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  //add realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      $("#Login-Warning").remove();
      Runchecklist();
    } else {
      console.log('not logged in');
      $("#Login-Warning").show();
    }
  });

  function Runchecklist() {
    //initialize value
    var todos = "";
    var Firedata = firebase.database().ref().child('todos/' + todos);
    console.log(Firedata);

    $(document).ready(function () {
      // user clicked on the add button in the to-do field add that text into the to-do text
      $('#add-todo').on('click', function (event) {
        event.preventDefault();
        //values per text box
        todos = $("#todo-input").val().trim();

        //test values from textbox
        console.log(todos);


        //code for handling the push
        database.ref().push({
          todos: todos
        });

      });

      //firebase watcher
      database.ref().limitToLast(1).on('value', snapshot => {
        var index = 0;
        var test = snapshot.val();
        var keys = Object.keys(test);

        snapshot.forEach((snap) => {

          todos = snap.child("todos").val();
          //prepend values to html
          $("<div/>", {
            "class": "to-do-item",
            "data-path": keys[index]
          }).append([todos]).appendTo($(".col-4"));
          index++;

          //to remove item from checklist
          todos = snap.child("todos").val();
          $(document.body).on("click", ".to-do-item", function (e) {
            $(this).remove();
            database.ref(`/${e.currentTarget.attributes[1].nodeValue}`).remove();

          });

        });
      });

    });
  }
}