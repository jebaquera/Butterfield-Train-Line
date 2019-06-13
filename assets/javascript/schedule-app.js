// add Document complete here
$( document ).ready(function() {
  console.log( "ready!" );
});
// Global firebase //

const firebaseConfig = {
  apiKey: "AIzaSyB3gWMuYCHhH_Ii9Byd8Lis9sykOfcnWx0",
  authDomain: "jb-project-69b43.firebaseapp.com",
  databaseURL: "https://jb-project-69b43.firebaseio.com",
  projectId: "jb-project-69b43",
  storageBucket: "jb-project-69b43.appspot.com",
  messagingSenderId: "488851290408",
  appId: "1:488851290408:web:72d3874814d47b8f"
};
 // Initialize Firebase 
 firebase.initializeApp(firebaseConfig);

// Variable to reference the database
var database = firebase.database();

// Initial Train variables
var name = "";
var destination = "";
var firstTrain = "";
var frequency = "";

var nextArrival = "";
var minutesAway = "";

// Capture Submit button click event
$("#addTrainButton").on("click", function(event) {
  event.preventDefault();
  
// Grabbed values from text boxes
name = $("#name").val().trim();
destination = $("#destination").val().trim();
firstTrain = $("#firstTrain").val().trim();
frequency = $("#frequency").val().trim();

// Code for handling the push
database.ref().push({
  name: name,
  destination: destination,
  firstTrain: firstTrain,
  frequency: frequency,
  dateAdded: firebase.database.ServerValue.TIMESTAMP
});

});

// Firebase watcher .on("child_added",
database.ref().on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging the last user's data
  console.log(sv.name);
  console.log(sv.destination);
  console.log(sv.firstTrain);
  console.log(sv.frequency);

  // Change the HTML to reflect
  $("#name-display").text(sv.name);
  $("#destination-display").text(sv.destination);
  $("#firstTrain-display").text(sv.firstTrain);
  $("#frequency-display").text(sv.frequency);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


// Variables for date calculations
// var randomDate = "02/23/1999";
// var randomFormat = "MM/DD/YYYY";
// var convertedDate = moment(randomDate, randomFormat);















