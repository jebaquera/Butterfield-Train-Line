// add Document complete here

/* global firebase */

// Initialize Firebase
// Make sure that your configuration matches your firebase script version
// (Ex. 3.0 != 3.7.1)
const firebaseConfig = {
  apiKey: "AIzaSyB3gWMuYCHhH_Ii9Byd8Lis9sykOfcnWx0",
  authDomain: "jb-project-69b43.firebaseapp.com",
  databaseURL: "https://jb-project-69b43.firebaseio.com",
  projectId: "jb-project-69b43",
  storageBucket: "jb-project-69b43.appspot.com",
  messagingSenderId: "488851290408",
  appId: "1:488851290408:web:72d3874814d47b8f"
};
  
  firebase.initializeApp(config);
  
  // Create a variable to reference the database
  var database = firebase.database();
  
  // Use the below initialValue
  var initialValue = 100;
  
  // Use the below variable clickCounter to keep track of the clicks.
  var clickCounter = initialValue;
  
  // --------------------------------------------------------------
  
  // At the initial load and on subsequent data value changes, get a snapshot of the current data. (I.E FIREBASE HERE)
  // This callback keeps the page updated when a value changes in firebase.
  database.ref().on("value", function(snapshot) {
    // We are now inside our .on function...
  
    // Console.log the "snapshot" value (a point-in-time representation of the database)
    console.log(snapshot.val());
    // This "snapshot" allows the page to get the most current values in firebase.
  
    // Change the value of our clickCounter to match the value in the database
    clickCounter = snapshot.val().clickCount;
  
    // Console Log the value of the clickCounter
    console.log(clickCounter);
  
    // Change the HTML using jQuery to reflect the updated clickCounter value
    $("#click-value").text(clickCounter);
    // Alternate solution to the above line
    // $("#click-value").html(clickCounter);
  
  // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  
  // --------------------------------------------------------------
  
  // Whenever a user clicks the click button
  $("#click-button").on("click", function() {
  
    // Reduce the clickCounter by 1
    clickCounter--;
  
    // Alert User and reset the counter
    if (clickCounter === 0) {
      alert("Phew! You made it! That sure was a lot of clicking.");
      clickCounter = initialValue;
    }
  
    // Save new value to Firebase
    database.ref().set({
      clickCount: clickCounter
    });
  
    // Log the value of clickCounter
    console.log(clickCounter);
  
  });
  
  // Whenever a user clicks the restart button
  $("#restart-button").on("click", function() {
  
    // Set the clickCounter back to initialValue
    clickCounter = initialValue;
  
    // Save new value to Firebase
    database.ref().set({
      clickCount: clickCounter
    });
  
    // Log the value of clickCounter
    console.log(clickCounter);
  
    // Change the HTML Values
    $("#click-value").text(clickCounter);
  
  });
  