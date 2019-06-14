// add Document complete here
$( document ).ready(function() {
  console.log( "ready!" );

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
    nextArrival = $("#nextArrival").val().trim();
    minutesAway = $("#minutesAway").val().trim();

    // Code for handling the push
    database.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      nextArrival: nextArrival,
      minutesAway: minutesAway,
    //  dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  });

  // Firebase watcher .on("child_added",
  database.ref().on("child_added", function(childSnapshot) {
    // storing the childSnapshot.val() in a variable for convenience
    var sv = childSnapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.firstTrain);
    console.log(sv.frequency);
    console.log(sv.nextArrival);
    console.log(sv.MinutesAway);


    $("#train-table > tbody").append(
      $("<tr>").append(
        $("<td>").text(sv.name),
        $("<td>").text(sv.destination),
        $("<td>").text(sv.firstTrain),
        $("<td>").text(sv.frequency),
        $("<td>").text(sv.nextArrival),
        $("<td>").text(sv.minutesAway),        
      )
    );

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


// Assumptions
//var tFrequency = 3;

// Time is 3:30 AM
//var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTirainonverted = moment(firstTrain, "HH:mm").subtract(1, "years");
console.log(firstTrainConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var remainder = diffTime % frequency;
console.log(remainder);

// Minute Until Train
var minutesAway = frequency - remainder;
console.log("MINUTES TILL TRAIN: " + minutesAway);

// Next Train
var nextArrival = moment().add(minutesAway, "minutes");
console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));



});














