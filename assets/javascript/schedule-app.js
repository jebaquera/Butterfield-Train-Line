$(document).ready(function() {

  // Initialize Firebase 
  const firebaseConfig = {
    apiKey: "AIzaSyB3gWMuYCHhH_Ii9Byd8Lis9sykOfcnWx0",
    authDomain: "jb-project-69b43.firebaseapp.com",
    databaseURL: "https://jb-project-69b43.firebaseio.com",
    projectId: "jb-project-69b43",
    storageBucket: "jb-project-69b43.appspot.com",
    messagingSenderId: "488851290408",
    appId: "1:488851290408:web:72d3874814d47b8f"
  };
  firebase.initializeApp(firebaseConfig);

  // Variable to reference the database
  var database = firebase.database();

  // Capture "Add Train" Submit button click event
  $("#addTrainButton").on("click", function(event) {
    event.preventDefault();
  
    // Grabbed values from text boxes
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    // Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    });
  });
  

  // Firebase watcher .on("child_added",
  database.ref().on("child_added", function(childSnapshot) {
    var newTrain = childSnapshot.val().name;
    var newLocation = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFreq = childSnapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % newFreq;

    // Minute(s) Until Train
    var tMinutesTillTrain = newFreq - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

    // Display On Page
    $("#all-display").append(
        '<tr><th>' + newTrain +
        '</td><td>' + newLocation +
        '</td><td>' + newFreq +
        '</td><td>' + catchTrain +
        '</td><td>' + tMinutesTillTrain + '</td></tr>');

    // Clear input fields
    $("#name, #destination, #firstTrain, #frequency").val("");
    return true;
  },
    //Handle the errors
    function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

}); //end document ready
